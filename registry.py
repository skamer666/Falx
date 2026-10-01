"""Registre des vidéos de service : qui fait quoi, ce qui est fait. Source de vérité = registry.json sur la branche video-studio.

Toutes les commandes qui écrivent font : fetch → repartir du registre distant → modifier → commit → push (avec reprises),
pour que deux exécutions de la routine en parallèle ne prennent jamais la même vidéo.

  python3 registry.py status                      # résumé
  python3 registry.py claim 5 --run RUN_ID        # réserve jusqu'à 5 vidéos et affiche leurs slugs
  python3 registry.py done SLUG --run RUN_ID --duration 84.2
  python3 registry.py fail SLUG --run RUN_ID --reason "texte"
  python3 registry.py release SLUG                # remet une vidéo réservée en « todo »
  python3 registry.py add SLUG AUDIENCE "Nom"     # nouvelle prestation apparue sur le site
"""
import argparse
import json
import os
import subprocess
import sys
import time
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.abspath(__file__))
REG = os.path.join(ROOT, "registry.json")
BRANCH = "video-studio"
STALE_HOURS = 4  # une réservation plus vieille est considérée comme abandonnée
MAX_ATTEMPTS = 3


def git(*args, check=True):
    r = subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True)
    if check and r.returncode != 0:
        raise RuntimeError(f"git {' '.join(args)} failed: {r.stderr.strip()}")
    return r


def now():
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def age_hours(stamp):
    if not stamp:
        return 1e9
    t = datetime.strptime(stamp, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
    return (datetime.now(timezone.utc) - t).total_seconds() / 3600


def load():
    return json.load(open(REG))


def save(data):
    json.dump(data, open(REG, "w"), ensure_ascii=False, indent=1)
    open(REG, "a").write("\n")


def transact(message, mutate, extra_paths=()):
    """Apply mutate(registry) on top of the remote registry, commit and push, retrying on races."""
    for attempt in range(8):
        git("fetch", "origin", BRANCH)
        git("checkout", f"origin/{BRANCH}", "--", "registry.json")
        data = load()
        result = mutate(data)
        save(data)
        git("add", "registry.json", *extra_paths)
        if git("diff", "--cached", "--quiet", check=False).returncode == 0:
            return result
        git("commit", "-m", message)
        rebase = git("rebase", "--autostash", f"origin/{BRANCH}", check=False)
        if rebase.returncode != 0:
            git("rebase", "--abort", check=False)
            git("reset", "--mixed", f"origin/{BRANCH}")
            time.sleep(2 + attempt * 3)
            continue
        push = git("push", "origin", f"HEAD:{BRANCH}", check=False)
        if push.returncode == 0:
            return result
        git("reset", "--mixed", "HEAD~1")
        time.sleep(2 + attempt * 3)
    raise SystemExit("registry: could not push after 8 attempts")


def claimable(v):
    if v["status"] == "todo":
        return True
    if v["status"] == "claimed" and age_hours(v.get("claimed_at")) > STALE_HOURS:
        return True
    if v["status"] == "failed" and v.get("attempts", 0) < MAX_ATTEMPTS:
        return True
    return False


def cmd_claim(n, run):
    def mutate(data):
        picked = []
        for v in sorted(data["videos"], key=lambda x: x["priority"]):
            if len(picked) >= n:
                break
            if claimable(v):
                v.update(status="claimed", claimed_at=now(), run=run)
                picked.append(v["slug"])
        return picked
    picked = transact(f"studio: réserve {run}", mutate)
    print("\n".join(picked) if picked else "NOTHING_LEFT")


def cmd_done(slug, run, duration):
    paths = [p for p in (f"specs/services/{slug}.py", f"livraisons/{slug}") if os.path.exists(os.path.join(ROOT, p))]

    def mutate(data):
        v = next(x for x in data["videos"] if x["slug"] == slug)
        v.update(status="done", done_at=now(), run=run, duration=duration)
        v.pop("error", None)
    transact(f"studio: vidéo terminée {slug}", mutate, extra_paths=paths)
    print(f"done {slug}")


def cmd_fail(slug, run, reason):
    paths = [p for p in (f"specs/services/{slug}.py",) if os.path.exists(os.path.join(ROOT, p))]

    def mutate(data):
        v = next(x for x in data["videos"] if x["slug"] == slug)
        v["attempts"] = v.get("attempts", 0) + 1
        v.update(status="failed" if v["attempts"] < MAX_ATTEMPTS else "blocked", run=run, error=reason[:500], failed_at=now())
    transact(f"studio: échec {slug}", mutate, extra_paths=paths)
    print(f"failed {slug}")


def cmd_release(slug):
    def mutate(data):
        v = next(x for x in data["videos"] if x["slug"] == slug)
        v.update(status="todo")
        v.pop("claimed_at", None)
    transact(f"studio: libère {slug}", mutate)


def cmd_add(slug, audience, name):
    def mutate(data):
        if any(v["slug"] == slug for v in data["videos"]):
            return
        prio = max(v["priority"] for v in data["videos"]) + 1
        data["videos"].append({"slug": slug, "audience": audience, "name": name, "priority": prio, "status": "todo",
                               "url": f"https://thrax-legal.ch/fr/{audience}/{slug}"})
    transact(f"studio: ajoute {slug}", mutate)


def cmd_status():
    data = load()
    counts = {}
    for v in data["videos"]:
        counts[v["status"]] = counts.get(v["status"], 0) + 1
    print(json.dumps(counts, ensure_ascii=False))
    for v in sorted(data["videos"], key=lambda x: x["priority"]):
        if v["status"] != "done":
            print(f'{v["priority"]:>3} {v["status"]:<8} {v["slug"]}')


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    a = sub.add_parser("claim"); a.add_argument("n", type=int); a.add_argument("--run", required=True)
    a = sub.add_parser("done"); a.add_argument("slug"); a.add_argument("--run", required=True); a.add_argument("--duration", type=float, default=0)
    a = sub.add_parser("fail"); a.add_argument("slug"); a.add_argument("--run", required=True); a.add_argument("--reason", required=True)
    a = sub.add_parser("release"); a.add_argument("slug")
    a = sub.add_parser("add"); a.add_argument("slug"); a.add_argument("audience"); a.add_argument("name")
    sub.add_parser("status")
    args = ap.parse_args()
    if args.cmd == "claim":
        cmd_claim(args.n, args.run)
    elif args.cmd == "done":
        cmd_done(args.slug, args.run, args.duration)
    elif args.cmd == "fail":
        cmd_fail(args.slug, args.run, args.reason)
    elif args.cmd == "release":
        cmd_release(args.slug)
    elif args.cmd == "add":
        cmd_add(args.slug, args.audience, args.name)
    else:
        cmd_status()
    sys.exit(0)
