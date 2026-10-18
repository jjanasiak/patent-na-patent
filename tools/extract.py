"""Ekstrakcja pytań z pytania-egzaminacyjne-jsm.pdf: komórki tabel (wektorowe) -> OCR per komórka.
Użycie: python -I tools/extract.py <pdf> <out.json> <imgdir>
"""
import sys, json, os, subprocess, tempfile, re
import pymupdf

PDF, OUT, IMGDIR = sys.argv[1], sys.argv[2], sys.argv[3]
TESS = os.environ.get("TESSDATA_PREFIX")
IMAGES_ONLY = bool(os.environ.get("IMAGES_ONLY"))  # tylko ilustracje: OCR wyłącznie numeru pytania
os.makedirs(IMGDIR, exist_ok=True)
doc = pymupdf.open(PDF)

def ocr(page, rect, psm=6):
    pix = page.get_pixmap(dpi=300, clip=rect)
    with tempfile.TemporaryDirectory() as td:
        png = os.path.join(td, "c.png"); pix.save(png)
        out = os.path.join(td, "o")
        subprocess.run(["tesseract", png, out, "-l", "pol", "--psm", str(psm)], capture_output=True, check=False)
        with open(out + ".txt", encoding="utf-8") as f:
            t = f.read()
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r"\n{2,}", "\n", t).strip()
    return t

questions = []
section = None
for pno, page in enumerate(doc):
    cells = []
    for dmy in page.get_drawings():
        r = dmy["rect"]
        if r.width > 20 and r.height > 8:
            cells.append((r, dmy.get("fill")))
    # dedupe
    seen = set(); uniq = []
    for r, fill in cells:
        k = (round(r.x0), round(r.y0), round(r.x1), round(r.y1))
        if k in seen: continue
        seen.add(k); uniq.append((pymupdf.Rect(*k), fill))
    hdr = [r for r, f in uniq if 70 < r.y0 < 110 and r.width > 400]
    if hdr:
        s = "" if IMAGES_ONLY else ocr(page, hdr[0], psm=7)
        if s: section = s
    letters = sorted([r for r, f in uniq if 320 < r.x0 < 332 and r.width < 40], key=lambda r: r.y0)
    answers = sorted([r for r, f in uniq if 348 < r.x0 < 360 and r.x1 > 500], key=lambda r: r.y0)
    # grupuj komórki odpowiedzi stykające się pionowo -> jedno pytanie
    groups = []
    for ar in answers:
        if groups and abs(ar.y0 - groups[-1][-1].y1) < 3:
            groups[-1].append(ar)
        else:
            groups.append([ar])
    qcells = []
    for gi, g in enumerate(groups):
        y0 = g[0].y0 - 2
        y1 = (groups[gi + 1][0].y0 - 10) if gi + 1 < len(groups) else 815
        y1 = max(y1, g[-1].y1 + 2)
        qcells.append(pymupdf.Rect(28, y0, 324, y1))
    imgs = []
    for info in page.get_image_info(xrefs=True):
        b = pymupdf.Rect(info["bbox"])
        if b.y0 > 70 and b.width > 40 and b.height > 5:
            imgs.append((b, info["xref"], info["width"], info["height"]))
    for qi, qr in enumerate(qcells):
        qtext = ocr(page, qr, psm=6)
        m = re.match(r"\s*(\d{1,3})\s*[\.\,]\s*(.*)", qtext, re.S)
        num = int(m.group(1)) if m else None
        body = m.group(2).strip() if m else qtext
        opts = groups[qi]
        q = {"id": num, "page": pno + 1, "section": section, "question": body, "options": [], "question_image": None}
        # ilustracje w komórce pytania: suma bboxów obrazków w lewej kolumnie -> render wycinka
        qimgs = [b for b, xref, w, h in imgs if b.x1 < 335 and b.intersects(qr)]
        if qimgs:
            u = qimgs[0]
            for b in qimgs[1:]: u = u | b
            fn = f"q{num}.png"; page.get_pixmap(dpi=200, clip=u + (-2, -2, 2, 2)).save(os.path.join(IMGDIR, fn)); q["question_image"] = fn
        for i, ar in enumerate(opts):
            letter = "ABC"[i] if i < 3 else "?"
            img = None
            oimgs = [b for b, xref, w, h in imgs if b.x0 > 335 and ar.intersects(b)]
            if oimgs:
                u = oimgs[0]
                for b in oimgs[1:]: u = u | b
                fn = f"q{num}{letter}.png"; page.get_pixmap(dpi=200, clip=u + (-2, -2, 2, 2)).save(os.path.join(IMGDIR, fn)); img = fn
            text = "" if (img or IMAGES_ONLY) else ocr(page, pymupdf.Rect(ar.x0 + 2, ar.y0 + 1, ar.x1 - 2, ar.y1 - 1), psm=6)
            q["options"].append({"letter": letter, "text": text, "image": img})
        questions.append(q)
    print(f"page {pno+1}: {len(qcells)} q, section={section}", file=sys.stderr)

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=1)
print(len(questions), "questions")
