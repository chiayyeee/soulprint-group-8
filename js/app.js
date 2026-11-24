/**
 * SOULPRINT — pages, quiz flow, and results.
 * Reuses js/data.js, js/quiz-engine.js, and js/storage.js.
 * Group A-8 | 11533175 陳菲菲 & 11533178 郭蓮嘉
 */

import { TEAM_INFO } from './data.js';
import { QuizEngine } from './quiz-engine.js';
import { StorageManager } from './storage.js';

const PROGRESS_KEY = 'soulprint_progress_v1';

const loadedQuestions = StorageManager.getQuestions();
const questions = Array.isArray(loadedQuestions) ? loadedQuestions : [];
const loadedArchetypes = StorageManager.getArchetypes();
const archetypes = loadedArchetypes && typeof loadedArchetypes === 'object' ? loadedArchetypes : {};
const engine = new QuizEngine(questions, archetypes);

const state = {
  view: 'home',
  detailId: '',
  questionIndex: 0,
  answers: [],
  memoryResult: null,
  saveWarning: false,
  error: ''
};

let lastPaint = '';
let lastAnnounce = '';

const STICKERS = {
  daydreamer: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <ellipse cx="60" cy="74" rx="34" ry="18" fill="#C7D2FE" stroke="#1c1730" stroke-width="3"/>
    <ellipse cx="40" cy="70" rx="18" ry="13" fill="#fff" stroke="#1c1730" stroke-width="3"/>
    <ellipse cx="78" cy="66" rx="20" ry="14" fill="#FEF08A" stroke="#1c1730" stroke-width="3"/>
    <path d="M88 28l2.2 6.2 6.3 2.1-6.3 2.2-2.2 6.2-2.1-6.2-6.3-2.2 6.3-2.1z" fill="#F97316" stroke="#1c1730" stroke-width="2"/>
    <circle cx="28" cy="36" r="3" fill="#2563EB"/>
  </svg>`,
  observer: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <path d="M18 62c14-22 28-32 42-32s28 10 42 32c-14 22-28 32-42 32S32 84 18 62z" fill="#ECFDF5" stroke="#1c1730" stroke-width="3"/>
    <circle cx="60" cy="62" r="16" fill="#A7F3D0" stroke="#1c1730" stroke-width="3"/>
    <circle cx="60" cy="62" r="7" fill="#1c1730"/>
    <circle cx="64" cy="58" r="2.5" fill="#fff"/>
    <path d="M26 34c8 8 14 8 22 0" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
  collector: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <rect x="24" y="36" width="72" height="50" rx="6" fill="#FFFBEB" stroke="#1c1730" stroke-width="3"/>
    <path d="M24 42l36 24 36-24" fill="none" stroke="#1c1730" stroke-width="3"/>
    <circle cx="86" cy="34" r="12" fill="#FB7185" stroke="#1c1730" stroke-width="3"/>
    <path d="M86 28v12M80 34h12" stroke="#1c1730" stroke-width="2"/>
  </svg>`,
  explorer: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="34" fill="#EFF6FF" stroke="#1c1730" stroke-width="3"/>
    <circle cx="60" cy="60" r="8" fill="#F97316" stroke="#1c1730" stroke-width="3"/>
    <path d="M60 22v14M60 84v14M22 60h14M84 60h14" stroke="#1D4ED8" stroke-width="3" stroke-linecap="round"/>
    <path d="M60 36l10 24-10-4-10 4z" fill="#1D4ED8" stroke="#1c1730" stroke-width="2"/>
  </svg>`,
  creator: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <path d="M30 78c8-28 18-40 34-40 8 0 12 6 12 14 0 16-10 20-18 24-8 4-6 16 4 18 14 2 28-8 32-8" fill="none" stroke="#1c1730" stroke-width="3" stroke-linecap="round"/>
    <circle cx="38" cy="42" r="10" fill="#FDE047" stroke="#1c1730" stroke-width="3"/>
    <circle cx="78" cy="36" r="8" fill="#FB923C" stroke="#1c1730" stroke-width="3"/>
    <circle cx="86" cy="70" r="9" fill="#F43F5E" stroke="#1c1730" stroke-width="3"/>
  </svg>`,
  dreamchaser: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <path d="M60 22l8 20 22 2-16 14 5 21-19-12-19 12 5-21-16-14 22-2z" fill="#FDE047" stroke="#1c1730" stroke-width="3"/>
    <path d="M30 88h60" stroke="#1E3A8A" stroke-width="3" stroke-linecap="round"/>
    <path d="M40 98h40" stroke="#F97316" stroke-width="3" stroke-linecap="round"/>
  </svg>`
};

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function safeColor(value, fallback) {
  return typeof value === 'string' && /^#[0-9A-Fa-f]{6}$/.test(value) ? value : fallback;
}

function archetypeEntries() {
  return Object.values(archetypes).filter((item) => item && item.id && item.name);
}

function art(id) {
  return STICKERS[id] || STICKERS.daydreamer;
}

function selectedId(questionId) {
  const found = state.answers.find((answer) => answer.questionId === questionId);
  return found ? found.optionId : '';
}

function firstUnansweredIndex() {
  const index = questions.findIndex((question) => !selectedId(question.id));
  if (index === -1) return Math.max(0, questions.length - 1);
  return index;
}

function sanitizeAnswers(list) {
  const byId = new Map();
  if (!Array.isArray(list)) return [];
  list.forEach((item) => {
    if (!item) return;
    const question = questions.find((entry) => entry.id === item.questionId);
    if (!question || !Array.isArray(question.options)) return;
    const option = question.options.find((entry) => entry.id === item.optionId);
    if (!option) return;
    byId.set(question.id, { questionId: question.id, optionId: option.id });
  });
  return questions.map((question) => byId.get(question.id)).filter(Boolean);
}

function persistProgress() {
  try {
    sessionStorage.setItem(PROGRESS_KEY, JSON.stringify({
      answers: state.answers,
      questionIndex: state.questionIndex
    }));
  } catch (error) {
    console.warn('Could not save quiz progress', error);
  }
}

function loadProgress() {
  try {
    const raw = sessionStorage.getItem(PROGRESS_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    state.answers = sanitizeAnswers(data.answers);
    const index = Number(data.questionIndex);
    if (Number.isInteger(index) && index >= 0 && index < questions.length) {
      state.questionIndex = Math.min(index, firstUnansweredIndex());
    }
  } catch (error) {
    console.warn('Could not restore quiz progress', error);
  }
}

function clearProgress() {
  state.answers = [];
  state.questionIndex = 0;
  try { sessionStorage.removeItem(PROGRESS_KEY); } catch { /* private mode */ }
}

function formatWhen(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('zh-TW', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function latestResult() {
  return state.memoryResult || StorageManager.getLatestResult();
}

function toHash(view, detailId) {
  if (view === 'quiz') return '#/quiz';
  if (view === 'result') return '#/result';
  if (view === 'explore') return '#/explore';
  if (view === 'detail') return `#/explore/${encodeURIComponent(detailId || '')}`;
  return '#/';
}

