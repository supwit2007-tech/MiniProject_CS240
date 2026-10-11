/* app.js
   ตัวหลักของเว็บไซต์: utilities + dialog + หน้าต่าง ๆ + ฟอร์มสมัครงาน + router
   ใช้ hash routing (#/learning) เพื่อให้เปิดไฟล์ตรง ๆ ได้โดยไม่ต้องมีเซิร์ฟเวอร์
   ต้องโหลดหลัง data.js (ใช้ jobs, courses, highlights, dimNames, findJob, findCourse) */
'use strict';

/* =========================
   Utilities
========================= */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// clone โครงหน้าจาก <template id="..."> ใน index.html
const template = id => document.getElementById(id).content.cloneNode(true);

// เติมข้อความลงช่องที่มี data-slot="ชื่อ"
function setText(root, values) {
  Object.entries(values).forEach(([slot, value]) => {
    const el = root.querySelector(`[data-slot="${slot}"]`);
    if (el) el.textContent = value;
  });
}

function fillList(ul, items) {
  ul.replaceChildren(...items.map(text => {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
  }));
}

function makeBadge(text, className) {
  const span = document.createElement('span');
  span.className = 'badge ' + className;
  span.textContent = text;
  return span;
}

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================
   Dialog (ใช้ <dialog> ตัวเดียวทั้งเว็บ)
========================= */
const dlg = $('#dlg');

// เปิด dialog ด้วย template ที่ระบุ แล้วคืนตัว body กลับไปให้เติมข้อมูลต่อ
function openDialog(templateId) {
  const body = $('#dlg-body');
  body.replaceChildren(template(templateId));
  if (!dlg.open) dlg.showModal();
  return body;
}

function closeDialog() {
  if (dlg.open) dlg.close();
}

// คลิกพื้นหลังเพื่อปิด
dlg.addEventListener('click', e => {
  if (e.target === dlg) closeDialog();
});

/* =========================
   State
========================= */
const app = $('#app');
const filters = { search: '', cat: 'All', level: 'All' };
const registered = new Set();   // หลักสูตรที่ลงทะเบียนแล้วในรอบนี้

const stack = [];               // ประวัติหน้าที่เปิดเอง ใช้ตัดสินใจว่า Back ทำอะไร
const scrollMemo = {};          // จำตำแหน่ง scroll ของแต่ละหน้า

/* =========================
   Cards
========================= */
function makeJobCard(job) {
  const card = template('tpl-job-card');
  setText(card, {
    mode: job.mode, level: job.level, title: job.title,
    company: job.company, salary: job.salary, short: job.short
  });
  const img = $('.js-img', card);
  img.src = job.image;
  img.alt = job.title;
  $('.js-detail', card).href = `#/job/${job.id}`;
  $('.js-apply', card).href = `#/apply?job=${job.id}`;
  return card;
}

function makeCourseCard(course) {
  const card = template('tpl-course-card');
  setText(card, {
    category: course.category, level: course.levelLabel, name: course.name,
    provider: course.provider, duration: course.duration, price: course.price
  });
  const img = $('.js-img', card);
  img.src = course.image;
  img.alt = course.name;
  $('.js-detail', card).href = `#/course/${course.id}`;
  $('.js-dims', card).append(...course.dims.map(d => makeBadge(dimNames[d], 'badge-dim')));
  $('.js-registered', card).hidden = !registered.has(course.id);
  return card;
}

function makeHighlightCard(item) {
  const card = template('tpl-highlight-card');
  $('.js-icon', card).textContent = item[0];
  setText(card, { title: item[1], text: item[2] });
  return card;
}

/* =========================
   Pages
   (แต่ละฟังก์ชันคืนชื่อ title ของหน้า หรือ null ถ้าไม่พบข้อมูล)
========================= */

/* ---------- Home ---------- */
function showHome() {
  app.replaceChildren(template('tpl-home'));
  $('#job-list').append(...jobs.map(makeJobCard));
  $('#home-courses').append(...courses.slice(0, 3).map(makeCourseCard));
  $('#home-highlights').append(...highlights.slice(1).map(makeHighlightCard));
  return 'Brainrot AI Lab';
}

/* ---------- Job detail ---------- */
function showJobDetail(id) {
  const job = findJob(id);
  if (!job) return null;

  app.replaceChildren(template('tpl-job-detail'));
  setText(app, {
    title: job.title, company: job.company, type: job.type, mode: job.mode,
    level: job.level, salary: job.salary, desc: job.desc
  });
  $('.js-img', app).src = job.image;
  $('.js-img', app).alt = job.title;
  fillList($('.js-duties', app), job.duties);
  fillList($('.js-quals', app), job.quals);
  fillList($('.js-benefits', app), job.benefits);
  $('.js-apply', app).href = `#/apply?job=${job.id}`;
  return job.title;
}

