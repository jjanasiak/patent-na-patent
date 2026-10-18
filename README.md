# Patent na patent

Mobilna aplikacja (PWA) do nauki na egzamin PZŻ na patent jachtowego sternika morskiego. Statyczna strona, bez backendu, do publikacji na GitHub Pages.

- `index.html`, `styles.css`, `app.js` – aplikacja (vanilla JS, bez budowania)
- `data/questions.json` – baza pytań (330 pytań PZŻ z 2016 + dział „Wyłowione z morza” na pytania własne), odpowiedzi z uzasadnieniem i źródłem dochodzą działami
- `data/img/` – ilustracje do pytań wycięte z PDF
- `sw.js`, `manifest.webmanifest`, `icons/` – praca offline i ikona na ekranie głównym
- `tools/` – skrypty: ekstrakcja z PDF (`extract.py`), schemat (`postprocess.py`), scalanie korekt OCR (`merge_verified.py`)
- `source/` – PDF źródłowy, oficjalne dokumenty PZŻ i rozporządzenie, surowy OCR, korekty (`data/verified/`)

Podgląd lokalny: `python3 -m http.server 8765` w katalogu repo, potem http://localhost:8765 (w Safari na iPhonie: Udostępnij → Do ekranu początkowego).

Schemat pytania: `id, section, origin (pzz2016|own), question, question_image, options[{letter,text,image}], answer (A|B|C|null), explanation, sources[], confidence (A przepis z cytatem | B wiedza podręcznikowa | C sporne/nieaktualne), hint (podpowiedź Mewy), flags[], verified`.

## Odpowiedzi

Odpowiedzi działami w `data/answers/<dział>.json` (odpowiedź, uzasadnienie, źródła z legendą, pewność A/B/C, podpowiedź Mewy, flagi). Każdy dział przechodzi ślepą weryfikację osobnym agentem (plik `<dział>.verification.json`: niezależne odpowiedzi + wątpliwości). Wgrywanie: `python -I tools/apply_answers.py data/answers/<dział>.json`.

Stan: wszystkie 8 działów opracowane i zweryfikowane na ślepo (330/330). Zgodność weryfikacji: MPZZM 44/44, Sygnalizacja 36/37, Ratownictwo 48/50, Planowanie 47/47, Nawigacja 41/41, Locja 39/39, Meteorologia 31/31, Jachty 41/41. Pytania sporne i nieaktualne: `docs/pytania-do-sprawdzenia.md`.
