/* ============================================================
   Рельеф — данные и логика страницы
   Каталог правится в массиве WORKS ниже: название, размеры,
   описание и порядок кадров. Цены намеренно не указаны.
   ============================================================ */

var CONTACT_MAIL = 'example@mail.ru';
var IMG = 'assets/img/';
var VID = 'assets/video/';
var AUTO_MS = 9000;          /* пауза автопоказа, миллисекунды */

/* Подстановка путей. В обычной сборке возвращает путь как есть;
   автономная версия preview.html подменяет их на встроенные данные. */
function A(p) { var m = window.ASSETS; return (m && m[p]) ? m[p] : p; }

var WORKS = [
  {
    id: 'meduza',
    title: 'Медуза',
    year: '2025',
    size: '50 × 70 см',
    shape: 'Прямоугольная, в чёрной раме',
    materials: 'Холст, структурная паста, акрил, матовый лак',
    relief: 'до 7 мм',
    about: 'Купол набран мелкой крупкой, щупальца — длинными вытянутыми жгутами. Фон затемнён к краям, поэтому на стене работа читается как подсвеченная изнутри.',
    photos: ['meduza-7', 'meduza-1', 'meduza-2', 'meduza-4', 'meduza-5', 'meduza-3', 'meduza-6'],
    scale:  ['meduza-8', 'meduza-9', 'meduza-10'],
    videos: [
      { src: 'meduza-2.mp4', poster: 'meduza-v2-poster' },
      { src: 'meduza-1.mp4', poster: 'meduza-v1-poster' },
      { src: 'meduza-3.mp4', poster: 'meduza-v3-poster' }
    ]
  },
  {
    id: 'lotos',
    title: 'Лотос',
    year: '2025',
    size: '60 × 60 см',
    shape: 'Квадратная, без рамы',
    materials: 'Холст, структурная паста, акрил, матовый лак',
    relief: 'до 6 мм',
    about: 'Лепестки уходят за край холста, поэтому цветок кажется больше своего формата. Тычинки собраны отдельными каплями пасты — их лучше рассматривать сбоку.',
    photos: ['lotos-1', 'lotos-2', 'lotos-3', 'lotos-4'],
    scale:  [],
    videos: [
      { src: 'lotos-1.mp4', poster: 'lotos-v1-poster' },
      { src: 'lotos-2.mp4', poster: 'lotos-v2-poster' }
    ]
  },
  {
    id: 'drevo',
    title: 'Древо жизни',
    year: '2025',
    size: 'Ø 60 см',
    shape: 'Круглая, без рамы',
    materials: 'Холст, структурная паста, акрил, поталь, матовый лак',
    relief: 'до 8 мм',
    about: 'Ствол закручен в спираль и делит круг на светлую и тёмную половины. Каждый лист прорезан по сырой пасте, поэтому одинаковых среди них нет.',
    photos: ['drevo-1', 'drevo-2', 'drevo-3', 'drevo-5', 'drevo-6', 'drevo-4'],
    scale:  ['drevo-7', 'drevo-8', 'drevo-9'],
    videos: [
      { src: 'drevo-1.mp4', poster: 'drevo-v1-poster' }
    ]
  },
  {
    id: 'voskhod',
    title: 'Восход',
    year: '2025',
    size: 'Ø 60 см',
    shape: 'Круглая, без рамы',
    materials: 'Холст, структурная паста, акрил, поталь, матовый лак',
    relief: 'до 6 мм',
    about: 'Солнечный диск покрыт поталью и остаётся единственным гладким местом на всей работе. Лучи расходятся резаными бороздами, вода набрана горизонтальными волнами.',
    photos: ['voskhod-2', 'voskhod-3'],
    scale:  ['voskhod-4', 'voskhod-5', 'voskhod-6'],
    videos: [
      { src: 'voskhod-1.mp4', poster: 'voskhod-v1-poster' }
    ]
  },
  {
    id: 'magnolia',
    title: 'Магнолия',
    year: '2025',
    size: 'Ø 60 см',
    shape: 'Круглая, без рамы',
    materials: 'Холст, структурная паста, акрил, матовый лак',
    relief: 'до 6 мм',
    about: 'Самая светлая работа серии: тёплый белый фон, приглушённая розовая лессировка на лепестках и оливковая зелень листьев. Хорошо живёт в комнате с рассеянным светом.',
    photos: ['magnolia-1', 'magnolia-2'],
    scale:  ['magnolia-3', 'magnolia-4'],
    videos: [
      { src: 'magnolia-1.mp4', poster: 'magnolia-v1-poster' }
    ]
  }
];