/* ---------- Learning (รายการหลักสูตร + ตัวกรอง) ---------- */
function filteredCourses() {
  const q = filters.search.trim().toLowerCase();
  return courses.filter(c => {
    const okCat   = filters.cat === 'All' || c.cat === filters.cat;
    const okLevel = filters.level === 'All' || c.levels.includes(filters.level);
    const text    = (c.name + ' ' + c.provider + ' ' + c.topics.join(' ')).toLowerCase();
    return okCat && okLevel && (!q || text.includes(q));
  });
}

function drawCourses() {
  const list = filteredCourses();
  $('#course-grid').replaceChildren(...list.map(makeCourseCard));
  $('#course-count').textContent = `Showing ${list.length} of ${courses.length} courses`;
  $('#course-empty').hidden = list.length > 0;
  $$('#cat-chips .chip').forEach(chip =>
    chip.setAttribute('aria-pressed', String(chip.dataset.cat === filters.cat))
  );
}

function showLearning() {
  app.replaceChildren(template('tpl-learning'));
  $('#course-search').value = filters.search;
  $('#level-filter').value = filters.level;
  drawCourses();

  $('#course-search').addEventListener('input', e => {
    filters.search = e.target.value;
    drawCourses();
  });
  $('#level-filter').addEventListener('change', e => {
    filters.level = e.target.value;
    drawCourses();
  });
  $('#cat-chips').addEventListener('click', e => {
    const chip = e.target.closest('[data-cat]');
    if (chip) {
      filters.cat = chip.dataset.cat;
      drawCourses();
    }
  });
  return 'AI Learning Hub';
}

/* ---------- Course detail + ลงทะเบียน ---------- */
function showCourseDetail(id) {
  const course = findCourse(id);
  if (!course) return null;

  app.replaceChildren(template('tpl-course-detail'));
  setText(app, {
    name: course.name, category: course.category, level: course.levelLabel, desc: course.desc,
    provider: course.provider, duration: course.duration,
    price: course.priceNote ? `${course.price} — ${course.priceNote}` : course.price,
    audience: course.audience, skills: course.skills, cert: course.cert
  });
  $('.js-img', app).src = course.image;
  $('.js-img', app).alt = course.name;
  fillList($('.js-topics', app), course.topics);
  $('.js-dims', app).append(...course.dims.map(d => makeBadge(dimNames[d], 'badge-dim')));

  const btn = $('.js-register', app);
  const refreshStatus = () => {
    const done = registered.has(course.id);
    setText(app, { status: done ? 'Registered' : 'Not registered yet' });
    btn.textContent = done ? 'Registered ✓' : 'Register Now';
    btn.disabled = done;
  };
  refreshStatus();

  btn.addEventListener('click', () => {
    if (registered.has(course.id)) return;
    const body = openDialog('tpl-confirm-reg');
    setText(body, { name: course.name, price: course.price, duration: course.duration });
    $('.js-confirm', body).addEventListener('click', () => {
      registered.add(course.id);
      refreshStatus();
      openDialog('tpl-reg-success');
    });
  });
  return course.name;
}

/* ---------- About ---------- */
function showAbout() {
  app.replaceChildren(template('tpl-about'));
  $('#about-highlights').append(...highlights.map(makeHighlightCard));
  return 'About';
}

/* ---------- Apply (ฟอร์มสมัครงาน) ---------- */
function showApply(jobId) {
  app.replaceChildren(template('tpl-apply'));
  setupApplyForm(jobId);
  return 'Job Application Form';
}

/* ---------- Not found ---------- */
function showNotFound() {
  app.replaceChildren(template('tpl-notfound'));
  return 'Page not found';
}

/* =========================
   Form validation
   ตรวจข้อมูลทุกช่อง และจัดการไฟล์ Resume
   ข้อมูลทั้งหมดเก็บใน memory ของหน้าเว็บเท่านั้น ไม่ใช้ localStorage
========================= */
let draft = {};          // ค่าที่กรอกค้างไว้ เผื่อกดกลับแล้วเข้ามาใหม่
let resumeFile = null;
let submitting = false;