function applyStateFromHash() {
  const parts = (location.hash || '#/').replace(/^#\/?/, '').split('/').filter(Boolean);
  const head = parts[0] || 'home';
  if (head === 'quiz') state.view = 'quiz';
  else if (head === 'result') state.view = 'result';
  else if (head === 'explore' && parts[1]) {
    state.view = 'detail';
    state.detailId = decodeURIComponent(parts[1]);
  } else if (head === 'explore') state.view = 'explore';
  else state.view = 'home';
}

function navigate(view, detailId) {
  const hash = toHash(view, detailId);
  if ((location.hash || '#/') === hash) {
    applyStateFromHash();
    render();
    return;
  }
  location.hash = hash;
}

function startQuiz() {
  clearProgress();
  state.error = '';
  navigate('quiz');
}

function pick(optionId) {
  const question = questions[state.questionIndex];
  if (!question || !Array.isArray(question.options)) return;
  const option = question.options.find((entry) => entry.id === optionId);
  if (!option) return;
  state.answers = state.answers.filter((answer) => answer.questionId !== question.id);
  state.answers.push({ questionId: question.id, optionId: option.id });
  state.error = '';
  persistProgress();
  const safe = window.CSS && CSS.escape ? CSS.escape(option.id) : String(option.id).replace(/"/g, '');
  render({ focusSelector: `[data-option="${safe}"]` });
}

function goNext() {
  const question = questions[state.questionIndex];
  if (!question || !selectedId(question.id)) return;
  if (state.questionIndex >= questions.length - 1) {
    finish();
    return;
  }
  state.questionIndex += 1;
  persistProgress();
  render();
}

function goBack() {
  if (state.questionIndex === 0) return;
  state.questionIndex -= 1;
  persistProgress();
  render();
}

function jumpTo(index) {
  const nextIndex = Number(index);
  if (!Number.isInteger(nextIndex) || nextIndex < 0 || nextIndex > firstUnansweredIndex()) return;
  state.questionIndex = nextIndex;
  persistProgress();
  render();
}

function finish() {
  state.error = '';
  const answers = sanitizeAnswers(state.answers);
  if (!questions.length || !archetypeEntries().length) {
    state.error = 'Quiz content is missing, so a result cannot be scored.';
    render();
    return;
  }
  if (answers.length < questions.length) {
    state.error = 'Please answer every question before seeing your result. 請先回答每一題。';
    render();
    return;
  }
  try {
    const result = engine.calculateResult(answers);
    if (!result || !result.primaryArchetype) throw new Error('Empty result');
    state.memoryResult = result;
    state.saveWarning = !StorageManager.saveLatestResult(result);
    clearProgress();
    navigate('result');
  } catch (error) {
    console.error(error);
    state.error = 'We could not score this quiz. Please try again.';
    render();
  }
}

async function shareResult() {
  const result = latestResult();
  const status = document.querySelector('[data-share-status]');
  const archetype = result && result.primaryArchetype;
  if (!archetype) return;
  const text = `My SOULPRINT is ${archetype.name} (${archetype.subtitle}). ${archetype.tagline}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: 'SOULPRINT', text });
      if (status) status.textContent = 'Shared. 已分享';
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = 'Copied to clipboard. 已複製結果文字';
      return;
    }
    if (status) status.textContent = text;
  } catch (error) {
    if (error && error.name === 'AbortError') return;
    if (status) status.textContent = 'Could not share just now.';
  }
}

function bulletList(items) {
  const list = Array.isArray(items) ? items : [];
  if (!list.length) return '<p>Nothing listed yet.</p>';
  return `<ul>${list.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;
}

function palette(archetype) {
  const colors = Array.isArray(archetype.palette) ? archetype.palette : [];
  if (!colors.length) return '';
  return colors.map((color) => {
    const hex = safeColor(color.hex, '#ffffff');
    return `<li class="swatch"><span class="chip" style="background:${hex}"></span><span>${esc(color.name)}</span><code>${esc(hex)}</code></li>`;
  }).join('');
}

function compatibleLinks(archetype) {
  const ids = Array.isArray(archetype.compatibleWith) ? archetype.compatibleWith : [];
  return ids.filter((id) => archetypes[id]).map((id) => {
    const other = archetypes[id];
    return `<a class="pill" href="#/explore/${encodeURIComponent(other.id)}">${esc(other.name)}<small lang="zh-Hant">${esc(other.subtitle || '')}</small></a>`;
  }).join('');
}

function portraitBlocks(archetype) {
  const colors = palette(archetype);
  const friends = compatibleLinks(archetype);
  return `
    <section class="note-grid">
      <article class="note">
        <h2>Traits · 特質</h2>
        ${bulletList(archetype.characteristics)}
      </article>
      <article class="note note-butter">
        <h2>Strengths · 優勢</h2>
        ${bulletList(archetype.strengths)}
      </article>
      <article class="note note-pink">
        <h2>Quirks · 小癖好</h2>
        ${bulletList(archetype.quirks)}
      </article>
    </section>
    ${colors ? `<section class="palette-block"><h2>Color story · 色彩</h2><ul class="swatches">${colors}</ul></section>` : ''}
    ${friends ? `<section><h2>Kindred spirits · 相近原型</h2><div class="pill-row">${friends}</div></section>` : ''}
  `;
}

function identity(archetype, kicker) {
  const accent = safeColor(archetype.accentColor, '#2346d6');
  const tint = safeColor(archetype.bgTint, '#ffffff');
  return `<section class="sheet identity" style="--accent:${accent};--tint:${tint}">
    <span class="tape" aria-hidden="true"></span>
    <div class="identity-layout">
      <div class="sticker-art">${art(archetype.id)}</div>
      <div>
        <p class="kicker">${esc(kicker)}</p>
        <p class="badge" aria-hidden="true">${esc(archetype.badge || '')}</p>
        <h1>${esc(archetype.name)}</h1>
        <p class="sub" lang="zh-Hant">${esc(archetype.subtitle || '')}</p>
        <p class="tagline">${esc(archetype.tagline || '')}</p>
        <p class="headline">${esc(archetype.headline || '')}</p>
      </div>
    </div>
  </section>`;
}

function soulCard(archetype, index) {
  const accent = safeColor(archetype.accentColor, '#2346d6');
  const tint = safeColor(archetype.bgTint, '#ffffff');
  const number = String(index + 1).padStart(2, '0');
  return `<article class="soul-card" style="--accent:${accent};--tint:${tint}">
    <div class="sticker-art">${art(archetype.id)}</div>
    <p class="index-no">No. ${number}</p>
    <h3><a class="card-link" href="#/explore/${encodeURIComponent(archetype.id)}">${esc(archetype.name)}</a></h3>
    <p class="sub" lang="zh-Hant">${esc(archetype.subtitle || '')}</p>
    <p>${esc(archetype.headline || '')}</p>
  </article>`;
}

function marquee() {
  const items = archetypeEntries();
  if (!items.length) return '';
  const unit = items.map((item) => `<span class="mq-item">${esc(item.badge || '✦')} ${esc(item.name)} · ${esc(item.subtitle || '')}</span>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="marquee-track">${unit}${unit}</div></div>`;
}

function header() {
  const resultReady = Boolean(latestResult() && latestResult().primaryArchetype);
  const link = (href, view, en, zh) => {
    const on = view === 'explore'
      ? state.view === 'explore' || state.view === 'detail'
      : state.view === view;
    return `<a class="nav-link${on ? ' is-current' : ''}" href="${href}" ${on ? 'aria-current="page"' : ''}>${en}<small lang="zh-Hant">${zh}</small></a>`;
  };
  return `<header class="site-header">
    <div class="rainbow" aria-hidden="true"></div>
    <div class="wrap nav">
      <a class="logo" href="#/"><span class="logo-mark" aria-hidden="true">S</span><span>SOULPRINT</span></a>
      <nav class="nav-links" aria-label="Primary">
        ${link('#/', 'home', 'Home', '首頁')}
        ${link('#/quiz', 'quiz', 'Quiz', '測驗')}
        ${link('#/explore', 'explore', 'Archetypes', '原型')}
        ${resultReady ? link('#/result', 'result', 'Result', '結果') : ''}
      </nav>
    </div>
  </header>`;
}

function footer() {
  const members = Array.isArray(TEAM_INFO.members) ? TEAM_INFO.members : [];
  const cards = members.map((member) => `<li><strong>${esc(member.id)} ${esc(member.name)}</strong><span lang="en">${esc(member.englishName || '')}</span><span>${esc(member.role || '')}</span></li>`).join('');
  return `<footer class="site-footer">
    <div class="wrap">
      <p class="kicker">${esc(TEAM_INFO.group || 'Group A-8')}</p>
      <h2>Made as a scrapbook of small moments.</h2>
      <ul class="team">${cards}</ul>
      <p class="footer-meta">${esc(TEAM_INFO.institution || '')}</p>
      <p class="footer-meta">${esc(TEAM_INFO.department || '')}</p>
      <p class="footer-meta">${esc(TEAM_INFO.course || '')}</p>
      <p class="footer-meta">Presentation · ${esc(TEAM_INFO.presentationDate || '')}</p>
    </div>
  </footer>`;
}

function renderHome() {
  const cards = archetypeEntries().map(soulCard).join('');
  const saved = latestResult();
  const savedName = saved && saved.primaryArchetype ? saved.primaryArchetype.name : '';
  const continueLink = state.answers.length
    ? `<a class="continue" href="#/quiz">Continue question ${state.questionIndex + 1}<small lang="zh-Hant">繼續未完成的測驗</small></a>`
    : '';
  const again = savedName
    ? `<a class="continue" href="#/result">Last result: ${esc(savedName)}<small lang="zh-Hant">查看上次的性格原型</small></a>`
    : '';
  return `<main id="main" tabindex="-1" class="view-home">
    <section class="wrap hero">
      <div class="hero-grid">
        <div>
          <p class="eyebrow">${esc(TEAM_INFO.group || 'Group A-8')} · Personality zine · 性格小誌</p>
          <h1><span class="word-soul">SOUL</span><span class="word-print">PRINT</span></h1>
          <p class="tagline"><span class="marker">${esc(TEAM_INFO.tagline || '')}</span></p>
          <p class="zh" lang="zh-Hant">發現那些讓你成為你的微小事物。</p>
          <p class="lede">${esc(TEAM_INFO.description || '')}</p>
          <div class="cta-row">
            <button type="button" class="btn primary" data-action="start"><span>Begin the quiz</span><small lang="zh-Hant">開始測驗</small></button>
            <a class="btn ghost" href="#/explore"><span>Explore personalities</span><small lang="zh-Hant">探索六種原型</small></a>
          </div>
          ${continueLink}
          ${again}
          <p class="hint">No account. Your result stays in this browser. 結果只留在這台裝置上。</p>
        </div>
        <div class="collage" aria-hidden="true">
          <article class="polaroid tilt-left">
            <div class="sticker-art">${art('daydreamer')}</div>
            <strong>7 questions</strong>
            <span>七個生活瞬間</span>
          </article>
          <article class="polaroid tilt-right">
            <div class="sticker-art">${art('collector')}</div>
            <strong>6 soulprints</strong>
            <span>六種性格原型</span>
          </article>
          <p class="stamp">A-8</p>
        </div>
      </div>
    </section>
    ${marquee()}
    <section class="wrap band">
      <h2>How a soulprint is made · 怎麼玩</h2>
      <ol class="steps">
        <li><span class="step-no">01</span><h3>Answer seven scenes</h3><p lang="zh-Hant">從週末早晨、市集、雨天與旅行行囊裡，選出最像你的反應。</p></li>
        <li><span class="step-no">02</span><h3>Points find a pattern</h3><p lang="zh-Hant">每個選項會把分數加到它最接近的性格。最高分就是你的原型。</p></li>
        <li><span class="step-no">03</span><h3>Keep the page, or retake</h3><p lang="zh-Hant">看專屬結果、比較六種原型，或隨時再測一次。</p></li>
      </ol>
    </section>
    <section class="wrap band">
      <h2>Six ways of noticing · 六種原型</h2>
      <div class="explore-grid">${cards}</div>
    </section>
  </main>`;
}

function progressDots() {
  const maxJump = firstUnansweredIndex();
  return questions.map((question, index) => {
    const done = Boolean(selectedId(question.id));
    const current = index === state.questionIndex;
    const locked = index > maxJump;
    return `<button type="button" class="dot${done ? ' is-done' : ''}${current ? ' is-current' : ''}" data-action="jump" data-index="${index}" aria-label="Question ${index + 1}${done ? ', answered' : ''}" ${current ? 'aria-current="step"' : ''} ${locked ? 'disabled' : ''}></button>`;
  }).join('');
}

function renderQuiz() {
  if (!questions.length) {
    return `<main id="main" tabindex="-1" class="wrap view-quiz"><h1>Quiz questions are missing</h1><p>Check js/data.js, then refresh.</p></main>`;
  }
  const question = questions[state.questionIndex];
  const chosen = selectedId(question.id);
  const answered = sanitizeAnswers(state.answers).length;
  const percent = Math.round((answered / questions.length) * 100);
  const last = state.questionIndex === questions.length - 1;
  const options = (question.options || []).map((option) => {
    const selected = chosen === option.id;
    return `<button type="button" class="option${selected ? ' is-selected' : ''}" data-action="pick" data-option="${esc(option.id)}" aria-pressed="${selected ? 'true' : 'false'}">
      <span class="letter">${esc(option.id)}</span>
      <span class="opt-en" lang="en">${esc(option.text)}</span>
      <span class="opt-zh" lang="zh-Hant">${esc(option.textZh || '')}</span>
    </button>`;
  }).join('');
  return `<main id="main" tabindex="-1" class="wrap wrap-narrow view-quiz">
    <p class="kicker">Question ${state.questionIndex + 1} / ${questions.length} · <span lang="zh-Hant">${esc(question.categoryZh || '')}</span></p>
    <div class="progress">
      <div class="progress-top">
        <strong>${esc(question.category || '')}</strong>
        <span lang="zh-Hant">已回答 ${answered} / ${questions.length}</span>
      </div>
      <div class="track" role="progressbar" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${answered}" aria-label="Answered questions">
        <span style="width:${percent}%"></span>
      </div>
      <div class="dots" aria-label="Question progress">${progressDots()}</div>
    </div>
    <article class="sheet">
      <span class="tape" aria-hidden="true"></span>
      <p class="watermark" aria-hidden="true">${String(state.questionIndex + 1).padStart(2, '0')}</p>
      <h1 id="question-title" tabindex="-1" lang="en">${esc(question.title)}</h1>
      <p class="zh" lang="zh-Hant">${esc(question.titleZh || '')}</p>
      <p class="hint scribble">Pick the moment that feels most like you. 選最像你的一個。</p>
      <div class="options" role="group" aria-labelledby="question-title">${options}</div>
      <p class="hint keys">Keys 1–4 choose an answer. Arrow keys move between questions.</p>
      <div class="quiz-actions">
        <button type="button" class="btn ghost" data-action="back" ${state.questionIndex === 0 ? 'disabled' : ''}><span>Back</span><small lang="zh-Hant">上一題</small></button>
        <button type="button" class="btn primary" data-action="next" ${chosen ? '' : 'disabled'}><span>${last ? 'See my soulprint' : 'Next'}</span><small lang="zh-Hant">${last ? '查看我的結果' : '下一題'}</small></button>
      </div>
    </article>
  </main>`;
}

function scoreRows(result, primaryId) {
  const ranking = Array.isArray(result.ranking) ? result.ranking : [];
  const maxScore = Math.max(1, ...ranking.map((item) => Number(item && item.score) || 0));
  return ranking.map((item) => {
    if (!item || !item.archetype) return '';
    const score = Number(item.score) || 0;
    const width = score > 0 ? Math.max(8, Math.round((score / maxScore) * 100)) : 0;
    const color = safeColor(item.archetype.accentColor, '#2346d6');
    const top = item.id === primaryId;
    const percent = Number.isFinite(Number(item.percentage)) ? `${item.percentage}%` : '';
    return `<div class="score${top ? ' is-top' : ''}">
      <div><strong>${esc(item.archetype.name)}</strong><small lang="zh-Hant">${esc(item.archetype.subtitle || '')}</small></div>
      <div class="meter" role="meter" aria-valuemin="0" aria-valuemax="${maxScore}" aria-valuenow="${score}" aria-label="${esc(item.archetype.name)}">
        <span style="width:${width}%;background:${color}"></span>
      </div>
      <span class="pts">${score} pts${percent ? ` · ${percent}` : ''}</span>
    </div>`;
  }).join('');
}

function historyList() {
  let history = [];
  try { history = StorageManager.getHistory(); } catch { history = []; }
  if (!Array.isArray(history) || !history.length) return '';
  const items = history.slice(0, 5).map((item) => `<li><span>${esc(item.archetypeName || 'Result')}</span><time>${esc(formatWhen(item.timestamp))}</time></li>`).join('');
  return `<section class="history-block"><h2>Recent readings · 最近的結果</h2><ol class="history">${items}</ol></section>`;
}

function renderResult() {
  const result = latestResult();
  const archetype = result && result.primaryArchetype;
  if (!archetype) {
    return `<main id="main" tabindex="-1" class="wrap view-result">
      <h1>No soulprint yet</h1>
      <p>Take the seven-question quiz and your page will be kept in this browser. 先完成測驗，結果會留在這台裝置。</p>
      <button type="button" class="btn primary" data-action="start"><span>Begin the quiz</span><small lang="zh-Hant">開始測驗</small></button>
    </main>`;
  }
  const side = result.secondaryArchetype;
  const close = side && result.ranking && result.ranking[0] && result.ranking[1] && result.ranking[0].score === result.ranking[1].score;
  const warning = state.saveWarning ? '<p class="alert" role="status">This result is on screen, but the browser did not store it for next time.</p>' : '';
  return `<main id="main" tabindex="-1" class="wrap view-result">
    ${warning}
    ${identity(archetype, 'Your soulprint · 你的性格原型')}
    <p class="story">${esc(archetype.description || '')}</p>
    <p class="hint">Scored on this device from ${questions.length} answers${result.timestamp ? ` · ${esc(formatWhen(result.timestamp))}` : ''}.</p>
    <section class="sheet scores">
      <h2>Your mix · 分數組成</h2>
      ${scoreRows(result, archetype.id)}
    </section>
    ${side ? `<aside class="secondary"><p class="kicker">${close ? 'A perfect tie for second' : 'Closest companion'} · 另一面</p><a href="#/explore/${encodeURIComponent(side.id)}">${esc(side.name)}</a><p class="sub" lang="zh-Hant">${esc(side.subtitle || '')}</p><p>${esc(side.headline || '')}</p></aside>` : ''}
    ${portraitBlocks(archetype)}
    ${historyList()}
    <div class="cta-row">
      <button type="button" class="btn warm" data-action="retake"><span>Retake the quiz</span><small lang="zh-Hant">再測一次</small></button>
      <a class="btn ghost" href="#/explore"><span>Explore all six</span><small lang="zh-Hant">看看其他原型</small></a>
      <button type="button" class="btn butter" data-action="share"><span>Share this result</span><small lang="zh-Hant">分享或複製</small></button>
    </div>
    <p class="hint" data-share-status aria-live="polite"></p>
  </main>`;
}

function renderExplore() {
  const cards = archetypeEntries().map(soulCard).join('');
  return `<main id="main" tabindex="-1" class="view-explore">
    <section class="wrap">
      <p class="eyebrow">Field guide · 原型圖鑑</p>
      <h1>Six personalities, one scrapbook.</h1>
      <p class="tagline">Every result is a way of paying attention.</p>
      <p class="zh" lang="zh-Hant">六種原型沒有高低，只是你把注意力放在夢想、細節、回憶、遠方、創作，或是明天。</p>
      <div class="cta-row">
        <button type="button" class="btn primary" data-action="start"><span>Find mine</span><small lang="zh-Hant">開始測驗</small></button>
      </div>
    </section>
    ${marquee()}
    <section class="wrap band"><div class="explore-grid">${cards || '<p>No personalities found in js/data.js.</p>'}</div></section>
  </main>`;
}

function renderDetail() {
  const archetype = archetypes[state.detailId];
  if (!archetype) {
    return `<main id="main" tabindex="-1" class="wrap view-detail">
      <h1>That page wandered off</h1>
      <p>This personality is not in the current set. 找不到這個原型。</p>
      <a class="btn primary" href="#/explore"><span>Back to all six</span><small lang="zh-Hant">回到六種原型</small></a>
    </main>`;
  }
  const ids = archetypeEntries().map((item) => item.id);
  const index = Math.max(0, ids.indexOf(archetype.id));
  const previous = archetypes[ids[(index - 1 + ids.length) % ids.length]];
  const next = archetypes[ids[(index + 1) % ids.length]];
  return `<main id="main" tabindex="-1" class="wrap view-detail">
    ${identity(archetype, `Portrait ${String(index + 1).padStart(2, '0')} · 性格檔案`)}
    <p class="story">${esc(archetype.description || '')}</p>
    ${portraitBlocks(archetype)}
    <div class="cta-row">
      <a class="btn ghost" href="#/explore"><span>All six</span><small lang="zh-Hant">全部原型</small></a>
      ${previous ? `<a class="btn ghost" href="#/explore/${encodeURIComponent(previous.id)}"><span>Previous</span><small>${esc(previous.name)}</small></a>` : ''}
      ${next ? `<a class="btn primary" href="#/explore/${encodeURIComponent(next.id)}"><span>Next</span><small>${esc(next.name)}</small></a>` : ''}
    </div>
    <div class="cta-row">
      <button type="button" class="btn warm" data-action="start"><span>Take the quiz</span><small lang="zh-Hant">開始測驗</small></button>
    </div>
  </main>`;
}

function currentView() {
  if (state.view === 'quiz') return renderQuiz();
  if (state.view === 'result') return renderResult();
  if (state.view === 'explore') return renderExplore();
  if (state.view === 'detail') return renderDetail();
  return renderHome();
}

function withAlert(html) {
  if (!state.error) return html;
  return html.replace(/(<main[^>]*>)/, `$1<p class="alert" role="alert">${esc(state.error)}</p>`);
}

function updateTitle() {
  let page = 'Home';
  if (state.view === 'quiz') page = `Question ${Math.min(state.questionIndex + 1, questions.length || 1)}`;
  if (state.view === 'result') page = 'Your result';
  if (state.view === 'explore') page = 'Six personalities';
  if (state.view === 'detail') page = archetypes[state.detailId] ? archetypes[state.detailId].name : 'Personality';
  document.title = `${page} · SOULPRINT`;
}

function announce() {
  let message = 'SOULPRINT home';
  if (state.view === 'quiz' && questions[state.questionIndex]) {
    message = `Question ${state.questionIndex + 1} of ${questions.length}. ${questions[state.questionIndex].title}`;
  } else if (state.view === 'result') {
    const result = latestResult();
    message = result && result.primaryArchetype ? `Your soulprint is ${result.primaryArchetype.name}.` : 'No result yet.';
  } else if (state.view === 'explore') message = 'Six personalities';
  else if (state.view === 'detail' && archetypes[state.detailId]) message = archetypes[state.detailId].name;
  if (message === lastAnnounce) return;
  lastAnnounce = message;
  const live = document.getElementById('live');
  if (live) live.textContent = message;
}

function render(options = {}) {
  const app = document.getElementById('app');
  if (!app) return;
  const signature = `${state.view}:${state.detailId}:${state.questionIndex}`;
  const moved = signature !== lastPaint;
  lastPaint = signature;
  document.body.dataset.view = state.view;
  app.innerHTML = `${header()}${withAlert(currentView())}${footer()}`;
  updateTitle();
  announce();
  if (moved) window.scrollTo(0, 0);
  if (options.focusSelector) {
    const target = app.querySelector(options.focusSelector);
    if (target) target.focus();
  } else if (moved) {
    const heading = state.view === 'quiz' ? document.getElementById('question-title') : document.getElementById('main');
    if (heading) heading.focus();
  }
}

document.addEventListener('click', (event) => {
  const el = event.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  if (action === 'start' || action === 'retake') startQuiz();
  else if (action === 'pick') pick(el.dataset.option);
  else if (action === 'next') goNext();
  else if (action === 'back') goBack();
  else if (action === 'jump') jumpTo(el.dataset.index);
  else if (action === 'share') void shareResult();
});

document.addEventListener('keydown', (event) => {
  if (state.view !== 'quiz') return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  const question = questions[state.questionIndex];
  if (!question) return;
  if (event.key >= '1' && event.key <= '4') {
    const option = question.options && question.options[Number(event.key) - 1];
    if (!option) return;
    event.preventDefault();
    pick(option.id);
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    goNext();
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    goBack();
  }
});

function init() {
  loadProgress();
  if (!location.hash) history.replaceState(null, '', '#/');
  applyStateFromHash();
  render();
  window.addEventListener('hashchange', () => {
    applyStateFromHash();
    render();
  });
  console.info(`SOULPRINT ready · ${questions.length} questions · ${archetypeEntries().length} archetypes`);
}

init();
