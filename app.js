/* Patent na patent – aplikacja do nauki na JSM. Vanilla JS, bez budowania. */
(() => {
'use strict';

/* ---------- Pixel sprites ---------- */
const PAL = {K:'#10263a',W:'#f8f8f4',G:'#9aa5b1',Y:'#f2b134',R:'#d7263d',O:'#ee6c2b',B:'#1f6f8b',L:'#3aa0c0',S:'#efe2b8',D:'#7a4a1e',N:'#0b1d33',E:'#2f9e6b',T:'#c9b98a',P:'#ffffff'};
const SPRITES = {
  mewa:[
    '................',
    '......WWW.......',
    '.....WWKWW......',
    '.....WWWWWYY....',
    '....WWWWWW......',
    '..GGWWWWWWW.....',
    '.GGGGWWWWWW.....',
    'GGGGGGGWWWWW....',
    '.GGGGGGGWWWW....',
    '..GGGGGGGGW.....',
    '....WWWWWW......',
    '.....Y..Y.......',
    '....YY..YY......'],
  lifebuoy:[
    '...RRRWWW...',
    '..RRRRWWWW..',
    '.RRR....WWW.',
    'RRR......WWW',
    'RR........WW',
    'WW........RR',
    'WW........RR',
    'WWW......RRR',
    '.WWW....RRR.',
    '..WWWWRRRR..',
    '...WWWRRR...'],
  anchor:[
    '.....KK.....',
    '....K..K....',
    '.....KK.....',
    '...KKKKKK...',
    '.....KK.....',
    '.....KK.....',
    '.K...KK...K.',
    'KK...KK...KK',
    '.KK..KK..KK.',
    '..KKKKKKKK..',
    '....KKKK....',
    '.....KK.....'],
  port:[
    '.....RR.....',
    '....YYYY....',
    '....WWWW....',
    '...RRRRRR...',
    '...WWWWWW...',
    '...RRRRRR...',
    '...WWWWWW...',
    '..RRRRRRRR..',
    '..WWWWWWWW..',
    '..RRRRRRRR..',
    '.KKKKKKKKKK.',
    'LLLLLLLLLLLL'],
  boat:[
    '.......K........',
    '.......KW.......',
    '.......KWW......',
    '.......KWWW.....',
    '.......KWWWW....',
    '...WWW.KWWWWW...',
    '..WWWW.KWWWWWW..',
    '.WWWWW.K........',
    '.......K........',
    'RRRRRRRRRRRRRRR.',
    '.RRRRRRRRRRRRR..',
    '..KKKKKKKKKKK...'],
  flag:[
    'K...........',
    'KRRRRRRR....',
    'KRRRRRRRRR..',
    'KRRRRRRRRRR.',
    'KRRRRRRRRR..',
    'KRRRRRRR....',
    'K...........',
    'K...........',
    'K...........',
    'K...........'],
  book:[
    '.KKKKKKKKKK.',
    'KWWWWWKWWWWK',
    'KWWWWWKWWWWK',
    'KWBBWWKWBBWK',
    'KWWWWWKWWWWK',
    'KWBBWWKWBBWK',
    'KWWWWWKWWWWK',
    'KWWWWWKWWWWK',
    '.KKKKKKKKKK.'],
  chart:[
    '.....KK.....',
    '....KRRK....',
    '...K.RR.K...',
    '..K..RR..K..',
    '.K...RR...K.',
    'KKKKKRRKKKKK',
    'KKKKKWWKKKKK',
    '.K...WW...K.',
    '..K..WW..K..',
    '...K.WW.K...',
    '....KWWK....',
    '.....KK.....'],
  cloud:[
    '.....WWWW.....',
    '...WWWWWWWW...',
    '..WWWWWWWWWW..',
    '.WWWWWWWWWWWW.',
    'WWWWWWWWWWWWWW',
    '.GGGGGGGGGGGG.',
    '..L..L..L..L..',
    '.L..L..L..L...'],
  bottle:[
    '...KK...',
    '...DD...',
    '...WW...',
    '..WWWW..',
    '.WWLLWW.',
    '.WLLLLW.',
    '.WLSSLW.',
    '.WLSSLW.',
    '.WLLLLW.',
    '.WWLLWW.',
    '..WWWW..'],
  scroll:[
    '.KKKKKKKKK.',
    'KSSSSSSSSSK',
    'KSKKKKKKKSK',
    'KSSSSSSSSSK',
    'KSKKKKKSSSK',
    'KSSSSSSSSSK',
    'KSKKKKKKKSK',
    'KSSSSSSSSSK',
    '.KKKKKKKKK.'],
  ships:[
    '....K......K....',
    '....KW.....KW...',
    '....KWW....KWW..',
    '....KWWW...KWWW.',
    '....K......K....',
    'RRRRRRRRR.BBBBBB',
    '.RRRRRRR...BBBB.',
    'LLLLLLLLLLLLLLLL'],
  star:[
    '.....YY.....',
    '.....YY.....',
    '....YYYY....',
    'YYYYYYYYYYYY',
    '.YYYYYYYYYY.',
    '..YYYYYYYY..',
    '...YYYYYY...',
    '..YYY..YYY..',
    '.YY......YY.'],
  wave:[
    '..LL....LL....LL',
    '.L..L..L..L..L..',
    'L....LL....LL...']
};
function sprite(name){
  const rows = SPRITES[name]; if (!rows) return '';
  const w = Math.max(...rows.map(r => r.length));
  let out = '';
  rows.forEach((r, y) => {
    let x = 0;
    while (x < r.length) {
      const c = r[x];
      if (c === '.') { x++; continue; }
      let x2 = x; while (x2 < r.length && r[x2] === c) x2++;
      out += `<rect x="${x}" y="${y}" width="${x2 - x}" height="1" fill="${PAL[c]}"/>`;
      x = x2;
    }
  });
  return `<svg viewBox="0 0 ${w} ${rows.length}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${out}</svg>`;
}
const SEC_ICON = {jachty:'boat', locja:'port', meteo:'cloud', mpzzm:'ships', nawigacja:'chart', planowanie:'book', ratownictwo:'lifebuoy', sygnalizacja:'flag', wylowione:'bottle'};

/* ---------- State ---------- */
const KEY = 'pnp:v1';
const defaultState = () => ({ q: {}, exams: [], flags: [], streak: {last: null, count: 0}, settings: {theme: 'auto', big: false}, learn: {}, exam: null });
let S = defaultState();
function load(){ try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(defaultState(), JSON.parse(raw)); } catch (e) {} }
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
function qs(id){ return S.q[id] || (S.q[id] = {seen: 0, ok: 0, bad: 0, box: 0, last: 0}); }
const today = () => new Date().toISOString().slice(0, 10);
function touchStreak(){
  const t = today();
  if (S.streak.last === t) return;
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  S.streak.count = S.streak.last === y ? S.streak.count + 1 : 1;
  S.streak.last = t;
}

/* ---------- Data ---------- */
let DATA = null; // {meta, sections, questions}
let BYID = {};
let SECTIONS = [];
function sectionQuestions(sid){ return DATA.questions.filter(q => q.section === sid); }
function hasAnswer(q){ return !!q.answer; }

/* ---------- DOM helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function toast(msg, ms = 1800){ const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => t.hidden = true, ms); }
function sheet(html){
  const s = $('#sheet'), b = $('#sheet-backdrop');
  s.innerHTML = html; s.hidden = false; b.hidden = false;
  const close = () => { s.hidden = true; b.hidden = true; };
  b.onclick = close; s.querySelectorAll('[data-close]').forEach(x => x.onclick = close);
  return close;
}
function setTitle(t){ $('#topbar-title').textContent = t; }
function pct(a, b){ return b ? Math.round(100 * a / b) : 0; }
function shuffle(a){ for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ---------- Theme ---------- */
function applyTheme(){
  let t = S.settings.theme;
  if (t === 'auto') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
  document.documentElement.dataset.theme = t === 'day' ? '' : t;
  $('#btn-theme').textContent = {day: '☀', night: '☾', watch: '●'}[t];
  document.documentElement.style.fontSize = S.settings.big ? '18px' : '';
  const meta = $('meta[name="theme-color"]'); if (meta) meta.content = '#0b1d33';
}
$('#btn-theme').onclick = () => {
  const order = ['day', 'night', 'watch'];
  let cur = S.settings.theme; if (cur === 'auto') cur = matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
  S.settings.theme = order[(order.indexOf(cur) + 1) % order.length]; save(); applyTheme();
  toast({day: 'Dzień', night: 'Noc', watch: 'Wachta nocna'}[S.settings.theme]);
};

/* ---------- Router ---------- */
const routes = {};
function go(hash){ location.hash = hash; }
function route(){
  const h = location.hash.replace(/^#/, '') || 'home';
  const [name, ...args] = h.split('/');
  const fn = routes[name] || routes.home;
  document.querySelectorAll('.tabbar a').forEach(a => a.classList.toggle('active', a.dataset.tab === name || (name.startsWith('learn') && a.dataset.tab === 'learn') || (name.startsWith('exam') && a.dataset.tab === 'exam')));
  $('#btn-back').classList.toggle('invisible', ['home', 'learn', 'exam', 'review', 'stats'].includes(name) && args.length === 0);
  const screen = $('#screen'); screen.innerHTML = ''; screen.scrollTop = 0;
  fn(screen, ...args);
}
$('#btn-back').onclick = () => history.length > 1 ? history.back() : go('home');
addEventListener('hashchange', route);

/* ---------- Disputed questions ---------- */
const DISPUTE_RE = /^(sporne|nieaktualne|częściowo nieaktualne|uwaga|tekst-scalony|rysunek:|terminologia)/;
function isDisputed(q){ return q.confidence === 'C' || (q.flags || []).some(f => DISPUTE_RE.test(f)); }
function disputeReason(q){ const f = (q.flags || []).find(x => DISPUTE_RE.test(x)); return f || 'pewność C: odpowiedź do potwierdzenia u instruktora'; }

/* ---------- Mastery ---------- */
function secStats(sid){
  const list = sectionQuestions(sid);
  let seen = 0, mastered = 0, ok = 0, bad = 0, withAns = 0;
  list.forEach(q => { const s = S.q[q.id]; if (hasAnswer(q)) withAns++; if (s && s.seen) seen++; if (s && s.box >= 1) mastered++; if (s) { ok += s.ok; bad += s.bad; } });
  return {total: list.length, seen, mastered, ok, bad, withAns};
}

/* ---------- Home ---------- */
routes.home = (root) => {
  setTitle('Patent na patent');
  const total = DATA.questions.length;
  const withAns = DATA.questions.filter(hasAnswer).length;
  let answered = 0, ok = 0, bad = 0, mastered = 0;
  DATA.questions.forEach(q => { const s = S.q[q.id]; if (s) { if (s.seen) answered++; ok += s.ok; bad += s.bad; if (s.box >= 1) mastered++; } });
  const prog = pct(mastered || answered, total);
  root.append(el(`
    <div class="hero">
      <div class="logo">${sprite('mewa')}</div>
      <h1>Patent na patent</h1>
      <div class="sub">jachtowy sternik morski</div>
    </div>`));
  const voyage = el(`<div class="voyage"><div class="track"><div class="waves"></div><div class="boat">${sprite('boat')}</div></div><div class="caption"></div></div>`);
  const track = $('.track', voyage);
  const ports = SECTIONS.filter(s => s.id !== 'wylowione');
  let next = null;
  ports.forEach((s, i) => {
    const st = secStats(s.id);
    const p = st.total ? pct(st.withAns ? st.mastered : st.seen, st.total) : 0;
    const done = p >= 80;
    if (!done && !next) next = {s, p};
    const m = el(`<div class="port-mark ${done ? 'done' : ''}" title="${esc(s.name)}" style="left:${((i + 0.5) / ports.length * 100).toFixed(1)}%">${sprite('port')}</div>`);
    track.insertBefore(m, $('.boat', track));
  });
  $('.boat', voyage).style.left = (3 + prog * 0.94) + '%';
  $('.caption', voyage).textContent = next ? `Następny port: ${next.s.name} · ${next.p}%` : 'Wszystkie porty zaliczone. Czas na egzamin!';
  root.append(voyage);
  root.append(el(`
    <div class="stat-tiles">
      <div class="tile"><div class="big">${answered}</div><div class="lbl">pytań<br>przerobionych</div></div>
      <div class="tile"><div class="big">${ok + bad ? pct(ok, ok + bad) + '%' : '–'}</div><div class="lbl">skuteczność</div></div>
      <div class="tile"><div class="big">${S.streak.last === today() || S.streak.last === new Date(Date.now() - 864e5).toISOString().slice(0, 10) ? S.streak.count : 0}</div><div class="lbl">dni<br>z rzędu</div></div>
    </div>`));
  root.append(el(`
    <div class="stack">
      <button class="btn primary" id="h-learn"><span class="spr">${sprite('book')}</span>Nauka działami</button>
      <button class="btn sea" id="h-exam"><span class="spr">${sprite('chart')}</span>Egzamin próbny</button>
      <button class="btn" id="h-review"><span class="spr">${sprite('anchor')}</span>Powtórz błędy</button>
    </div>`));
  $('#h-learn', root).onclick = () => go('learn');
  $('#h-exam', root).onclick = () => go('exam');
  $('#h-review', root).onclick = () => go('review');
};

/* ---------- Learn: section list ---------- */
routes.learn = (root, sid, idx) => {
  if (sid) return learnQuestion(root, sid, idx);
  setTitle('Nauka');
  root.append(el('<h2>Wybierz dział</h2>'));
  const list = el('<div class="seclist"></div>');
  SECTIONS.forEach(s => {
    const st = secStats(s.id);
    if (!st.total) return;
    const p = st.withAns ? pct(st.mastered, st.total) : pct(st.seen, st.total);
    const item = el(`
      <button class="secitem ${s.id === 'wylowione' ? 'own' : ''}">
        <div class="spr">${sprite(SEC_ICON[s.id] || 'book')}</div>
        <div class="grow">
          <div class="name">${esc(s.name)}</div>
          <div class="meta">${st.total} pytań · ${st.withAns ? 'opanowane ' + st.mastered : 'przejrzane ' + st.seen}${st.withAns < st.total ? ' · odpowiedzi ' + st.withAns + '/' + st.total : ''}</div>
          <div class="progress ${p >= 80 ? 'ok' : ''}"><i style="width:${p}%"></i></div>
        </div>
        <div class="pct">${p}%</div>
      </button>`);
    item.onclick = () => {
      const L = S.learn[s.id] || {idx: 0};
      const close = sheet(`
        <h3>${esc(s.name)}</h3>
        <p class="small muted">Ostatnio: pytanie ${L.idx + 1} z ${st.total}.</p>
        <button class="btn primary" data-act="cont">Kontynuuj od ${L.idx + 1}</button>
        <button class="btn" data-act="start">Od początku</button>
        <button class="btn" data-act="rand">Losowa kolejność</button>
        <button class="btn ghost" data-close>Anuluj</button>`);
      $('#sheet [data-act="cont"]').onclick = () => { close(); S.learn[s.id] = {idx: L.idx, order: null}; save(); go(`learn/${s.id}/${L.idx}`); };
      $('#sheet [data-act="start"]').onclick = () => { close(); S.learn[s.id] = {idx: 0, order: null}; save(); go(`learn/${s.id}/0`); };
      $('#sheet [data-act="rand"]').onclick = () => { close(); S.learn[s.id] = {idx: 0, order: shuffle(sectionQuestions(s.id).map(q => q.id))}; save(); go(`learn/${s.id}/0`); };
    };
    list.append(item);
  });
  root.append(list);
};

/* ---------- Question view (learn / review) ---------- */
function questionCard(q, opts){
  // opts: {mode:'learn'|'review'|'exam', onAnswer(letter), selected, reveal, eliminated:[]}
  const sec = SECTIONS.find(s => s.id === q.section);
  const card = el(`<div class="card">
    <div class="qhead"><span class="pill">${esc(sec ? sec.name : q.section)}</span><span class="pill">nr ${q.id}${q.origin === 'own' ? ' · własne' : ''}</span></div>
    ${q.question_image ? `<div class="qimg"><img src="data/img/${esc(q.question_image)}" alt="Ilustracja do pytania ${q.id}"></div>` : ''}
    <div class="qtext">${esc(q.question)}</div>
    <div class="opts"></div>
  </div>`);
  const optsEl = $('.opts', card);
  q.options.forEach(o => {
    const b = el(`<button class="opt" data-letter="${o.letter}"><span class="letter">${o.letter}</span><span class="grow">${o.image ? `<img src="data/img/${esc(o.image)}" alt="Opcja ${o.letter}">` : esc(o.text)}</span></button>`);
    if (opts.eliminated && opts.eliminated.includes(o.letter)) b.classList.add('eliminated');
    if (opts.selected === o.letter) b.classList.add('selected');
    if (opts.reveal && q.answer) {
      if (o.letter === q.answer) b.classList.add('correct');
      else if (opts.selected === o.letter) b.classList.add('wrong');
      b.disabled = true;
    }
    b.onclick = () => opts.onAnswer && opts.onAnswer(o.letter);
    optsEl.append(b);
  });
  return card;
}
function legendFor(sources){
  const L = (DATA.meta && DATA.meta.sources_legend) || {};
  const keys = Object.keys(L).filter(k => sources.some(s => s.startsWith(k + ',') || s === k));
  return keys.length ? `<div class="legend">${keys.map(k => `<b>${esc(k)}</b> = ${esc(L[k])}`).join('<br>')}</div>` : '';
}
function feedbackBlock(q, selected){
  if (!q.answer) {
    return el(`<div class="feedback pending"><div class="head">Odpowiedź w opracowaniu</div><p class="small">To pytanie nie ma jeszcze zweryfikowanej odpowiedzi z uzasadnieniem. Zaznaczyłaś ${selected}. Wrócimy do niego, gdy dział będzie opracowany.</p></div>`);
  }
  const ok = selected === q.answer;
  const conf = {A: 'przepis z cytatem', B: 'wiedza podręcznikowa', C: 'sporne / nieaktualne'}[q.confidence] || '';
  const fb = el(`<div class="feedback ${ok ? 'ok' : 'bad'}">
    <div class="head">${ok ? 'Dobrze!' : 'Źle. Prawidłowa: ' + q.answer}</div>
    ${q.explanation ? `<p>${esc(q.explanation)}</p>` : ''}
    ${q.sources && q.sources.length ? `<div class="src"><b>Źródła:</b><ul>${q.sources.map(s => `<li>${esc(s)}</li>`).join('')}</ul>${legendFor(q.sources)}</div>` : ''}
    ${conf ? `<span class="conf">pewność: ${conf}</span>` : ''}
    ${q.flags && q.flags.some(f => /sporne|nieaktual|scalony/.test(f)) ? `<div class="flagnote">${esc(q.flags.filter(f => /sporne|nieaktual|scalony/.test(f)).join(' · '))}</div>` : ''}
  </div>`);
  return fb;
}
function gullHint(q){
  let txt;
  if (q.hint) txt = q.hint;
  else if (q.sources && q.sources.length) txt = 'Zajrzyj do: ' + q.sources.join('; ') + '. Odpowiedzi nie zdradzę, ale tam jest wszystko.';
  else txt = 'Kraaa. Do tego pytania nie mam jeszcze podpowiedzi. Odpowiedź jest w opracowaniu.';
  return el(`<div class="gull"><div class="spr">${sprite('mewa')}</div><div><div class="who">Pomocna Mewa</div>${esc(txt)}</div></div>`);
}
function recordAnswer(q, letter){
  const s = qs(q.id); s.seen++; s.last = Date.now();
  if (q.answer) {
    if (letter === q.answer) { s.ok++; s.box = Math.min(3, s.box + 1); }
    else { s.bad++; s.box = 0; }
  }
  touchStreak(); save();
}

function learnQuestion(root, sid, idxStr){
  const sec = SECTIONS.find(s => s.id === sid);
  const L = S.learn[sid] || (S.learn[sid] = {idx: 0, order: null});
  const ids = L.order || sectionQuestions(sid).map(q => q.id);
  let idx = Math.max(0, Math.min(ids.length - 1, parseInt(idxStr || L.idx || 0, 10) || 0));
  L.idx = idx; save();
  const q = BYID[ids[idx]];
  setTitle(sec ? sec.name : 'Nauka');
  let selected = null, eliminated = [], revealed = false, buoyUsed = false;
  const nextFn = () => {
    if (idx === ids.length - 1) { S.learn[sid] = {idx: 0, order: null}; save(); toast('Dział przerobiony. Dobra robota!'); go('learn'); }
    else go(`learn/${sid}/${idx + 1}`);
  };
  const render = () => {
    root.innerHTML = '';
    const top = el(`<div class="row navtop"><button class="minibtn" id="n-prev" ${idx === 0 ? 'disabled' : ''} aria-label="Poprzednie">◀</button><div class="qhead"><span class="pill">${idx + 1} / ${ids.length}</span></div><div class="progress grow" style="height:10px"><i style="width:${pct(idx + 1, ids.length)}%"></i></div><button class="minibtn" id="n-skip">Pomiń ▶</button></div>`);
    root.append(top);
    $('#n-prev', top).onclick = () => go(`learn/${sid}/${idx - 1}`);
    $('#n-skip', top).onclick = nextFn;
    const flagged = S.flags.includes(q.id);
    const tools = el(`<div class="toolrow">
      <button class="btn" id="t-gull"><span class="spr">${sprite('mewa')}</span>Mewa</button>
      <button class="btn" id="t-buoy" ${(buoyUsed || revealed || !q.answer) ? 'disabled' : ''}><span class="spr">${sprite('lifebuoy')}</span>Koło</button>
      <button class="btn ${flagged ? 'sea' : ''}" id="t-flag"><span class="spr">${sprite('flag')}</span>${flagged ? 'Oznaczone' : 'Oznacz'}</button>
    </div>`);
    root.append(tools);
    const card = questionCard(q, {selected, reveal: revealed, eliminated, onAnswer: (l) => {
      if (revealed) return;
      selected = l; revealed = true; recordAnswer(q, l); render();
      if (q.answer && l === q.answer) toast(['Dobrze!', 'Tak jest!', 'Ster lekko, dobrze!', 'Czysto!'][Math.floor(Math.random() * 4)]);
    }});
    root.append(card);
    if (revealed) root.append(feedbackBlock(q, selected));
    $('#t-gull', tools).onclick = () => { if (!$('.gull', root)) { card.before(gullHint(q)); } };
    $('#t-buoy', tools).onclick = () => {
      const wrong = q.options.map(o => o.letter).filter(l => l !== q.answer);
      eliminated = [wrong[Math.floor(Math.random() * wrong.length)]]; buoyUsed = true; render(); toast('Koło ratunkowe: jedna zła odpowiedź mniej');
    };
    $('#t-flag', tools).onclick = () => { const i = S.flags.indexOf(q.id); if (i >= 0) S.flags.splice(i, 1); else S.flags.push(q.id); save(); render(); };
    if (revealed) {
      const nb = el(`<button class="btn primary" id="n-next">${idx === ids.length - 1 ? 'Koniec działu' : 'Dalej ▶'}</button>`);
      nb.onclick = nextFn; root.append(nb);
    }
  };
  render();
}

/* ---------- Review (Leitner) ---------- */
function reviewPool(){
  return DATA.questions.filter(q => { const s = S.q[q.id]; return s && s.bad > 0 && s.box < 3; })
    .sort((a, b) => (S.q[a.id].box - S.q[b.id].box) || (S.q[a.id].last - S.q[b.id].last));
}
routes.review = (root, idxStr) => {
  setTitle('Powtórki');
  const pool = reviewPool();
  const flagged = S.flags.map(id => BYID[id]).filter(Boolean);
  if (idxStr === undefined) {
    root.append(el(`<h2>Pudełka Leitnera</h2>`));
    root.append(el(`<div class="card">
      <p>Pytania, które poszły źle, wracają tu, dopóki nie odpowiesz na nie dobrze trzy razy z rzędu.</p>
      <div class="row between"><span>Do powtórki</span><span class="big">${pool.length}</span></div>
      <button class="btn primary" id="r-start" ${pool.length ? '' : 'disabled'}><span class="spr">${sprite('anchor')}</span>Powtarzaj (${pool.length})</button>
    </div>`));
    $('#r-start', root).onclick = () => { S.reviewOrder = pool.map(q => q.id); save(); go('review/0'); };
    const fl = el(`<div class="card"><div class="row between"><h3>Oznaczone flagą</h3><span class="big">${flagged.length}</span></div><div class="stack" id="fl-list"></div></div>`);
    flagged.forEach(q => { const b = el(`<button class="opt"><span class="letter">${q.id}</span><span class="grow small">${esc(q.question.slice(0, 110))}${q.question.length > 110 ? '…' : ''}</span></button>`); b.onclick = () => { const ids = sectionQuestions(q.section).map(x => x.id); S.learn[q.section] = {idx: ids.indexOf(q.id), order: null}; save(); go(`learn/${q.section}/${ids.indexOf(q.id)}`); }; $('#fl-list', fl).append(b); });
    if (!flagged.length) $('#fl-list', fl).append(el('<p class="small muted">Oznaczaj pytania flagą w trakcie nauki, żeby wrócić do nich tutaj albo zapytać instruktora.</p>'));
    root.append(fl);
    return;
  }
  const ids = S.reviewOrder || pool.map(q => q.id);
  let idx = parseInt(idxStr, 10) || 0;
  if (!ids.length || idx >= ids.length) { root.append(el(`<div class="empty"><div class="spr">${sprite('lifebuoy')}</div><h3>Koniec powtórki</h3><p>Wszystko z tej serii przerobione.</p><button class="btn primary" id="r-back">Wróć</button></div>`)); $('#r-back', root).onclick = () => go('review'); return; }
  const q = BYID[ids[idx]];
  let selected = null, revealed = false;
  const render = () => {
    root.innerHTML = '';
    const top = el(`<div class="row navtop"><div class="qhead"><span class="pill">powtórka ${idx + 1} / ${ids.length}</span><span class="pill">pudełko ${qs(q.id).box}</span></div><span class="grow"></span><button class="minibtn" id="g">Mewa</button><button class="minibtn" id="n-skip">Pomiń ▶</button></div>`);
    root.append(top);
    const card = questionCard(q, {selected, reveal: revealed, onAnswer: (l) => { if (revealed) return; selected = l; revealed = true; recordAnswer(q, l); render(); }});
    root.append(card);
    if (revealed) root.append(feedbackBlock(q, selected));
    $('#g', top).onclick = () => { if (!$('.gull', root)) card.before(gullHint(q)); };
    $('#n-skip', top).onclick = () => go(`review/${idx + 1}`);
    if (revealed) { const nb = el('<button class="btn primary" id="n">Dalej ▶</button>'); nb.onclick = () => go(`review/${idx + 1}`); root.append(nb); }
  };
  render();
};

/* ---------- Exam ---------- */
const EXAM_N = 75, EXAM_PASS = 65, EXAM_SEC = 120 * 60;
function buildExam(){
  const pool = DATA.questions.filter(hasAnswer);
  if (pool.length <= EXAM_N) return shuffle(pool.map(q => q.id));
  // proporcjonalnie do działów (metoda największych reszt)
  const groups = {}; pool.forEach(q => (groups[q.section] = groups[q.section] || []).push(q.id));
  const keys = Object.keys(groups); const quota = {}; let used = 0;
  const rem = keys.map(k => { const exact = EXAM_N * groups[k].length / pool.length; quota[k] = Math.floor(exact); used += quota[k]; return [k, exact - quota[k]]; }).sort((a, b) => b[1] - a[1]);
  for (let i = 0; used < EXAM_N; i = (i + 1) % rem.length) { quota[rem[i][0]]++; used++; }
  let ids = []; keys.forEach(k => ids = ids.concat(shuffle(groups[k].slice()).slice(0, quota[k])));
  return shuffle(ids);
}
let examTimer = null;
function examLeft(){ return Math.max(0, EXAM_SEC - Math.floor((Date.now() - S.exam.startedAt) / 1000)); }
function fmt(sec){ const m = Math.floor(sec / 60), s = sec % 60; return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`; }
routes.exam = (root, sub, arg) => {
  clearInterval(examTimer);
  if (sub === 'run') return examRun(root, arg);
  if (sub === 'result') return examResult(root, arg);
  setTitle('Egzamin próbny');
  const withAns = DATA.questions.filter(hasAnswer).length;
  if (S.exam && !S.exam.finished) {
    root.append(el(`<div class="card"><h3>Egzamin w toku</h3><p>Zostało ${fmt(examLeft())}. Odpowiedzi: ${Object.keys(S.exam.answers).length}/${S.exam.ids.length}.</p><button class="btn primary" id="e-cont">Wróć do egzaminu</button><button class="btn ghost" id="e-drop">Przerwij i odrzuć</button></div>`));
    $('#e-cont', root).onclick = () => go('exam/run');
    $('#e-drop', root).onclick = () => { S.exam = null; save(); route(); };
    return;
  }
  root.append(el(`<div class="card">
    <h3>Jak na egzaminie PZŻ</h3>
    <ul class="small" style="margin:0;padding-left:18px"><li>75 pytań jednokrotnego wyboru, losowanych z bazy proporcjonalnie do działów</li><li>120 minut, zegar leci także po zamknięciu apki</li><li>próg zaliczenia: 65 poprawnych</li><li>3 koła ratunkowe (każde usuwa jedną złą odpowiedź), Mewa śpi</li><li>zadanie nawigacyjne na mapie ćwiczysz osobno, apka go nie zastąpi</li></ul>
    ${withAns < EXAM_N ? `<div class="flagnote">Na razie opracowanych odpowiedzi jest ${withAns}. Egzamin próbny ruszy, gdy będzie ich co najmniej ${EXAM_N}.</div>` : ''}
    <button class="btn primary" id="e-start" ${withAns < EXAM_N ? 'disabled' : ''}><span class="spr">${sprite('chart')}</span>Start</button>
  </div>`));
  $('#e-start', root).onclick = () => { S.exam = {ids: buildExam(), answers: {}, idx: 0, startedAt: Date.now(), buoys: 3, elim: {}, finished: false}; save(); go('exam/run'); };
  if (S.exams.length) {
    const h = el(`<div class="card"><h3>Ostatnie wyniki</h3><div class="histlist"></div></div>`);
    S.exams.slice(-5).reverse().forEach(e => $('.histlist', h).append(el(`<div class="histitem ${e.passed ? 'pass' : 'fail'}"><span>${new Date(e.date).toLocaleDateString('pl-PL')} · ${fmt(e.duration)}</span><span class="sc">${e.score}/${e.total}</span></div>`)));
    root.append(h);
  }
};
function finishExam(){
  const E = S.exam; if (!E || E.finished) return;
  let score = 0; E.ids.forEach(id => { if (E.answers[id] === BYID[id].answer) score++; });
  E.finished = true; E.score = score; E.endedAt = Date.now();
  E.ids.forEach(id => { const q = BYID[id]; const s = qs(id); s.seen++; s.last = Date.now(); if (E.answers[id] === q.answer) { s.ok++; s.box = Math.min(3, s.box + 1); } else { s.bad++; s.box = 0; } });
  S.exams.push({date: E.endedAt, score, total: E.ids.length, passed: score >= EXAM_PASS, duration: Math.min(EXAM_SEC, Math.floor((E.endedAt - E.startedAt) / 1000))});
  touchStreak(); save(); go('exam/result');
}
function examRun(root, idxStr){
  const E = S.exam; if (!E || E.finished) return go('exam');
  if (idxStr !== undefined) E.idx = Math.max(0, Math.min(E.ids.length - 1, parseInt(idxStr, 10) || 0));
  const q = BYID[E.ids[E.idx]];
  setTitle(`Egzamin · ${E.idx + 1}/${E.ids.length}`);
  root.innerHTML = '';
  const head = el(`<div class="row between"><div class="timer" id="timer">${fmt(examLeft())}</div><div class="lifebuoys" id="buoys"></div><button class="btn ghost" style="width:auto;min-height:40px" id="e-grid">Mapa</button></div>`);
  root.append(head);
  const renderBuoys = () => { const b = $('#buoys', head); b.innerHTML = ''; for (let i = 0; i < 3; i++) b.append(el(`<div class="spr ${i < 3 - E.buoys ? 'used' : ''}">${sprite('lifebuoy')}</div>`)); };
  renderBuoys();
  examTimer = setInterval(() => { const t = $('#timer'); if (!t) return clearInterval(examTimer); const left = examLeft(); t.textContent = fmt(left); t.classList.toggle('low', left < 600); if (left <= 0) { clearInterval(examTimer); finishExam(); } }, 1000);
  const renderQ = () => {
    const old = $('.card', root); if (old) old.remove();
    const card = questionCard(q, {selected: E.answers[q.id], eliminated: E.elim[q.id] || [], onAnswer: (l) => { E.answers[q.id] = l; save(); renderQ(); }});
    head.after(card);
  };
  renderQ();
  const tools = el(`<div class="toolrow"><button class="btn" id="x-buoy" ${E.buoys <= 0 || (E.elim[q.id] || []).length ? 'disabled' : ''}><span class="spr">${sprite('lifebuoy')}</span>Koło (${E.buoys})</button><button class="btn" id="x-skip">Pomiń</button><button class="btn sea" id="x-finish">Zakończ</button></div>`);
  root.append(tools);
  $('#x-buoy', tools).onclick = () => { const wrong = q.options.map(o => o.letter).filter(l => l !== q.answer); E.elim[q.id] = [wrong[Math.floor(Math.random() * wrong.length)]]; E.buoys--; save(); renderBuoys(); renderQ(); $('#x-buoy', tools).disabled = true; };
  $('#x-skip', tools).onclick = () => { const next = E.ids.findIndex((id, i) => i > E.idx && !E.answers[id]); go(`exam/run/${next >= 0 ? next : (E.idx + 1) % E.ids.length}`); };
  $('#x-finish', tools).onclick = () => {
    const unanswered = E.ids.filter(id => !E.answers[id]).length;
    const close = sheet(`<h3>Zakończyć egzamin?</h3><p>${unanswered ? `Bez odpowiedzi: ${unanswered} pytań. Liczą się jako błędne.` : 'Wszystkie pytania mają odpowiedź.'}</p><button class="btn primary" id="f-yes">Tak, oceń</button><button class="btn ghost" data-close>Jeszcze nie</button>`);
    $('#f-yes').onclick = () => { close(); finishExam(); };
  };
  $('#e-grid', head).onclick = () => {
    const g = el('<div class="examgrid"></div>');
    E.ids.forEach((id, i) => { const b = el(`<button class="${E.answers[id] ? 'answered' : ''} ${i === E.idx ? 'current' : ''}">${i + 1}</button>`); b.onclick = () => { close(); go(`exam/run/${i}`); }; g.append(b); });
    const close = sheet(`<h3>Mapa odpowiedzi</h3>`); $('#sheet').append(g); $('#sheet').append(el('<button class="btn ghost" data-close>Zamknij</button>')); $('#sheet [data-close]').onclick = close;
  };
  const nav = el(`<div class="bottom-actions"><div class="navrow"><button class="btn ghost" id="p" ${E.idx === 0 ? 'disabled' : ''}>◀ Wstecz</button><button class="btn primary" id="n">${E.idx === E.ids.length - 1 ? 'Do mapy' : 'Dalej ▶'}</button></div></div>`);
  root.append(nav);
  $('#p', nav).onclick = () => go(`exam/run/${E.idx - 1}`);
  $('#n', nav).onclick = () => { if (E.idx === E.ids.length - 1) $('#e-grid', head).click(); else go(`exam/run/${E.idx + 1}`); };
}
function examResult(root, idxStr){
  const E = S.exam; if (!E || !E.finished) return go('exam');
  setTitle('Wynik');
  if (idxStr !== undefined) {
    const i = parseInt(idxStr, 10) || 0; const q = BYID[E.ids[i]];
    root.append(el(`<div class="qhead"><span class="pill">przegląd ${i + 1} / ${E.ids.length}</span></div>`));
    root.append(questionCard(q, {selected: E.answers[q.id], reveal: true}));
    root.append(feedbackBlock(q, E.answers[q.id] || '–'));
    const nav = el(`<div class="bottom-actions"><div class="navrow"><button class="btn ghost" id="p" ${i === 0 ? 'disabled' : ''}>◀</button><button class="btn primary" id="n" ${i === E.ids.length - 1 ? 'disabled' : ''}>▶</button></div><button class="btn ghost" id="b" style="margin-top:8px">Do wyniku</button></div>`);
    root.append(nav); $('#p', nav).onclick = () => go(`exam/result/${i - 1}`); $('#n', nav).onclick = () => go(`exam/result/${i + 1}`); $('#b', nav).onclick = () => go('exam/result');
    return;
  }
  const passed = E.score >= EXAM_PASS;
  root.append(el(`<div class="card result">
    <div class="spr" style="width:72px;height:72px">${sprite(passed ? 'scroll' : 'lifebuoy')}</div>
    <div class="score">${E.score}<span class="muted" style="font-size:28px">/${E.ids.length}</span></div>
    <div class="verdict ${passed ? 'ok' : 'bad'}">${passed ? 'Zaliczone! Próg 65 pokonany.' : 'Nie tym razem. Próg to 65.'}</div>
    <p class="small muted">Czas: ${fmt(Math.min(EXAM_SEC, Math.floor((E.endedAt - E.startedAt) / 1000)))}. Pamiętaj o zadaniu nawigacyjnym, które też trzeba rozwiązać bezbłędnie.</p>
  </div>`));
  const g = el('<div class="card"><h3>Mapa odpowiedzi</h3><div class="examgrid"></div><p class="small muted">Dotknij numeru, żeby zobaczyć pytanie i uzasadnienie.</p></div>');
  E.ids.forEach((id, i) => { const ok = E.answers[id] === BYID[id].answer; const b = el(`<button class="${!E.answers[id] ? 'skipped' : ok ? 'correct' : 'wrong'}">${i + 1}</button>`); b.onclick = () => go(`exam/result/${i}`); $('.examgrid', g).append(b); });
  root.append(g);
  const bySec = {}; E.ids.forEach(id => { const q = BYID[id]; const s = bySec[q.section] = bySec[q.section] || {ok: 0, n: 0}; s.n++; if (E.answers[id] === q.answer) s.ok++; });
  const sc = el('<div class="card"><h3>Działami</h3><div class="stack"></div></div>');
  Object.entries(bySec).forEach(([sid, s]) => { const sec = SECTIONS.find(x => x.id === sid); $('.stack', sc).append(el(`<div><div class="row between small"><span>${esc(sec ? sec.name : sid)}</span><span class="kbd">${s.ok}/${s.n}</span></div><div class="progress ${pct(s.ok, s.n) >= 87 ? 'ok' : ''}"><i style="width:${pct(s.ok, s.n)}%"></i></div></div>`)); });
  root.append(sc);
  const b = el('<button class="btn primary">Nowy egzamin</button>'); b.onclick = () => { S.exam = null; save(); go('exam'); }; root.append(b);
}

/* ---------- Stats / Dziennik ---------- */
routes.stats = (root) => {
  setTitle('Dziennik');
  let answered = 0, ok = 0, bad = 0;
  DATA.questions.forEach(q => { const s = S.q[q.id]; if (s) { if (s.seen) answered++; ok += s.ok; bad += s.bad; } });
  root.append(el(`<div class="stat-tiles">
    <div class="tile"><div class="big">${answered}</div><div class="lbl">przerobione</div></div>
    <div class="tile"><div class="big">${ok + bad ? pct(ok, ok + bad) + '%' : '–'}</div><div class="lbl">skuteczność</div></div>
    <div class="tile"><div class="big">${S.exams.filter(e => e.passed).length}</div><div class="lbl">zdane<br>egzaminy</div></div>
  </div>`));
  const sc = el('<div class="card"><h3>Działy</h3><div class="stack"></div></div>');
  SECTIONS.forEach(s => { const st = secStats(s.id); if (!st.total) return; const p = st.withAns ? pct(st.mastered, st.total) : pct(st.seen, st.total); $('.stack', sc).append(el(`<div><div class="row between small"><span>${esc(s.name)}</span><span class="kbd">${st.withAns ? st.mastered : st.seen}/${st.total}${st.ok + st.bad ? ' · ' + pct(st.ok, st.ok + st.bad) + '%' : ''}</span></div><div class="progress ${p >= 80 ? 'ok' : ''}"><i style="width:${p}%"></i></div></div>`)); });
  root.append(sc);
  // odznaki
  const badges = [
    {id: 'wachta', lbl: 'Pierwsza wachta', spr: 'star', ok: answered >= 10},
    {id: 'setka', lbl: 'Setka', spr: 'anchor', ok: answered >= 100},
    {id: 'sztorm', lbl: 'Tydzień z rzędu', spr: 'cloud', ok: S.streak.count >= 7},
    {id: 'sternik', lbl: 'Sternik', spr: 'scroll', ok: S.exams.some(e => e.passed)},
    ...SECTIONS.filter(s => s.id !== 'wylowione').map(s => { const st = secStats(s.id); return {id: s.id, lbl: s.short || s.name, spr: SEC_ICON[s.id], ok: st.total && (st.withAns ? st.mastered : st.seen) >= st.total}; })
  ];
  const bd = el('<div class="card"><h3>Odznaki</h3><div class="badges"></div></div>');
  badges.forEach(b => $('.badges', bd).append(el(`<div class="badge ${b.ok ? 'earned' : ''}"><div class="spr">${sprite(b.spr)}</div><div class="lbl">${esc(b.lbl)}</div></div>`)));
  root.append(bd);
  if (S.exams.length) { const h = el('<div class="card"><h3>Historia egzaminów</h3><div class="histlist"></div></div>'); S.exams.slice().reverse().forEach(e => $('.histlist', h).append(el(`<div class="histitem ${e.passed ? 'pass' : 'fail'}"><span>${new Date(e.date).toLocaleString('pl-PL', {dateStyle: 'short', timeStyle: 'short'})}</span><span class="sc">${e.score}/${e.total}</span></div>`))); root.append(h); }
  // pytania sporne
  const disputed = DATA.questions.filter(isDisputed);
  const dc = el(`<div class="card"><div class="row between"><h3>Pytania sporne i nieaktualne</h3><span class="big">${disputed.length}</span></div><p class="small muted">Pytania, przy których odpowiedź z klucza budzi wątpliwości albo przepis zmienił się od 2016 r. Warto omówić je z instruktorem.</p><button class="btn" id="s-disputed"><span class="spr">${sprite('flag')}</span>Pokaż listę</button></div>`);
  root.append(dc);
  $('#s-disputed', dc).onclick = () => {
    const close = sheet(`<h3>Pytania sporne i nieaktualne</h3><p class="small muted">Dotknij pytania, żeby je otworzyć w trybie nauki.</p><div class="stack" id="d-list"></div><button class="btn ghost" data-close>Zamknij</button>`);
    const list = $('#d-list');
    disputed.forEach(q => {
      const sec = SECTIONS.find(s => s.id === q.section);
      const b = el(`<button class="opt"><span class="letter">${q.id}</span><span class="grow small"><b>odp. ${q.answer}</b> · ${esc(sec ? sec.name : q.section)}<br>${esc(disputeReason(q))}</span></button>`);
      b.onclick = () => { close(); const ids = sectionQuestions(q.section).map(x => x.id); S.learn[q.section] = {idx: ids.indexOf(q.id), order: null}; save(); go(`learn/${q.section}/${ids.indexOf(q.id)}`); };
      list.append(b);
    });
  };
  // ustawienia
  const st = el(`<div class="card"><h3>Ustawienia</h3>
    <div class="row between"><span>Motyw</span><select id="s-theme" class="kbd" style="font-size:16px;padding:6px"><option value="auto">Jak system</option><option value="day">Dzień</option><option value="night">Noc</option><option value="watch">Wachta (czerwony)</option></select></div>
    <div class="row between"><span>Większa czcionka</span><input type="checkbox" id="s-big" style="width:24px;height:24px"></div>
    <button class="btn ghost" id="s-export">Eksportuj postępy</button>
    <button class="btn ghost" id="s-import">Importuj postępy</button>
    <button class="btn ghost" id="s-reset" style="color:var(--bad)">Wyzeruj wszystko</button>
    <p class="small muted">Postępy są tylko w tym telefonie. Eksport daje tekst do wklejenia na innym urządzeniu.</p>
  </div>`);
  root.append(st);
  const sel = $('#s-theme', st); sel.value = S.settings.theme; sel.onchange = () => { S.settings.theme = sel.value; save(); applyTheme(); };
  const big = $('#s-big', st); big.checked = !!S.settings.big; big.onchange = () => { S.settings.big = big.checked; save(); applyTheme(); };
  $('#s-export', st).onclick = () => { const txt = JSON.stringify(S); const close = sheet(`<h3>Eksport</h3><textarea class="io" id="io" readonly></textarea><button class="btn primary" id="cp">Kopiuj</button><button class="btn ghost" data-close>Zamknij</button>`); $('#io').value = txt; $('#cp').onclick = () => { navigator.clipboard?.writeText(txt).then(() => toast('Skopiowane'), () => { $('#io').select(); toast('Zaznacz i skopiuj ręcznie'); }); }; };
  $('#s-import', st).onclick = () => { const close = sheet(`<h3>Import</h3><p class="small">Wklej tekst z eksportu. Zastąpi obecne postępy.</p><textarea class="io" id="io"></textarea><button class="btn primary" id="ok">Wczytaj</button><button class="btn ghost" data-close>Anuluj</button>`); $('#ok').onclick = () => { try { const o = JSON.parse($('#io').value); if (!o.q) throw 0; S = Object.assign(defaultState(), o); save(); applyTheme(); close(); toast('Wczytane'); route(); } catch (e) { toast('To nie wygląda na eksport z tej apki'); } }; };
  $('#s-reset', st).onclick = () => { const close = sheet(`<h3>Wyzerować wszystko?</h3><p class="small">Postępy, historia egzaminów i flagi znikną.</p><button class="btn" id="ok" style="color:var(--bad)">Tak, wyzeruj</button><button class="btn ghost" data-close>Nie</button>`); $('#ok').onclick = () => { S = defaultState(); save(); applyTheme(); close(); route(); }; };
  root.append(el(`<p class="small muted">Baza: ${DATA.questions.length} pytań, źródło: ${esc(DATA.meta.source)}. Egzamin PZŻ: 75 pytań, 120 min, próg 65 poprawnych i zadanie nawigacyjne. Wersja danych: ${esc(DATA.meta.version || 'robocza')}.</p>`));
};

/* ---------- Boot ---------- */
async function boot(){
  load(); applyTheme();
  document.querySelectorAll('.tab-ico').forEach(e => e.innerHTML = sprite(e.dataset.sprite));
  try {
    const r = await fetch('data/questions.json', {cache: 'no-cache'});
    DATA = await r.json();
  } catch (e) {
    $('#screen').innerHTML = `<div class="empty"><div class="spr">${sprite('mewa')}</div><h3>Nie udało się wczytać pytań</h3><p>Sprawdź połączenie i odśwież.</p></div>`; return;
  }
  SECTIONS = DATA.sections.map(s => Object.assign({short: s.name.split(' ')[0]}, s));
  if (!SECTIONS.some(s => s.id === 'wylowione')) SECTIONS.push({id: 'wylowione', name: 'Wyłowione z morza', short: 'Wyłowione'});
  DATA.questions.forEach(q => BYID[q.id] = q);
  route();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
}
boot();
})();