/* ---------- сборка списка кадров для просмотра -------------- */
function mediaOf(w) {
  var list = [];
  w.photos.forEach(function (n, i) {
    list.push({ type: 'image', full: A(IMG + n + '.webp'), thumb: A(IMG + n + '-t.webp'),
                alt: 'Картина «' + w.title + '», кадр ' + (i + 1) });
  });
  w.videos.forEach(function (v) {
    list.push({ type: 'video', src: A(VID + v.src), poster: A(IMG + v.poster + '.webp'),
                thumb: A(IMG + v.poster + '.webp'), alt: 'Видео работы «' + w.title + '»' });
  });
  w.scale.forEach(function (n) {
    list.push({ type: 'image', full: A(IMG + n + '.webp'), thumb: A(IMG + n + '-t.webp'),
                alt: 'Картина «' + w.title + '» в руках автора — для масштаба' });
  });
  return list;
}

var PLAY_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
var CAM_ICON  = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M3 7.5h4l1.4-2h7.2L17 7.5h4v11H3z" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="13" r="3.4" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>';

function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}
/* Телефону незачем тянуть кадр в 1500 px: рядом лежит версия на 700 px,
   и браузер сам берёт подходящую по ширине экрана. */
function srcsetOf(m) {
  if (window.ASSETS) return '';            /* в автономном preview.html не нужно */
  if (!m || m.type !== 'image' || !m.thumb || m.thumb === m.full) return '';
  return ' srcset="' + m.thumb + ' 700w, ' + m.full + ' 1500w"';
}

function askLink(w) {
  return 'mailto:' + CONTACT_MAIL +
    '?subject=' + encodeURIComponent('Вопрос по картине «' + w.title + '»') +
    '&body=' + encodeURIComponent('Здравствуйте! Интересует картина «' + w.title + '» (' + w.size + '). Подскажите, пожалуйста, стоимость и наличие.');
}

/* ---------- каталог ----------------------------------------- */
var worksEl = document.getElementById('works');

WORKS.forEach(function (w, i) {
  var media = mediaOf(w);
  var num = String(i + 1).padStart(2, '0');
  var total = String(WORKS.length).padStart(2, '0');

  var el = document.createElement('article');
  el.className = 'work';
  el.innerHTML =
    '<div class="work__media">' +
      '<button class="work__btn" type="button" data-open="' + w.id + '" ' +
        'aria-label="Рассмотреть картину «' + esc(w.title) + '» вблизи">' +
        '<img class="work__img" src="' + media[0].full + '"' + srcsetOf(media[0]) +
          ' sizes="(max-width:920px) 92vw, 56vw"' +
          ' alt="Картина «' + esc(w.title) + '»" loading="lazy" decoding="async">' +
        '<span class="work__count">' + CAM_ICON + media.length + ' кадров, ' + w.videos.length + ' видео</span>' +
      '</button>' +
    '</div>' +
    '<div class="work__body">' +
      '<p class="work__index">' + num + ' / ' + total + '</p>' +
      '<h3 class="work__title">' + esc(w.title) + '</h3>' +
      '<p class="work__about">' + esc(w.about) + '</p>' +
      '<dl class="work__specs">' +
        '<div><dt>Размер</dt><dd>' + esc(w.size) + '</dd></div>' +
        '<div><dt>Форма</dt><dd>' + esc(w.shape) + '</dd></div>' +
        '<div><dt>Материалы</dt><dd>' + esc(w.materials) + '</dd></div>' +
        '<div><dt>Высота рельефа</dt><dd>' + esc(w.relief) + '</dd></div>' +
      '</dl>' +
      '<p class="work__price"><b>Цена по запросу</b><span>работа в единственном экземпляре</span></p>' +
      '<div class="work__acts">' +
        '<button class="btn btn--ghost" type="button" data-open="' + w.id + '">Рассмотреть вблизи</button>' +
        '<a class="btn btn--gold" href="' + askLink(w) + '">Спросить цену</a>' +
      '</div>' +
    '</div>';
  worksEl.appendChild(el);
});

