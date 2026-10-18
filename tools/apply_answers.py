"""Wgrywa odpowiedzi z data/answers/<dzial>.json do data/questions.json."""
import json, sys, glob
qpath = 'data/questions.json'
D = json.load(open(qpath, encoding='utf-8'))
by = {q['id']: q for q in D['questions']}
files = sys.argv[1:] or sorted(glob.glob('data/answers/*.json'))
n = 0
for f in files:
    A = json.load(open(f, encoding='utf-8'))
    legend = A.get('sources_legend', {})
    D['meta'].setdefault('sources_legend', {}).update(legend)
    for a in A['answers']:
        q = by[a['id']]
        assert a['answer'] in 'ABC', a
        q['answer'] = a['answer']; q['explanation'] = a['explanation']; q['confidence'] = a['confidence']
        q['sources'] = list(a['sources'])
        q['hint'] = a.get('hint')
        for fl in a.get('flags', []):
            if fl not in q['flags']: q['flags'].append(fl)
        n += 1
D['meta']['answers'] = sum(1 for q in D['questions'] if q['answer'])
json.dump(D, open(qpath, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('wgrano', n, 'odpowiedzi; łącznie', D['meta']['answers'])
