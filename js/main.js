/* Shared behaviour: mobile menu, grids + filters, project popup, carousel, events, contact form. */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const pad = (n) => String(n).padStart(2, '0');
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const text = (s) => (s === TODO || !s ? `<span class="todo">${TODO}</span>` : esc(s));

const FOLDER = { artworks: 'img/artworks', media: 'img/media' };
const cats = (w) => [].concat(w.category || []);
const imgSrc = (kind, work, n = 1) =>
  work.placeholder ? `img/media/placeholders/${work.id}.jpg` : `${FOLDER[kind]}/${work.id}/${n}.jpg`;
const findWork = (id) =>
  ARTWORKS.find((w) => w.id === id) ? ['artworks', ARTWORKS.find((w) => w.id === id)]
  : MEDIA.find((w) => w.id === id) ? ['media', MEDIA.find((w) => w.id === id)] : [];

/* ---------- Instagram links ---------- */
$$('[data-instagram]').forEach((a) => {
  a.href = INSTAGRAM; a.target = '_blank'; a.rel = 'noopener';
  a.setAttribute('aria-label', 'Instagram (opens in a new tab)'); // the ↗ arrow is not read out meaningfully
});

/* ---------- Links to Erosion.exe: glitch the current page before leaving ---------- */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// delegated, so it also catches links added later by JS (e.g. in the Artworks filter row)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href="erosion.html"]');
  if (!a || reducedMotion || e.ctrlKey || e.metaKey || e.shiftKey) return;
  e.preventDefault();
  document.body.classList.add('glitch-out');
  setTimeout(() => { location.href = a.href; }, 550);
});
// arriving from Erosion.exe: glitch into this page
try {
  if (sessionStorage.getItem('glitch-arrive')) {
    sessionStorage.removeItem('glitch-arrive');
    if (!reducedMotion) {
      document.body.classList.add('glitch-in');
      setTimeout(() => document.body.classList.remove('glitch-in'), 750);
    }
  }
} catch (_) { /* storage blocked: skip the effect */ }
// coming back with the browser's back button: remove the glitch state
window.addEventListener('pageshow', () => document.body.classList.remove('glitch-out'));

