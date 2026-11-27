"""Generates social-preview images (1200x630) for the homepage and each venture.
Run again after changing names/colours:  python3 scripts/make-og.py
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
SERIF_I = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf"
for cand in ["/usr/share/fonts/truetype/google-fonts/Lora-Variable.ttf"]:
    if os.path.exists(cand): SERIF = cand
for cand in ["/usr/share/fonts/truetype/google-fonts/Lora-Italic-Variable.ttf"]:
    if os.path.exists(cand): SERIF_I = cand
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
SERIF = SERIF_I = "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf"

BG = (14, 14, 14); FG = (236, 235, 227); MUTED = (142, 141, 135); GOLD = (232, 60, 34)  # accent

def hexrgb(h): h = h.lstrip('#'); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def card(path, eyebrow, title, italic, accent):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG)
    glow = Image.new("RGB", (W, H), BG)
    gd = ImageDraw.Draw(glow)
    gd.ellipse((700, -250, 1450, 500), fill=tuple(int(c * 0.35 + b * 0.65) for c, b in zip(accent, BG)))
    glow = glow.filter(ImageFilter.GaussianBlur(140))
    img = Image.blend(img, glow, 1.0)
    d = ImageDraw.Draw(img)
    for x in range(0, W, 120): d.line([(x, 0), (x, H)], fill=(22, 22, 24))
    for y in range(0, H, 120): d.line([(0, y), (W, y)], fill=(22, 22, 24))
    d.line([(80, 120), (140, 120)], fill=accent, width=2)
    d.text((160, 108), eyebrow.upper(), font=ImageFont.truetype(SANS, 20), fill=accent)
    size = 120
    while size > 40:  # shrink until both lines fit
        f = ImageFont.truetype(SERIF, size)
        fi = ImageFont.truetype(SERIF_I, size)
        if max(d.textlength(title.upper(), font=f), d.textlength(italic.upper(), font=fi)) <= 1000:
            break
        size -= 4
    d.text((80, 200), title.upper(), font=f, fill=FG)
    d.text((80, 200 + size * 1.15), italic.upper(), font=fi, fill=accent)
    d.text((80, 540), "rampatrudu.com", font=ImageFont.truetype(SANS, 22), fill=MUTED)
    d.ellipse((1030, 470, 1120, 560), fill=accent)
    d.text((1075, 515), "RP", font=ImageFont.truetype(SERIF_I, 34), fill=BG, anchor="mm")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, optimize=True)

card(f"{ROOT}/public/og-image.png", "Entrepreneur · Business Leader · Co-founder", "Ram Patrudu", "Dreams to Ventures.", GOLD)
ventures = [
    ("trovity-insurance", "Trovity Insurance", "#5cc2d1"),
    ("mad-over-insurance", "Mad Over Insurance", "#f47c5c"),
    ("redcrabs", "Redcrabs", "#e5533f"),
    ("call-me-ooo", "Call Me OOO", "#a597f7"),
]
for slug, name, color in ventures:
    card(f"{ROOT}/public/og/{slug}.png", "A venture by Ram Patrudu", name, "Dreams to Ventures.", hexrgb(color))

# Apple touch icon
icon = Image.new("RGB", (180, 180), BG)
d = ImageDraw.Draw(icon)
d.text((90, 92), "RP", font=ImageFont.truetype(SERIF_I, 84), fill=GOLD, anchor="mm")
icon.save(f"{ROOT}/public/apple-touch-icon.png")
print("OG images generated")
