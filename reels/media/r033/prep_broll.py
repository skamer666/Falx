"""r033 : b-roll libres de droits (Mixkit, licence Mixkit gratuite ; Jet d'eau : Wikimedia Commons CC0) recadrés en 1080x1920."""
import subprocess, sys, os
SRC = sys.argv[1]; D = os.path.dirname(os.path.abspath(__file__))
CLIPS = {  # nom: (fichier source, centre horizontal 0-1, début s, durée s)
    "cherche": ("25575.mp4", .27, 8.0, 2.6), "ecrit": ("51123.mp4", .32, 2.0, 2.2), "londres": ("33823.mp4", .62, 3.0, 2.4),
    "avion": ("28000.mp4", .5, 4.5, 2.4), "porte": ("35896.mp4", .72, 11.0, 2.4), "cles": ("34140.mp4", .45, 4.0, 2.4),
    "paie": ("35902.mp4", .33, 5.0, 2.6), "alarme": ("28902.mp4", .5, 2.0, 2.6), "suisse": ("18128.mp4", .5, 2.0, 2.0),
    "banque": ("38481.mp4", .6, 4.0, 2.6), "bridge": ("4457.mp4", .62, 3.0, 2.0), "famille": ("36780.mp4", .55, 2.5, 2.8),
    "signe": ("23222.mp4", .45, 8.0, 2.4), "potes": ("43266.mp4", .5, 3.0, 2.6),
}
for name, (f, cx, ss, du) in CLIPS.items():
    src = os.path.join(SRC, f)
    w, h = map(int, subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", src],
                                   capture_output=True, text=True).stdout.strip().split(","))
    if h > w:
        vf = "scale=1080:1920:flags=lanczos"
    else:
        cw = round(h * 9 / 16 / 2) * 2; x = int(min(max(cx * w - cw / 2, 0), w - cw))
        vf = f"crop={cw}:{h}:{x}:0,scale=1080:1920:flags=lanczos"
    out = os.path.join(D, f"b_{name}.mp4")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(ss), "-t", str(du), "-i", src, "-vf", vf + ",fps=30,eq=saturation=1.08:contrast=1.04",
                    "-an", "-c:v", "libx264", "-crf", "19", "-preset", "medium", "-pix_fmt", "yuv420p", out], check=True)
    print(name, os.path.getsize(out) // 1024, "KB")
# photo de l'annonce (fictive) : intérieur lumineux
subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "14", "-i", os.path.join(SRC, "4029.mp4"), "-frames:v", "1", "-vf", "crop=1440:1000:300:40,scale=900:625",
                "-q:v", "3", os.path.join(D, "annonce.jpg")], check=True)