/* ---------- Mobile menu ---------- */
const menu = $('#mobile-menu');
if (menu) {
  const open = $('.menu-toggle');
  const close = $('.menu-close', menu);
  // while the menu is open, the page behind it can't be reached (keyboard/screen reader) or scrolled
  const behind = () => [...document.body.children].filter((el) => el !== menu && el.tagName !== 'SCRIPT');
  const setOpen = (isOpen) => {
    menu.hidden = !isOpen;
    open.setAttribute('aria-expanded', String(isOpen));
    behind().forEach((el) => { el.inert = isOpen; });
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';
  };
  open.addEventListener('click', () => { setOpen(true); close.focus(); });
  const shut = () => { setOpen(false); open.focus(); };
  close.addEventListener('click', shut);
  menu.addEventListener('keydown', (e) => { if (e.key === 'Escape') shut(); });
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

/* ---------- Grid + filters (artworks.html / media-design.html) ---------- */
const grid = $('[data-grid]');
if (grid) {
  const kind = grid.dataset.grid;
  const list = kind === 'artworks' ? ARTWORKS : MEDIA;

  grid.innerHTML = list.map((w, i) => w.placeholder
    ? `<div class="card is-placeholder" data-cat="${esc(cats(w).join('|'))}">
         <div class="thumb"><img src="${imgSrc(kind, w)}" alt="" loading="lazy"></div>
         <div class="meta meta--bar meta--ph"><span class="num">${pad(i + 1)}</span><span>${esc(w.title)} – <span class="ph">placeholder</span></span><span class="meta-tag">Coming soon</span></div>
       </div>`
    : `<button class="card" type="button" data-id="${w.id}" data-cat="${esc(cats(w).join('|'))}">
         <div class="thumb${w.thumbs ? ' thumb--multi' : ''}">${
           Array.from({ length: w.thumbs || 1 }, (_, n) =>
             `<img src="${imgSrc(kind, w, n + 1)}" alt="" loading="lazy">`).join('')}</div>
         <div class="meta${w.tag ? ' meta--bar' : ''}"><span class="num">${pad(i + 1)}</span><span>${esc(w.title)}</span>${
           w.tag ? `<span class="meta-tag">${esc(w.tag)}${w.year && w.year !== TODO ? ` · ${esc(w.year)}` : ''}</span>` : ''}</div>
       </button>`).join('');

  const filters = $('.filters');
  const empty = $('.grid-empty');
  filters.innerHTML = ['All', ...CATEGORIES[kind]]
    .map((c, i) => `<button type="button" aria-pressed="${i === 0}" data-filter="${c}">${c}</button>`).join('')
    // Artworks: the physical works lead on to the digital laboratory, at the far right of the filters
    + (kind === 'artworks' ? '<a class="filters-erosion" href="erosion.html">[Erosion.exe]</a>' : '');
  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    $$('[data-filter]', filters).forEach((b) => b.setAttribute('aria-pressed', b === btn));
    let shown = 0;
    $$('.card', grid).forEach((card) => {
      const match = btn.dataset.filter === 'All' || card.dataset.cat.split('|').includes(btn.dataset.filter);
      card.hidden = !match; shown += match;
    });
    if (empty) empty.hidden = shown > 0;
    // tell screen-reader users what the filter did
    const status = $('#filter-status');
    if (status) status.textContent = `${btn.dataset.filter}: showing ${shown} ${shown === 1 ? 'work' : 'works'}`;
  });

  /* Justified rows (Artworks): each card gets its image ratio as --r; the CSS does the rest.
     Works without a stored ratio get it from the image once it has loaded. */
  if (kind === 'artworks') {
    $$('.card', grid).forEach((card) => {
      const w = ARTWORKS.find((x) => x.id === card.dataset.id);
      if (w && w.ratio) card.style.setProperty('--r', w.ratio);
      else $('img', card).addEventListener('load', (e) => {
        card.style.setProperty('--r', (e.target.naturalWidth / e.target.naturalHeight).toFixed(3));
      }, { once: true });
    });
  }

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('[data-id]');
    if (card) openPopup(card.dataset.id, card);
    // placeholders can't be opened: a small shake says "not available yet"
    const ph = e.target.closest('.is-placeholder');
    if (ph) {
      ph.classList.remove('shake'); void ph.offsetWidth; ph.classList.add('shake');
      ph.addEventListener('animationend', () => ph.classList.remove('shake'), { once: true });
    }
  });
}

/* ---------- Popup ---------- */
const popup = $('#popup');
let current = null, index = 1, returnFocus = null;

// alt text for the big popup image: own alt if given, else title, year, material + first sentence of the description
function altText(w, n) {
  if (w.alt) return [].concat(w.alt)[n - 1] || w.alt;
  const first = w.description && w.description !== TODO ? w.description.split(/(?<=\.)\s/)[0].replace(/\.$/, '') : '';
  return [w.title, w.year !== TODO && w.year, w.material, first, `Photo ${n} of ${w.images}`].filter(Boolean).join('. ');
}

function renderPopup() {
  const [kind, w] = current;
  $('.popup-media img', popup).src = imgSrc(kind, w, index);
  $('.popup-media img', popup).alt = altText(w, index);
  $('.popup-count', popup).textContent = `${index} / ${w.images}`;
  $('.popup-nav', popup).hidden = w.images < 2;
}

function openPopup(id, from) {
  if (!popup) return;
  const found = findWork(id);
  if (!found.length) return;
  current = found; index = 1; returnFocus = from || null;
  const [, w] = found;
  $('.popup-info', popup).innerHTML = `
    <h2 id="popup-title">${esc(w.title)}</h2>
    <dl>
      <dt>Year</dt><dd>${text(w.year)}</dd>
      ${cats(w).length ? `<dt>Category</dt><dd>${esc(cats(w).join(' / '))}${w.sub ? ` <span class="sub">(${esc(w.sub)})</span>` : ''}</dd>` : ''}
      ${w.material ? `<dt>Material</dt><dd>${esc(w.material)}</dd>` : ''}
      ${w.tools ? `<dt>Tools</dt><dd>${esc(w.tools)}</dd>` : ''}
    </dl>
    <p>${text(w.description)}</p>
    ${w.link ? `<p><a class="btn" href="${esc(w.link.href)}" data-viewer="${esc(w.title)}">${esc(w.link.label)} →</a></p>` : ''}
    ${worksNav(id)}`;
  renderPopup();
  if (!popup.open) popup.showModal();
  history.replaceState(null, '', `#${id}`);
}