// ชื่อ: ไทย/อังกฤษ เว้นวรรคได้ ห้ามตัวเลขและเครื่องหมายพิเศษ
const NAME_RE = /^[A-Za-z\u0E01-\u0E3A\u0E40-\u0E4E]+(?: [A-Za-z\u0E01-\u0E3A\u0E40-\u0E4E]+)*$/;
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@gmail\.com$/i;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function checkResume(file) {
  if (!file) return 'Please upload your resume.';
  const ext = file.name.split('.').pop().toLowerCase();
  if (!['pdf', 'doc', 'docx'].includes(ext)) return 'Resume must be a PDF, DOC or DOCX file.';
  if (file.size > MAX_FILE_SIZE) return 'Resume must be 5 MB or smaller.';
  return '';
}

function setupApplyForm(jobId) {
  const form = $('#apply-form');
  const get = name => (form.elements[name].value || '').trim();
  submitting = false;

  // เติมตัวเลือกตำแหน่ง และเลือกไว้ล่วงหน้าถ้ามาจากปุ่มของตำแหน่งงาน
  $('#position').append(...jobs.map(j => new Option(j.title, j.id)));
  if (findJob(jobId)) draft.position = String(jobId);

  // กติกาแต่ละช่อง คืนข้อความ error (ว่าง = ผ่าน)
  const rules = {
    firstName: () => NAME_RE.test(get('firstName')) ? '' : 'Please enter a valid first name.',
    lastName:  () => NAME_RE.test(get('lastName')) ? '' : 'Please enter a valid last name.',
    phone:     () => /^\d{10}$/.test(get('phone')) ? '' : 'Phone number must contain exactly 10 digits.',
    email:     () => EMAIL_RE.test(get('email')) ? '' : 'Please enter a valid Gmail address.',
    address:   () => get('address') ? '' : 'Please enter your address.',
    resume:    () => checkResume(resumeFile),
    gender:    () => get('gender') ? '' : 'Please select your gender.',
    level:     () => get('level') ? '' : 'Please select your AI competency level.',
    position:  () => get('position') ? '' : 'Please select a job position.',
    consent:   () => form.elements.consent.checked ? '' : 'You must consent before submitting.'
  };

  /* ---------- helpers ---------- */
  function showError(name, msg) {
    const box = $(`[data-field="${name}"]`);
    box.classList.toggle('has-error', !!msg);
    $('#err-' + name).textContent = msg;
    $$('input, select, textarea', box).forEach(el => {
      if (msg) el.setAttribute('aria-invalid', 'true');
      else el.removeAttribute('aria-invalid');
    });
  }

  function validate(name) {
    const msg = rules[name]();
    showError(name, msg);
    return msg;
  }

  function showFile() {
    $('#file-name').textContent = resumeFile ? resumeFile.name : 'PDF, DOC or DOCX, max 5 MB';
    $('#remove-file').classList.toggle('hidden', !resumeFile);
  }

  /* ---------- เติมค่าที่เคยกรอก ---------- */
  ['firstName', 'lastName', 'phone', 'email', 'address', 'position'].forEach(n => {
    if (draft[n]) form.elements[n].value = draft[n];
  });
  if (draft.gender) form.elements.gender.value = draft.gender;
  if (draft.level) form.elements.level.value = draft.level;
  if (draft.consent) form.elements.consent.checked = true;
  showFile();

  /* ---------- events: กรอก / เปลี่ยนค่า ---------- */
  form.addEventListener('input', e => {
    const field = e.target;
    if (field.type === 'file') return;

    if (field.name === 'phone') {
      const digits = field.value.replace(/\D/g, '').slice(0, 10);
      if (digits !== field.value) showError('phone', rules.phone());  // มีตัวอักษรหลุดเข้ามา
      field.value = digits;
    }
    draft[field.name] = field.type === 'checkbox' ? field.checked : field.value;

    // ช่องที่เคยแดงอยู่ ตรวจซ้ำทันทีที่แก้
    if ($(`[data-field="${field.name}"]`)?.classList.contains('has-error')) validate(field.name);
  });

  form.addEventListener('change', e => {
    const name = e.target.name;
    if (!rules[name] || name === 'resume') return;
    draft[name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    validate(name);
  });

  ['firstName', 'lastName', 'phone', 'email', 'address'].forEach(name => {
    form.elements[name].addEventListener('blur', () => validate(name));
  });

  /* ---------- events: ไฟล์ Resume ---------- */
  $('#upload-btn').addEventListener('click', () => $('#resume-input').click());

  $('#resume-input').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const msg = checkResume(file);
    resumeFile = msg ? null : file;     // ไฟล์ที่ไม่ผ่านจะไม่ถูกเก็บ
    showFile();
    showError('resume', msg);
    if (msg) e.target.value = '';
  });

  $('#remove-file').addEventListener('click', () => {
    resumeFile = null;
    $('#resume-input').value = '';
    showFile();
    showError('resume', rules.resume());
  });

  /* ---------- events: Privacy / Reset ---------- */
  $('#privacy-link').addEventListener('click', () => openDialog('tpl-privacy'));

  $('#reset-btn').addEventListener('click', () => {
    form.reset();
    draft = {};
    resumeFile = null;
    showFile();
    Object.keys(rules).forEach(name => showError(name, ''));
  });

  /* ---------- events: Submit ---------- */
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (submitting) return;   // กันกดซ้ำ

    const failed = Object.keys(rules).filter(name => validate(name));
    if (failed.length) {
      const box = $(`[data-field="${failed[0]}"]`);
      box.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'center' });
      $('input, select, textarea, button', box)?.focus({ preventScroll: true });
      return;
    }

    submitting = true;
    const btn = $('#submit-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="loading loading-spinner loading-sm"></span> Submitting...';

    setTimeout(() => {
      draft = {};
      resumeFile = null;
      form.reset();
      btn.textContent = 'Submitted';
      openDialog('tpl-app-success');
    }, 900);
  });
}

