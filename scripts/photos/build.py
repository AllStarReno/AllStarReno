#!/usr/bin/env python3
"""Project photo pipeline. Usage: python3 scripts/photos/build.py /path/to/raw
Reads src/data/project-photos.json, crops composites, writes responsive AVIF/WebP/JPEG to
public/images/projects/, embeds EXIF/IPTC/XMP (city-level town GPS) with exiftool, and
writes src/data/project-photos.generated.json (dimensions + available widths). Never upscales."""
import json, os, subprocess, sys
from PIL import Image
RAW = sys.argv[1]; OUT = 'public/images/projects'; os.makedirs(OUT, exist_ok=True)
D = json.load(open('src/data/project-photos.json'))
WIDTHS = [480, 800, 1200, 1600]; LAT, LON = 35.0887, -92.4421
KW = ['bathroom remodel', 'bathroom remodeling', 'Conway AR', 'Conway Arkansas', 'Central Arkansas', 'All-Star Renovations']
SVC_KW = {'tub-to-shower': ['tub to shower conversion', 'walk-in shower'], 'walk-in-shower': ['walk-in shower', 'shower remodel'],
          'tub-surround': ['tub surround', 'bathtub remodel'], 'bathroom-remodel': ['primary bathroom remodel', 'freestanding tub']}
import subprocess as _sp
TOWNS = json.loads(_sp.run(['node', '-e', "import('./src/data/cities.mjs').then(m=>console.log(JSON.stringify(Object.fromEntries(m.CITIES.map(c=>[c.slug,{name:c.name,lat:c.geo.latitude,lon:c.geo.longitude}])))))"], capture_output=True, text=True).stdout)
gen = {}
def meta(path, item, title):
    t = TOWNS[item['town']]; LAT, LON = t['lat'], t['lon']; town = t['name']
    item = {**item, 'alt': f"{item['alt']} ({town}, AR project)", 'caption': f"{item['caption']} Project in {town}, AR."}
    kw = [k for k in KW if 'Conway' not in k] + [f'{town} AR', f'{town} Arkansas'] + SVC_KW.get(item['service'], []) + (['before and after'] if item.get('phase') else [])
    args = ['exiftool', '-q', '-overwrite_original', '-all=',
        f'-XMP-dc:Title={title}', f'-IPTC:ObjectName={title[:64]}', f'-XMP-dc:Description={item["alt"]}', f'-EXIF:ImageDescription={item["alt"]}',
        f'-IPTC:Caption-Abstract={item["caption"]}', f'-XMP-photoshop:Headline={item["caption"]}',
        '-XMP-dc:Creator=All-Star Renovations', '-EXIF:Artist=All-Star Renovations', '-IPTC:By-line=All-Star Renovations',
        '-XMP-photoshop:Credit=All-Star Renovations', '-IPTC:Credit=All-Star Renovations', '-XMP-photoshop:Source=All-Star Renovations project photo',
        '-IPTC:Source=All-Star Renovations', '-XMP-dc:Rights=© 2026 All-Star Renovations. All rights reserved.',
        '-EXIF:Copyright=© 2026 All-Star Renovations. All rights reserved.', '-IPTC:CopyrightNotice=© 2026 All-Star Renovations. All rights reserved.',
        '-XMP-xmpRights:Marked=True', '-XMP-xmpRights:WebStatement=https://allstarreno.com/portfolio',
        f'-XMP-photoshop:City={town}', '-XMP-photoshop:State=Arkansas', '-XMP-photoshop:Country=United States',
        f'-IPTC:City={town}', '-IPTC:Province-State=Arkansas', '-IPTC:Country-PrimaryLocationName=United States', '-IPTC:Country-PrimaryLocationCode=USA',
        '-XMP-iptcCore:CountryCode=US', '-XMP-iptcExt:DigitalSourceType=http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture',
        f'-GPSLatitude={LAT}', '-GPSLatitudeRef=N', f'-GPSLongitude={-LON}', '-GPSLongitudeRef=W', '-codedcharacterset=utf8']
    args += [f'-XMP-dc:Subject={k}' for k in kw] + [f'-IPTC:Keywords={k}' for k in kw] + [path]
    r = subprocess.run(args, capture_output=True, text=True)
    if r.returncode: print('exiftool warn', path, r.stderr.strip()[:200])
def process(item, title):
    im = Image.open(os.path.join(RAW, item['src'])).convert('RGB')
    if item.get('crop'): im = im.crop(tuple(item['crop']))
    W, H = im.size; ws = [w for w in WIDTHS if w < W] + [W] if W not in WIDTHS else [w for w in WIDTHS if w <= W]
    ws = sorted(set(ws))
    for w in ws:
        r = im if w == W else im.resize((w, round(H * w / W)), Image.LANCZOS)
        base = f'{OUT}/{item["name"]}-{w}'
        r.save(base + '.jpg', quality=82, optimize=True, progressive=True); r.save(base + '.webp', quality=80, method=6); r.save(base + '.avif', quality=60)
        for ext in ('jpg', 'webp', 'avif'): meta(f'{base}.{ext}', item, title)
    im.save(f'{OUT}/{item["name"]}.jpg', quality=88, optimize=True, progressive=True); meta(f'{OUT}/{item["name"]}.jpg', item, title)
    gen[item['name']] = {'width': W, 'height': H, 'widths': ws}
for p in D['pairs']:
    for ph in ('before', 'after'):
        it = {**p[ph], 'service': p['service'], 'phase': ph, 'town': p['town']}; process(it, f'{p["title"]} ({ph}), {TOWNS[p["town"]]["name"]}, AR')
for s in D['singles']: process(s, s['caption'].rstrip('.') + f", {TOWNS[s['town']]['name']}, AR")
json.dump(gen, open('src/data/project-photos.generated.json', 'w'), indent=1); print('ok', len(gen))