/* ---------- просмотр работы --------------------------------- */
var viewer     = document.getElementById('viewer');
var stageBox   = document.getElementById('stageBox');
var thumbsEl   = document.getElementById('thumbs');
var vTitle     = document.getElementById('viewerTitle');
var vAbout     = document.getElementById('viewerAbout');
var vSpecs     = document.getElementById('viewerSpecs');
var vMail      = document.getElementById('viewerMail');
var vOrder     = document.getElementById('viewerOrder');
var vClose     = document.getElementById('viewerClose');
var autoBtn    = document.getElementById('autoBtn');
var autoProg   = document.getElementById('autoProg');
var autoLabel  = document.getElementById('autoLabel');
var frameCount = document.getElementById('frameCount');

var RING = 2 * Math.PI * 13;
var lastFocus = null, currentWork = null, currentMedia = [], curIndex = 0;
var autoOn = true, rafId = null, startTs = 0;

autoProg.style.strokeDasharray = RING;
setRing(0);

function setRing(p) {
  autoProg.style.strokeDashoffset = RING * (1 - p);
}

function stopTimer() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null; startTs = 0;
}

function startTimer() {
  stopTimer();
  setRing(0);
  if (!autoOn || currentMedia.length < 2) return;
  var m = currentMedia[curIndex];
  /* на видеокадре ждём, пока ролик доиграет, а не отсчитываем секунды */
  if (m && m.type === 'video' && !window.NO_VIDEO) return;
  rafId = requestAnimationFrame(tick);
}

function tick(ts) {
  if (!startTs) startTs = ts;
  var p = Math.min((ts - startTs) / AUTO_MS, 1);
  setRing(p);
  if (p >= 1) { stopTimer(); step(1); return; }
  rafId = requestAnimationFrame(tick);
}

function step(dir) {
  if (!currentMedia.length) return;
  var n = curIndex + dir;
  if (n < 0) n = currentMedia.length - 1;
  if (n >= currentMedia.length) n = 0;
  showFrame(n);
}

