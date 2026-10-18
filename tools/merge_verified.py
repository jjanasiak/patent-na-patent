"""Scala korekty z data/verified/*.json do data/questions.json (po postprocess)."""
import json, glob, sys
qpath = sys.argv[1] if len(sys.argv) > 1 else 'data/questions.json'
D = json.load(open(qpath, encoding='utf-8'))
by = {q['id']: q for q in D['questions']}
n = 0; missing_img = []
for f in sorted(glob.glob('data/verified/*.json')):
    for v in json.load(open(f, encoding='utf-8')):
        q = by.get(v['id'])
        if not q: print('brak id', v['id'], f); continue
        q['question'] = v['question'].strip()
        q['question_image_note'] = v.get('question_image_note')
        for o, vo in zip(q['options'], v['options']):
            assert o['letter'] == vo['letter'], (v['id'], o['letter'], vo['letter'])
            o['text'] = vo['text'].strip(); o['image_note'] = vo.get('image_note')
            if vo.get('image_note') and not o['image']: missing_img.append((v['id'], o['letter']))
        if v.get('question_image_note') and not q['question_image']: missing_img.append((v['id'], 'Q'))
        q['flags'] = [x for x in v.get('flags', []) if x]
        q['verified'] = True; n += 1
D['meta']['status'] = 'ocr-verified' if n == len(D['questions']) else f'ocr-verified {n}/{len(D["questions"])}'
json.dump(D, open(qpath, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('scalono', n, 'brakujące obrazki:', missing_img)
