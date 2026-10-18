"""Draft OCR -> data/questions.json (schema apki). Odpowiedzi puste do czasu opracowania."""
import json, re, sys
SECTIONS = [
 ("jachty", "Jachty żaglowe morskie", 1, 41),
 ("locja", "Locja", 42, 80),
 ("meteo", "Meteorologia", 81, 111),
 ("mpzzm", "MPZZM (prawo drogi)", 112, 155),
 ("nawigacja", "Nawigacja", 156, 196),
 ("planowanie", "Planowanie rejsów", 197, 243),
 ("ratownictwo", "Ratownictwo", 244, 293),
 ("sygnalizacja", "Sygnalizacja i łączność", 294, 330),
]
def sec(i):
    for sid, name, a, b in SECTIONS:
        if a <= i <= b: return sid
    return None
def clean(t):
    t = t.replace("\n", " ")
    t = re.sub(r"\s+", " ", t).strip()
    t = re.sub(r"\s+([?,.;:])", r"\1", t)
    return t
src, dst = sys.argv[1], sys.argv[2]
draft = json.load(open(src, encoding="utf-8"))
out = {"meta": {"source": "PZŻ, Komisja Szkolenia, przykładowe pytania egzaminacyjne JSM, 30.03.2016 (arkusz 20160729_095536455_0)", "status": "draft-ocr"},
       "sections": [{"id": s, "name": n, "range": [a, b]} for s, n, a, b in SECTIONS],
       "questions": []}
for q in sorted(draft, key=lambda q: q["id"]):
    out["questions"].append({
        "id": q["id"], "section": sec(q["id"]), "origin": "pzz2016", "page": q["page"],
        "question": clean(q["question"]), "question_image": q["question_image"],
        "options": [{"letter": o["letter"], "text": clean(o["text"]), "image": o["image"]} for o in q["options"]],
        "answer": None, "explanation": None, "sources": [], "confidence": None, "flags": [], "verified": False})
json.dump(out, open(dst, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(out["questions"]))
