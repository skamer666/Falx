"""Normalise the hand-made images: background mapped to #ECECEF, stray frames removed, soft edge feather -> NN.png (900 px)."""
import numpy as np
from PIL import Image, ImageFilter
BG = np.array([255, 255, 255], float)  # paper -> pure white; the page multiplies it onto #ECECEF
for n in range(22):
    im = np.asarray(Image.open(f"{n:02d}.jpg").convert("RGB")).astype(float)
    if n == 5:
        im = im[140:910, 140:910]
    if n == 18:  # thin frame drawn by the generator: paint it out with the local paper colour
        paper = np.median(im[60:90, 400:600].reshape(-1, 3), 0)
        im[30:62, :] = paper; im[30:330, 30:64] = paper; im[30:330, 960:996] = paper
    h, w, _ = im.shape
    b = max(8, h // 40)
    border = np.concatenate([im[:b].reshape(-1, 3), im[-b:].reshape(-1, 3), im[:, :b].reshape(-1, 3), im[:, -b:].reshape(-1, 3)])
    med = np.median(border, 0)
    # per-channel gain so the paper becomes exactly BG, ink stays ink
    im = np.clip(im * (BG / med) / 0.93, 0, 255)  # also clips the paper grain to white
    img = Image.fromarray(im.astype(np.uint8)).resize((900, 900), Image.LANCZOS)
    # feather the outer 13 % into the background so no square edge can show
    yy, xx = np.mgrid[0:900, 0:900] / 899.0
    d = np.minimum.reduce([xx, yy, 1 - xx, 1 - yy])
    a = np.clip(d / 0.05, 0, 1)
    out = np.asarray(img).astype(float) * a[..., None] + BG * (1 - a[..., None])
    Image.fromarray(out.astype(np.uint8)).save(f"{n:02d}.png", optimize=True)
    print(n, med.round())