/* browse between works inside the popup, follows the active filter (only visible, real works) */
const visibleWorks = () => (grid ? $$('.card[data-id]:not([hidden])', grid).map((c) => c.dataset.id) : []);
function worksNav(id) {
  const ids = visibleWorks(), i = ids.indexOf(id);
  if (ids.length < 2 || i < 0) return '';
  return `<nav class="popup-works label" aria-label="Browse works">
      <button type="button" data-work="-1">← Previous work</button>
      <span class="popup-works-count">${i + 1} / ${ids.length}</span>
      <button type="button" data-work="1">Next work →</button>
    </nav>`;
}
function workStep(d, refocus) {
  const ids = visibleWorks(), i = ids.indexOf(current && current[1].id);
  if (ids.length < 2 || i < 0) return;
  const next = ids[(i + d + ids.length) % ids.length];
  const card = $(`.card[data-id="${next}"]`, grid);   // closing the popup lands on the work you ended on
  openPopup(next, card);
  if (refocus) { const b = $(`.popup-works [data-work="${d}"]`, popup); if (b) b.focus(); }
}

function step(d) {
  if (!current) return;
  const n = current[1].images;
  index = ((index - 1 + d + n) % n) + 1;
  renderPopup();
}

if (popup) {
  $('.popup-close', popup).addEventListener('click', () => popup.close());
  $('.popup-nav .prev', popup).addEventListener('click', () => step(-1));
  $('.popup-nav .next', popup).addEventListener('click', () => step(1));
  popup.addEventListener('click', (e) => { if (e.target === popup) popup.close(); });
  popup.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowUp') { e.preventDefault(); workStep(-1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); workStep(1); }
  });
  popup.addEventListener('click', (e) => {
    const b = e.target.closest('[data-work]');
    if (b) workStep(Number(b.dataset.work), true);
  });
  let x0 = null;
  const media = $('.popup-media', popup);
  media.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  media.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    x0 = null;
  });
  popup.addEventListener('close', () => {
    history.replaceState(null, '', location.pathname);
    if (returnFocus) returnFocus.focus();
  });
  // open directly from a link like artworks.html#retainer
  if (location.hash) openPopup(decodeURIComponent(location.hash.slice(1)));
}

/* ---------- Project viewer: runs Phil / shows the GLS PDF full-screen inside the site ---------- */
const viewer = $('#viewer');
if (viewer) {
  const frame = $('iframe', viewer);
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-viewer]');
    if (!link) return;
    // phones can't show PDFs inside a frame → open the file directly instead
    if (link.href.endsWith('.pdf') && window.matchMedia('(max-width: 760px)').matches) return;
    e.preventDefault();
    $('.viewer-title', viewer).textContent = link.dataset.viewer;
    $('.viewer-newtab', viewer).href = link.href;
    frame.src = link.href;
    frame.title = link.dataset.viewer;
    viewer.showModal();
  });
  $('.viewer-close', viewer).addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => { frame.src = 'about:blank'; });
}