function showFrame(i) {
  var m = currentMedia[i];
  if (!m) return;
  curIndex = i;
  stageBox.innerHTML = '';

  if (m.type === 'video' && window.NO_VIDEO) {
    var still = document.createElement('div');
    still.className = 'stage__still';
    still.innerHTML = '<img src="' + m.poster + '" alt="' + esc(m.alt) + '" decoding="async">' +
                      '<p>Видео работает в полной версии сайта — здесь показан кадр из него.</p>';
    stageBox.appendChild(still);
  } else if (m.type === 'video') {
    var v = document.createElement('video');
    v.src = m.src;
    v.poster = m.poster;
    v.controls = true;
    v.autoplay = true;
    v.muted = true;
    v.playsInline = true;
    v.preload = 'metadata';
    v.setAttribute('aria-label', m.alt);
    v.addEventListener('ended', function () { if (autoOn) step(1); });
    stageBox.appendChild(v);
    var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
  } else {
    var img = document.createElement('img');
    img.src = m.full;
    if (!window.ASSETS && m.thumb && m.thumb !== m.full) {
      img.srcset = m.thumb + ' 700w, ' + m.full + ' 1500w';
      img.sizes = '(max-width:920px) 96vw, 62vw';
    }
    img.alt = m.alt;
    img.decoding = 'async';
    stageBox.appendChild(img);
  }

  Array.prototype.forEach.call(thumbsEl.children, function (t, k) {
    t.setAttribute('aria-selected', k === i ? 'true' : 'false');
  });
  var active = thumbsEl.children[i];
  if (active && active.scrollIntoView) {
    active.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  frameCount.textContent = (i + 1) + ' / ' + currentMedia.length;
  startTimer();
}

function setAuto(on) {
  autoOn = on;
  autoBtn.setAttribute('aria-pressed', String(on));
  autoBtn.setAttribute('aria-label', on ? 'Выключить автопоказ' : 'Включить автопоказ');
  autoLabel.textContent = on ? 'Автопоказ — 9 с' : 'Автопоказ выключен';
  if (on) startTimer(); else { stopTimer(); setRing(0); }
}

autoBtn.addEventListener('click', function () { setAuto(!autoOn); });
document.getElementById('prevFrame').addEventListener('click', function () { step(-1); });
document.getElementById('nextFrame').addEventListener('click', function () { step(1); });

var savedScroll = 0;
function lockScroll() {
  savedScroll = window.scrollY || window.pageYOffset || 0;
  document.body.style.top = (-savedScroll) + 'px';
  document.body.classList.add('locked');
}
function unlockScroll() {
  document.body.classList.remove('locked');
  document.body.style.top = '';
  window.scrollTo(0, savedScroll);
}

function openWork(id) {
  var w = WORKS.filter(function (x) { return x.id === id; })[0];
  if (!w) return;
  currentWork = w;
  currentMedia = mediaOf(w);
  lastFocus = document.activeElement;

  vTitle.textContent = w.title;
  vAbout.textContent = w.about;
  vSpecs.innerHTML =
    '<div><dt>Размер</dt><dd>' + esc(w.size) + '</dd></div>' +
    '<div><dt>Форма</dt><dd>' + esc(w.shape) + '</dd></div>' +
    '<div><dt>Материалы</dt><dd>' + esc(w.materials) + '</dd></div>' +
    '<div><dt>Высота рельефа</dt><dd>' + esc(w.relief) + '</dd></div>' +
    '<div><dt>Год</dt><dd>' + esc(w.year) + '</dd></div>';
  vMail.href = askLink(w);

  thumbsEl.innerHTML = '';
  currentMedia.forEach(function (m, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'thumb';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', 'false');
    b.setAttribute('aria-label', m.type === 'video' ? 'Видео ' + (i + 1) : 'Фото ' + (i + 1));
    b.innerHTML = '<img src="' + m.thumb + '" alt="" loading="lazy" decoding="async">' +
      (m.type === 'video' ? '<span class="thumb__play">' + PLAY_ICON + '</span>' : '');
    b.addEventListener('click', function () { showFrame(i); });
    thumbsEl.appendChild(b);
  });

  lockScroll();
  viewer.hidden = false;
  thumbsEl.scrollLeft = 0;
  showFrame(0);
  vClose.focus();
}

function closeViewer() {
  if (viewer.hidden) return;
  stopTimer();
  var v = stageBox.querySelector('video');
  if (v) v.pause();
  viewer.hidden = true;
  unlockScroll();
  stageBox.innerHTML = '';
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

document.addEventListener('click', function (e) {
  if (!e.target || !e.target.closest) return;
  var opener = e.target.closest('[data-open]');
  if (opener) { openWork(opener.getAttribute('data-open')); return; }
  if (e.target.closest('[data-close]')) closeViewer();
});

vClose.addEventListener('click', closeViewer);

document.addEventListener('keydown', function (e) {
  if (viewer.hidden) return;
  if (e.key === 'Escape') { closeViewer(); return; }
  if (e.key === 'ArrowRight') { step(1); e.preventDefault(); return; }
  if (e.key === 'ArrowLeft')  { step(-1); e.preventDefault(); return; }
  if (e.key === 'Tab') {
    var f = viewer.querySelectorAll('button, a[href], video[controls]');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  }
});

vOrder.addEventListener('click', function () {
  var t = currentWork ? currentWork.title : '';
  closeViewer();
  var idea = document.getElementById('f-idea');
  if (t && idea && !idea.value) idea.value = 'Хочу работу в духе «' + t + '», но со своим сюжетом: ';
  document.getElementById('order').scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(function () { if (idea) idea.focus(); }, 500);
});

/* ---------- мобильное меню ---------------------------------- */
var topBar = document.querySelector('.top');
var burger = document.querySelector('.burger');
var mnav = document.getElementById('mobilenav');

burger.addEventListener('click', function () {
  var open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!open));
  burger.setAttribute('aria-label', open ? 'Открыть меню' : 'Закрыть меню');
  topBar.classList.toggle('is-open', !open);
  mnav.hidden = open;
});
mnav.addEventListener('click', function (e) {
  if (e.target.tagName !== 'A') return;
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Открыть меню');
  topBar.classList.remove('is-open');
  mnav.hidden = true;
});

/* ---------- чипы формы -------------------------------------- */
document.querySelectorAll('.chips').forEach(function (group) {
  var one = group.getAttribute('data-mode') === 'one';
  group.querySelectorAll('.chip').forEach(function (chip) {
    chip.setAttribute('aria-pressed', 'false');
    chip.addEventListener('click', function () {
      var on = chip.getAttribute('aria-pressed') === 'true';
      if (one) group.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      chip.setAttribute('aria-pressed', one ? 'true' : String(!on));
    });
  });
});

function picked(name) {
  var g = document.querySelector('.chips[data-group="' + name + '"]');
  return Array.prototype.filter.call(g.querySelectorAll('.chip'), function (c) {
    return c.getAttribute('aria-pressed') === 'true';
  }).map(function (c) { return c.getAttribute('data-value'); });
}

/* ---------- отправка заявки ---------------------------------- */
/* Здесь подключается настоящая отправка: Formspree, телеграм-бот
   или свой скрипт. Сейчас заявка только собирается в текст.      */