/* =========================
   Router
========================= */
const routes = [
  { re: /^\/$/,             nav: 'home',     show: showHome },
  { re: /^\/learning$/,     nav: 'learning', show: showLearning },
  { re: /^\/about$/,        nav: 'about',    show: showAbout },
  { re: /^\/job\/(\d+)$/,   nav: 'home',     show: showJobDetail },
  { re: /^\/course\/(\d+)$/, nav: 'learning', show: showCourseDetail },
  { re: /^\/apply$/,        nav: 'apply',    show: (_, params) => showApply(params.get('job')) }
];

function parseHash() {
  const raw = location.hash.slice(1) || '/';
  const [path, query = ''] = raw.split('?');
  return { path, params: new URLSearchParams(query) };
}

function render() {
  const { path, params } = parseHash();
  const route = routes.find(r => r.re.test(path));
  let nav = route ? route.nav : '';
  let title = route ? route.show(path.match(route.re)[1], params) : null;

  if (title === null) {          // ไม่พบหน้า หรือไม่พบข้อมูลตาม id
    title = showNotFound();
    nav = '';
  }
  document.title = title + ' | Brainrot AI Lab';

  $$('[data-nav]').forEach(link => {
    if (link.dataset.nav === nav) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function onRouteChange() {
  const current = location.hash || '#/';
  const previous = stack[stack.length - 1];
  if (previous !== undefined) scrollMemo[previous] = window.scrollY;

  // ถ้าหน้าใหม่ตรงกับหน้าก่อนหน้าในประวัติ แปลว่ากดย้อนกลับ
  let isBack = false;
  if (stack.length > 1 && stack[stack.length - 2] === current) {
    stack.pop();
    isBack = true;
  } else if (previous !== current) {
    stack.push(current);
  }

  render();
  window.scrollTo(0, isBack ? (scrollMemo[current] || 0) : 0);
  closeDialog();
  $('#mobile-menu').classList.add('hidden');
  $('#menu-btn').setAttribute('aria-expanded', 'false');
}

// ปุ่ม Back: มีประวัติในเว็บเราก็ย้อนตามประวัติ ไม่มีก็ไปหน้า fallback
function goBack(fallback) {
  if (stack.length > 1) history.back();
  else location.hash = '#' + fallback;
}

/* =========================
   Global events
========================= */
document.addEventListener('click', e => {
  const back = e.target.closest('[data-back]');
  if (back) return goBack(back.dataset.back);

  if (e.target.closest('[data-close]')) return closeDialog();

  const scroll = e.target.closest('[data-scroll]');
  if (scroll) {
    $('#' + scroll.dataset.scroll).scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' });
  }
});

$('#menu-btn').addEventListener('click', () => {
  const isOpen = $('#mobile-menu').classList.toggle('hidden') === false;
  $('#menu-btn').setAttribute('aria-expanded', String(isOpen));
});

$('#skip').addEventListener('click', e => {
  e.preventDefault();
  app.focus();
});

window.addEventListener('hashchange', onRouteChange);

/* =========================
   Initial state
========================= */
onRouteChange();