/* ---------- Home: selected work carousel ---------- */
const track = $('.carousel-track');
if (track) {
  track.innerHTML = SELECTED.map((id, i) => {
    const [kind, w] = findWork(id);
    if (!w) return '';
    const page = kind === 'artworks' ? 'artworks.html' : 'media-design.html';
    return `<a class="sel-card" href="${page}#${w.id}">
      <div class="thumb${w.thumbs ? ' thumb--multi' : ''}">${
        Array.from({ length: w.thumbs || 1 }, (_, n) => `<img src="${imgSrc(kind, w, n + 1)}" alt="" loading="lazy">`).join('')}</div>
      <div class="bar"><span class="num">${pad(i + 1)}</span><span>${esc(w.title)}</span></div>
    </a>`;
  }).join('');

  const prev = $('.chev--prev'), next = $('.chev--next');
  const pageWidth = () => track.clientWidth + 30;
  prev.addEventListener('click', () => track.scrollBy({ left: -pageWidth() }));
  next.addEventListener('click', () => track.scrollBy({ left: pageWidth() }));
  const update = () => {
    prev.disabled = track.scrollLeft < 5;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
  };
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* ---------- Home: events ---------- */
const events = $('[data-events]');
if (events) {
  // status from the dates: NOW ON (running today) / UPCOMING / past events are hidden
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const day = (s) => new Date(`${s}T00:00:00`);
  const fmt = (s) => s.split('-').reverse().join('.');           // 2026-10-01 → 01.10.2026
  const dates = (e) => (e.end && e.end !== e.start
    ? `${fmt(e.start).slice(0, 2)}–${fmt(e.end)}`                    // 01–11.10.2026
    : fmt(e.start));
  const list = EVENTS
    .filter((e) => day(e.end || e.start) >= today)
    .map((e) => ({ ...e, now: day(e.start) <= today }))
    .sort((a, b) => b.now - a.now || day(a.start) - day(b.start));

  events.innerHTML = list.length
    ? list.map((e) => {
        const status = e.now
          ? '<span class="ev-status is-now"><span class="ev-dot" aria-hidden="true"></span>Now on</span>'
          : '<span class="ev-status">Upcoming</span>';
        const inner = `${status}<span class="ev-title">${esc(e.title)} <span class="ev-arrow" aria-hidden="true">↗</span></span>
          <span class="ev-meta">${esc(e.type)}, ${esc(e.place)} · ${dates(e)}</span>`;
        const href = e.href && e.href !== '#' ? e.href : INSTAGRAM;
        return `<li><a class="ev" href="${esc(href)}" target="_blank" rel="noopener"
          aria-label="${e.now ? 'Now on' : 'Upcoming'}: ${esc(e.title)}, ${esc(e.type)}, ${esc(e.place)}, ${dates(e)} (Instagram, opens in a new tab)">${inner}</a></li>`;
      }).join('')
    : `<li><span class="ev ev--empty">Dates to be announced</span></li>`;
  $$('[data-instagram]', events).forEach((a) => { a.href = INSTAGRAM; a.target = '_blank'; a.rel = 'noopener'; });
}

/* ---------- Info: desktop shows all columns, mobile uses accordions ---------- */
const details = $$('.profile-col details');
if (details.length) {
  const sync = () => details.forEach((d) => { d.open = window.innerWidth > 760; });
  sync();
  window.matchMedia('(max-width: 760px)').addEventListener('change', sync);
}

/* ---------- Contact form (demo: validates, shows confirmation, sends nothing) ---------- */
const form = $('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    // topic choice (radio buttons)
    const topicErr = $('#topic-err');
    if (topicErr) {
      const chosen = $('input[name="topic"]:checked', form);
      topicErr.textContent = chosen ? '' : 'Please choose what you are writing about.';
      if (!chosen) { $('input[name="topic"]', form).focus(); ok = false; }
    }
    $$('[required]', form).forEach((f) => {
      const err = $(`#${f.id}-err`);
      const bad = !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
      f.setAttribute('aria-invalid', bad);
      err.textContent = bad ? (f.type === 'email' && f.value.trim() ? 'Please enter a valid email.' : 'This field is required.') : '';
      if (bad && ok) { f.focus(); ok = false; }
    });
    if (!ok) return;
    const name = $('#name').value.trim().split(' ')[0];
    form.outerHTML = `<div class="form-done" role="status" tabindex="-1" id="form-done">
      <p class="label accent">Message sent</p>
      <p>Thank you, ${esc(name)}. I'll get back to you as soon as possible.</p></div>`;
    $('#form-done').focus();
  });
}
