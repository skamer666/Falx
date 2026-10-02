"""The recurring character: a man in a dark suit with a Swiss-flag pin on his lapel.

One SVG structure, restyled per reel through CSS variables / classes (flat, ink, line, neon, paper…).
Animated by reel.js: mouth follows the voice envelope, eyes blink, head bobs, arms take poses.
"""

PALETTES = {
    "navy":     dict(suit="#1d2a44", suitd="#141d31", shirt="#f4f4f2", tie="#c8102e", skin="#f1c7a5", skind="#d9a684", hair="#3a2a20"),
    "charcoal": dict(suit="#2b2d33", suitd="#1d1f24", shirt="#ffffff", tie="#da291c", skin="#efc19c", skind="#cf9e7c", hair="#1f1a17"),
    "mono":     dict(suit="#111113", suitd="#000000", shirt="#f5f5f7", tie="#f5f5f7", skin="#f5f5f7", skind="#c9c9cd", hair="#111113"),
    "warm":     dict(suit="#283a5e", suitd="#1b2945", shirt="#fff8ee", tie="#e63946", skin="#e9b48f", skind="#c98f6c", hair="#5a3b28"),
}


def svg(uid="m", palette="navy", pose="neutral", w=600, extra_cls=""):
    p = PALETTES[palette]
    var = ";".join(f"--{k}:{v}" for k, v in p.items())
    arm_l = _arm("l", 172, 560)
    arm_r = _arm("r", 428, 560)
    return f"""<svg class="mascot {extra_cls}" id="{uid}" data-pose="{pose}" viewBox="0 0 600 900" width="{w}" style="{var}">
  <g class="m-arm m-arm-l" id="{uid}-al" style="transform-origin:172px 560px">{arm_l}</g>
  <g class="m-arm m-arm-r" id="{uid}-ar" style="transform-origin:428px 560px">{arm_r}</g>
  <g class="m-body">
    <path class="s suit" d="M108 900 L118 640 C122 548 168 486 246 458 L300 476 L354 458 C432 486 478 548 482 640 L492 900 Z"/>
    <path class="s shirt" d="M246 458 L300 476 L354 458 L340 566 L300 652 L260 566 Z"/>
    <path class="s tie" d="M287 482 L313 482 L320 503 L300 514 L280 503 Z"/>
    <path class="s tie" d="M289 512 L311 512 L324 640 L300 672 L276 640 Z"/>
    <path class="s suitd lapel" d="M246 458 L222 528 L254 552 L300 664 L266 566 L262 470 Z"/>
    <path class="s suitd lapel" d="M354 458 L378 528 L346 552 L300 664 L334 566 L338 470 Z"/>
    <path class="s suitd" d="M300 664 L300 900" style="fill:none"/>
    <circle class="s btn" cx="300" cy="720" r="7"/><circle class="s btn" cx="300" cy="790" r="7"/>
    <g class="pin" transform="translate(352 530) rotate(-8)">
      <rect class="pin-bg" x="0" y="0" width="44" height="44" rx="8" fill="#da291c"/>
      <rect x="18" y="8" width="8" height="28" fill="#fff"/><rect x="8" y="18" width="28" height="8" fill="#fff"/>
    </g>
  </g>
  <g class="m-head" id="{uid}-h" style="transform-origin:300px 440px">
    <path class="s skin" d="M266 360 L334 360 L338 470 L300 488 L262 470 Z"/>
    <ellipse class="s skin" cx="194" cy="292" rx="20" ry="32"/>
    <ellipse class="s skin" cx="406" cy="292" rx="20" ry="32"/>
    <path class="s skin face" d="M300 150 C368 150 410 200 410 282 C410 372 362 428 300 428 C238 428 190 372 190 282 C190 200 232 150 300 150 Z"/>
    <path class="s hair" d="M192 286 C180 184 236 136 306 138 C378 140 424 186 410 286 C402 244 390 222 366 208 C330 226 262 228 226 212 C208 230 198 254 192 286 Z"/>
    <path class="brow" id="{uid}-bl" d="M236 252 Q260 240 284 248" style="transform-origin:260px 248px"/>
    <path class="brow" id="{uid}-br" d="M316 248 Q340 240 364 252" style="transform-origin:340px 248px"/>
    <g class="eyes" id="{uid}-e">
      <ellipse class="eye" cx="260" cy="290" rx="12" ry="15"/>
      <ellipse class="eye" cx="340" cy="290" rx="12" ry="15"/>
      <circle class="glint" cx="264" cy="285" r="4"/><circle class="glint" cx="344" cy="285" r="4"/>
    </g>
    <path class="nose" d="M302 300 Q292 330 300 338 Q307 341 313 336"/>
    <path class="mouth-c" id="{uid}-mc" d="M268 368 Q300 388 332 368"/>
    <g id="{uid}-mo" style="transform-origin:300px 366px">
      <path class="mouth-o" d="M270 362 Q300 360 330 362 Q328 400 300 404 Q272 400 270 362 Z"/>
      <path class="tongue" d="M282 392 Q300 380 318 392 Q312 402 300 403 Q288 402 282 392 Z"/>
    </g>
  </g>
</svg>"""