var errEl  = document.getElementById('formErr');
var doneEl = document.getElementById('formDone');
var prevEl = document.getElementById('formPreview');
var mailEl = document.getElementById('formMail');

document.getElementById('formSend').addEventListener('click', function () {
  var name    = document.getElementById('f-name').value.trim();
  var contact = document.getElementById('f-contact').value.trim();

  if (!name || !contact) {
    errEl.textContent = !name
      ? 'Напишите имя — иначе непонятно, к кому обращаться в ответе.'
      : 'Оставьте телефон, почту или ник: без них не получится ответить.';
    errEl.hidden = false;
    document.getElementById(!name ? 'f-name' : 'f-contact').focus();
    return;
  }
  errEl.hidden = true;

  var text = [
    'Заявка на картину под заказ',
    '',
    'Имя: ' + name,
    'Связь: ' + contact,
    'Форма: ' + (picked('shape')[0] || 'не выбрана'),
    'Палитра: ' + (picked('palette').join(', ') || 'на усмотрение автора'),
    'Размер: ' + (document.getElementById('f-size').value.trim() || 'не указан'),
    'Сроки: ' + (document.getElementById('f-date').value.trim() || 'не указаны'),
    '',
    'Сюжет и пожелания:',
    document.getElementById('f-idea').value.trim() || '—'
  ].join('\n');

  prevEl.textContent = text;
  mailEl.href = 'mailto:' + CONTACT_MAIL +
    '?subject=' + encodeURIComponent('Картина под заказ — ' + name) +
    '&body=' + encodeURIComponent(text);
  doneEl.hidden = false;
  doneEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

document.getElementById('formCopy').addEventListener('click', function () {
  var btn = this;
  var done = function () {
    btn.textContent = 'Текст скопирован';
    setTimeout(function () { btn.textContent = 'Скопировать текст'; }, 2200);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(prevEl.textContent).then(done, function () {
      btn.textContent = 'Не вышло — выделите текст вручную';
    });
  } else {
    var r = document.createRange();
    r.selectNodeContents(prevEl);
    var s = window.getSelection();
    s.removeAllRanges(); s.addRange(r);
    btn.textContent = 'Текст выделен — скопируйте его';
  }
});

document.getElementById('formBack').addEventListener('click', function () {
  doneEl.hidden = true;
  document.getElementById('f-name').focus();
});

/* ---------- мелочи: прогресс, появление, активный пункт ------ */
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

(function () {
  var bar = document.querySelector('.progress i');
  var ticking = false;
  function draw() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(draw); }
  }, { passive: true });
  draw();
})();

(function () {
  var items = document.querySelectorAll('.work__media');
  if (reduced.matches || !('IntersectionObserver' in window)) {
    items.forEach(function (n) { n.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
  items.forEach(function (n) { io.observe(n); });
})();

(function () {
  if (!('IntersectionObserver' in window)) return;
  var links = {};
  document.querySelectorAll('.nav a').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var a = links[en.target.id];
      if (a && en.isIntersecting) {
        Object.keys(links).forEach(function (k) { links[k].classList.remove('is-active'); });
        a.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(links).forEach(function (id) {
    var s = document.getElementById(id);
    if (s) io.observe(s);
  });
})();

/* ---------- листание пальцем по кадру ------------------------ */
(function () {
  var stage = document.getElementById('stage');
  if (!stage) return;
  var x0 = 0, y0 = 0, live = false;
  stage.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { live = false; return; }
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; live = true;
  }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (!live) return;
    live = false;
    var t = e.changedTouches[0];
    var dx = t.clientX - x0, dy = t.clientY - y0;
    /* по вертикали не реагируем: там прокрутка страницы */
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    step(dx < 0 ? 1 : -1);
  }, { passive: true });
})();

/* ---------- ролик на первом экране --------------------------- */
/* Телефону отдаём облегчённую версию: 0,8 МБ вместо 3,4 МБ.
   При экономии движения видео не запускается вовсе — остаётся кадр. */
(function () {
  var v = document.getElementById('heroVideo');
  if (!v) return;
  if (reduced.matches) return;

  if (navigator.connection && navigator.connection.saveData) return;
  var small = window.matchMedia('(max-width: 700px)').matches;

  v.src = A(small ? v.getAttribute('data-src-sm') : v.getAttribute('data-src'));
  v.load();
  var go = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
  if (v.readyState >= 2) go(); else v.addEventListener('loadeddata', go, { once: true });
})();