def _arm(side, sx, sy):
    # Arm drawn hanging down from the shoulder; poses rotate the whole group around the shoulder.
    d = -1 if side == "l" else 1
    ex, ey = sx + d * 18, sy + 170
    hx, hy = sx + d * 10, sy + 300
    return (f'<path class="armol" d="M{sx} {sy} Q{ex} {ey} {hx} {hy}" '
            f'style="fill:none;stroke-linecap:round;stroke-width:calc(var(--armw,78px) + 10px)"/>'
            f'<path class="s suit arm" d="M{sx} {sy} Q{ex} {ey} {hx} {hy}" '
            f'style="fill:none;stroke-linecap:round;stroke-width:var(--armw,78px)"/>'
            f'<path class="s shirt cuff" d="M{hx - 26} {hy + 4} L{hx + 26} {hy + 4} L{hx + 24} {hy + 22} L{hx - 24} {hy + 22} Z"/>'
            f'<g class="hand"><circle class="s skin" cx="{hx}" cy="{hy + 48}" r="34"/>'
            f'<path class="s skin" d="M{hx + d * 6} {hy + 30} L{hx + d * 10} {hy - 30 + 0} Q{hx + d * 12} {hy - 44} {hx + d * 20} {hy - 30} L{hx + d * 24} {hy + 26} Z" class="finger"/></g>')


CSS = """
.mascot { overflow: visible; }
.mascot .suit { fill: var(--suit); } .mascot .suitd { fill: var(--suitd); }
.mascot .shirt { fill: var(--shirt); } .mascot .tie { fill: var(--tie); }
.mascot .skin { fill: var(--skin); } .mascot .hair { fill: var(--hair); }
.mascot .btn { fill: var(--suitd); }
.mascot .s { stroke: var(--ol, transparent); stroke-width: var(--olw, 0); stroke-linejoin: round; }
.mascot .arm.s { stroke: var(--suit); }
.mascot .brow { fill: none; stroke: var(--hair); stroke-width: 9; stroke-linecap: round; }
.mascot .eye { fill: #1b1b1f; } .mascot .glint { fill: #fff; }
.mascot .eyes { transform-box: fill-box; transform-origin: center; }
.mascot .nose { fill: none; stroke: var(--skind); stroke-width: 6; stroke-linecap: round; }
.mascot .mouth-c { fill: none; stroke: #2a1414; stroke-width: 7; stroke-linecap: round; }
.mascot .mouth-o { fill: #3b1216; } .mascot .tongue { fill: #d9606a; }
/* ink: comic outline */
.mascot.ink { --ol: #0b0b0d; --olw: 7px; }
.mascot.ink .arm.s { stroke: var(--suit); filter: drop-shadow(0 0 0 #000); }
/* line: white strokes on dark, Thrax monochrome */
.mascot.line .s, .mascot.line .hair { fill: var(--bgc, #0a0a0b) !important; stroke: #f5f5f7; stroke-width: 5px; }
.mascot .armol { display: none; }
.mascot.line .armol { display: inline; stroke: #f5f5f7; }
.mascot.line .arm.s { stroke: var(--bgc, #0a0a0b) !important; }
.mascot.line .shirt { fill: var(--bgc, #0a0a0b) !important; }
.mascot.line .eye { fill: #f5f5f7; } .mascot.line .glint { fill: #0a0a0b; }
.mascot.line .brow, .mascot.line .nose { stroke: #f5f5f7; }
.mascot.line .mouth-c { stroke: #f5f5f7; } .mascot.line .mouth-o { fill: #f5f5f7; } .mascot.line .tongue { fill: #0a0a0b; }
/* neon: glowing outlines */
.mascot.neon { filter: drop-shadow(0 0 10px var(--glow, #4cc9f0)) drop-shadow(0 0 26px var(--glow, #4cc9f0)); }
"""
