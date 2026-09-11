/* Sixth Year — study planner, homework diary and reminders for Leaving Cert students.
   Plain JavaScript, no build step. All data lives in localStorage on the device. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * Constants
   * ------------------------------------------------------------------ */

  var STORAGE_KEY = 'sixth-year-v1';

  var LC_SUBJECTS = [
    'Irish', 'English', 'Mathematics', 'Biology', 'Chemistry', 'Physics',
    'Physics & Chemistry', 'Agricultural Science', 'Applied Maths', 'Geography',
    'History', 'Business', 'Accounting', 'Economics', 'French', 'German',
    'Spanish', 'Italian', 'Japanese', 'Polish', 'Home Economics', 'Art',
    'Music', 'Construction Studies', 'Engineering', 'Design & Communication Graphics',
    'Technology', 'Computer Science', 'Politics & Society', 'Religious Education',
    'Classical Studies', 'Latin', 'Link Modules (LCVP)', 'Physical Education'
  ];

  var COLORS = ['#57d9a3', '#5b9dff', '#f2b544', '#c88bff', '#ff8a65',
                '#4dd0e1', '#f06292', '#9ccc65', '#ffd54f', '#7986cb'];

  var POINTS = {
    H: { 1: 100, 2: 88, 3: 77, 4: 66, 5: 56, 6: 46, 7: 37, 8: 0 },
    O: { 1: 56, 2: 46, 3: 37, 4: 28, 5: 20, 6: 12, 7: 0, 8: 0 }
  };

  var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first, the way a school week reads

  /* The Leaving Cert starts on the Wednesday after the June bank holiday Monday.
     Worked out for the coming June so a new user sees a sensible countdown. */
  function defaultExamDate() {
    var now = new Date();
    var year = now.getFullYear();
    var d = examStart(year);
    if (d.getTime() < now.getTime() - 14 * 864e5) d = examStart(year + 1);
    return ymd(d);
  }
  function examStart(year) {
    var d = new Date(year, 5, 1);                       // 1 June
    while (d.getDay() !== 1) d.setDate(d.getDate() + 1); // first Monday
    d.setDate(d.getDate() + 2);                          // the Wednesday after
    d.setHours(9, 30, 0, 0);
    return d;
  }

  function defaults() {
    return {
      version: 1,
      profile: {
        name: '',
        examDate: defaultExamDate(),
        dailyGoal: 120,
        studyStart: '17:00',
        studyEnd: '21:30',
        focusMins: 25,
        breakMins: 5,
        theme: 'system',
        textSize: 'normal',
        readableFont: false
      },
      notify: {
        homework: true,
        daily: true,
        dailyTime: '16:30',
        blocks: true,
        weekly: true,
        timer: true,
        lead: [1440, 120]
      },
      subjects: [
        mkSubject('Irish', 'H', 0),
        mkSubject('English', 'H', 1),
        mkSubject('Mathematics', 'H', 2)
      ],
      homework: [],
      sessions: [],
      plan: [],
      timetable: { slots: defaultSlots(), classes: {} },
      results: [],
      courses: [],
      grades: {},
      timer: null,
      seeded: false
    };
  }

  /* A typical Irish school day: nine short periods with a break and lunch.
     Every one of these is editable — label, start, end and whether it is a break. */
  function defaultSlots() {
    function period(n, a, b) { return { id: uid(), label: 'Class ' + n, start: a, end: b, brk: false }; }
    function pause(name, a, b) { return { id: uid(), label: name, start: a, end: b, brk: true }; }
    return [
      period(1, '09:00', '09:40'), period(2, '09:40', '10:20'), period(3, '10:20', '11:00'),
      pause('Break', '11:00', '11:15'),
      period(4, '11:15', '11:55'), period(5, '11:55', '12:35'), period(6, '12:35', '13:15'),
      pause('Lunch', '13:15', '13:55'),
      period(7, '13:55', '14:35'), period(8, '14:35', '15:15'), period(9, '15:15', '15:55')
    ];
  }

  function mkSubject(name, level, i) {
    return { id: uid(), name: name, level: level || 'H', priority: 2, color: COLORS[i % COLORS.length] };
  }

  /* ------------------------------------------------------------------ *
   * Small helpers
   * ------------------------------------------------------------------ */

  function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function startOfDay(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function parseYmd(s) {
    var p = String(s || '').split('-');
    return new Date(+p[0], (+p[1] || 1) - 1, +p[2] || 1);
  }
  function atTime(day, hm) {
    var p = String(hm || '00:00').split(':');
    var d = startOfDay(day);
    d.setHours(+p[0] || 0, +p[1] || 0, 0, 0);
    return d;
  }
  function hm(mins) { return pad(Math.floor(mins / 60)) + ':' + pad(mins % 60); }
  function minsFrom(hmStr) { var p = String(hmStr).split(':'); return (+p[0]) * 60 + (+p[1] || 0); }
  function dur(mins) {
    mins = Math.round(mins);
    if (mins < 60) return mins + ' min';
    var h = Math.floor(mins / 60), m = mins % 60;
    return m ? h + 'h ' + m + 'm' : h + 'h';
  }
  function daysBetween(a, b) { return Math.round((startOfDay(b) - startOfDay(a)) / 864e5); }

  function fmtDue(iso) {
    var d = new Date(iso);
    var diff = daysBetween(new Date(), d);
    var time = pad(d.getHours()) + ':' + pad(d.getMinutes());
    if (diff === 0) return 'Today ' + time;
    if (diff === 1) return 'Tomorrow ' + time;
    if (diff === -1) return 'Yesterday ' + time;
    if (diff < 0) return Math.abs(diff) + ' days ago';
    if (diff < 7) return DAY_SHORT[d.getDay()] + ' ' + time;
    return DAY_SHORT[d.getDay()] + ' ' + d.getDate() + ' ' + d.toLocaleString('en-IE', { month: 'short' });
  }

  /* ------------------------------------------------------------------ *
   * State
   * ------------------------------------------------------------------ */

  var state = load();
  var ui = {
    view: 'today',
    showDone: false,
    planTab: 'timetable',
    pointsSource: 'target',
    ttDay: defaultTtDay()
  };

  /* Weekends land on Monday, since that is the next day with classes. */
  function defaultTtDay() {
    var d = new Date().getDay();
    return d >= 1 && d <= 5 ? d : 1;
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults();
      var s = JSON.parse(raw);
      var d = defaults();
      s.profile = Object.assign(d.profile, s.profile || {});
      s.notify = Object.assign(d.notify, s.notify || {});
      ['subjects', 'homework', 'sessions', 'plan', 'results', 'courses'].forEach(function (k) {
        if (!Array.isArray(s[k])) s[k] = d[k];
      });
      s.grades = s.grades || {};
      if (!s.timetable || !Array.isArray(s.timetable.slots)) s.timetable = d.timetable;
      if (!s.timetable.classes) s.timetable.classes = {};
      return s;
    } catch (e) {
      return defaults();
    }
  }

  var saveTimer = null;
  function save(skipReminders) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { toast('Could not save — storage is full'); }
    if (!skipReminders) {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(rebuildReminders, 400);
    }
  }

  function subject(id) {
    for (var i = 0; i < state.subjects.length; i++) if (state.subjects[i].id === id) return state.subjects[i];
    return null;
  }
  function subjectName(id) { var s = subject(id); return s ? s.name : 'General'; }
  function subjectColor(id) { var s = subject(id); return s ? s.color : '#93a1b3'; }

  /* ------------------------------------------------------------------ *
   * Derived data
   * ------------------------------------------------------------------ */

  function openHomework() {
    return state.homework.filter(function (h) { return !h.done; })
      .sort(function (a, b) { return new Date(a.due) - new Date(b.due); });
  }

  function minutesOn(dayDate) {
    var key = ymd(dayDate);
    return state.sessions.reduce(function (sum, s) {
      return sum + (ymd(new Date(s.at)) === key ? s.mins : 0);
    }, 0);
  }

  function minutesSince(days) {
    var cut = startOfDay(addDays(new Date(), -days + 1)).getTime();
    return state.sessions.filter(function (s) { return new Date(s.at).getTime() >= cut; });
  }

  function streak() {
    var n = 0, d = new Date();
    if (minutesOn(d) === 0) d = addDays(d, -1);          // today still has time left to count
    while (minutesOn(d) > 0 && n < 400) { n++; d = addDays(d, -1); }
    return n;
  }

  function lastStudied(subjectId) {
    var last = null;
    state.sessions.forEach(function (s) {
      if (s.subjectId !== subjectId) return;
      var t = new Date(s.at).getTime();
      if (last === null || t > last) last = t;
    });
    return last;
  }

  /* ------------------------------------------------------------------ *
   * Appearance
   * ------------------------------------------------------------------ */

  var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function effectiveDark() {
    var choice = state.profile.theme || 'system';
    return choice === 'dark' || (choice === 'system' && !!(darkQuery && darkQuery.matches));
  }

  /* The header button flips straight between light and dark; Setup keeps the
     third option of following the phone. */
  function toggleTheme() {
    state.profile.theme = effectiveDark() ? 'light' : 'dark';
    applyTheme();
    save(true);
    renderHeader();
    if (ui.view === 'setup') renderSetup();
    toast(state.profile.theme === 'dark' ? 'Dark mode' : 'Light mode');
  }

  function applyTheme() {
    var choice = state.profile.theme || 'system';
    if (choice === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', choice);

    var size = state.profile.textSize || 'normal';
    if (size === 'normal') document.documentElement.removeAttribute('data-text');
    else document.documentElement.setAttribute('data-text', size);

    if (state.profile.readableFont) document.documentElement.setAttribute('data-font', 'readable');
    else document.documentElement.removeAttribute('data-font');
    var meta = document.getElementById('themeColor');
    if (meta) {
      meta.setAttribute('content', effectiveDark() ? '#0f1216' : '#f4f6f8');
    }
  }

  /* ------------------------------------------------------------------ *
   * Timetable
   * ------------------------------------------------------------------ */

  var SCHOOL_DAYS = [1, 2, 3, 4, 5];

  function slotList() {
    return state.timetable.slots.slice().sort(function (a, b) {
      return minsFrom(a.start) - minsFrom(b.start);
    });
  }
  function slotById(id) {
    for (var i = 0; i < state.timetable.slots.length; i++) {
      if (state.timetable.slots[i].id === id) return state.timetable.slots[i];
    }
    return null;
  }
  function classKey(day, slotId) { return day + ':' + slotId; }
  function classAt(day, slotId) { return state.timetable.classes[classKey(day, slotId)] || null; }
  function classLabel(c) { return c.subjectId ? subjectName(c.subjectId) : (c.name || 'Class'); }
  function classColour(c) { return c.subjectId ? subjectColor(c.subjectId) : '#8a95a3'; }
  /* "12" reads as Room 12; "Lab 2" or "Gym" already says what it is. */
  function roomLabel(r) { return /^\d/.test(String(r).trim()) ? 'Room ' + r : r; }
  function classCount(day) {
    return slotList().filter(function (sl) { return !sl.brk && classAt(day, sl.id); }).length;
  }
  function hasClasses() {
    for (var k in state.timetable.classes) {
      if (Object.prototype.hasOwnProperty.call(state.timetable.classes, k)) return true;
    }
    return false;
  }
  function nowMins(d) { d = d || new Date(); return d.getHours() * 60 + d.getMinutes(); }

  /* What is on right now, and what is on after it — rolling into next week if need be. */
  function nowNext(ref) {
    ref = ref || new Date();
    var mins = nowMins(ref);
    var today = ref.getDay();
    var list = slotList();
    var current = null, next = null;

    if (SCHOOL_DAYS.indexOf(today) !== -1) {
      list.forEach(function (sl) {
        var c = classAt(today, sl.id);
        if (!c || sl.brk) return;
        var from = minsFrom(sl.start), to = minsFrom(sl.end);
        if (!current && mins >= from && mins < to) {
          current = { cls: c, slot: sl, day: today, pct: (mins - from) / Math.max(1, to - from) };
        }
        if (!next && from > mins) next = { cls: c, slot: sl, day: today, offset: 0 };
      });
    }
    for (var i = 1; i <= 7 && !next; i++) {
      var d = (today + i) % 7;
      if (SCHOOL_DAYS.indexOf(d) === -1) continue;
      for (var j = 0; j < list.length; j++) {
        var c2 = classAt(d, list[j].id);
        if (c2 && !list[j].brk) { next = { cls: c2, slot: list[j], day: d, offset: i }; break; }
      }
    }
    return { current: current, next: next };
  }

  /* The next time this subject appears on the timetable, searched a fortnight out. */
  function nextClassFor(subjectId, from) {
    from = from || new Date();
    var list = slotList();
    for (var i = 0; i < 14; i++) {
      var day = addDays(from, i);
      var wd = day.getDay();
      if (SCHOOL_DAYS.indexOf(wd) === -1) continue;
      for (var j = 0; j < list.length; j++) {
        var c = classAt(wd, list[j].id);
        if (!c || list[j].brk || c.subjectId !== subjectId) continue;
        var when = atTime(day, list[j].start);
        if (when.getTime() > from.getTime()) return { at: when, slot: list[j] };
      }
    }
    return null;
  }

  function classDetail(entry, withEnd) {
    var parts = [];
    if (entry.cls.room) parts.push(roomLabel(entry.cls.room));
    if (entry.cls.teacher) parts.push(entry.cls.teacher);
    if (withEnd) parts.push('until ' + entry.slot.end);
    else parts.push(entry.slot.label);
    return parts.join(' · ');
  }

  function renderNowBar() {
    var bar = $('#nowBar');
    if (!bar) return;
    if (!hasClasses()) { bar.hidden = true; return; }

    var nn = nowNext();
    var html;
    if (nn.current) {
      var left = minsFrom(nn.current.slot.end) - nowMins();
      bar.className = 'nowbar';
      html = '<span class="lead">Now</span>' +
        '<span class="info"><span class="nm">' + esc(classLabel(nn.current.cls)) + '</span>' +
        '<span class="sub2">' + esc(classDetail(nn.current, true)) + '</span></span>' +
        '<span class="til">' + left + ' min</span>' +
        '<i class="fill" style="width:' + Math.round(nn.current.pct * 100) + '%"></i>';
    } else if (nn.next) {
      var when = nn.next.offset === 0
        ? 'at ' + nn.next.slot.start
        : (nn.next.offset === 1 ? 'tomorrow' : DAY_SHORT[nn.next.day]) + ' ' + nn.next.slot.start;
      bar.className = 'nowbar upcoming';
      html = '<span class="lead">Next</span>' +
        '<span class="info"><span class="nm">' + esc(classLabel(nn.next.cls)) + '</span>' +
        '<span class="sub2">' + esc(classDetail(nn.next, false)) + '</span></span>' +
        '<span class="til">' + esc(when) + '</span>';
    } else {
      bar.hidden = true;
      return;
    }
    bar.innerHTML = html;
    bar.hidden = false;
  }

  function ttRow(day, sl, interactive) {
    var c = classAt(day, sl.id);
    var live = new Date().getDay() === day && nowMins() >= minsFrom(sl.start) && nowMins() < minsFrom(sl.end);
    var editable = interactive && !sl.brk;
    var tag = editable ? 'button' : 'div';
    var attrs = editable ? ' data-action="edit-class" data-day="' + day + '" data-slot="' + sl.id + '"' : '';
    var body;
    if (sl.brk) {
      body = '<span class="t">' + esc(sl.label) + '</span>';
    } else if (!c) {
      body = '<span class="t free">' + (interactive ? 'Free — tap to add' : 'Free') + '</span>';
    } else {
      body = '<span class="t"><i class="swatch" style="background:' + classColour(c) + '"></i>' + esc(classLabel(c)) + '</span>' +
        ((c.room || c.teacher)
          ? '<span class="meta">' +
              (c.room ? '<span class="pill">' + esc(roomLabel(c.room)) + '</span>' : '') +
              (c.teacher ? '<span class="pill">' + esc(c.teacher) + '</span>' : '') +
            '</span>'
          : '');
    }
    return '<' + tag + ' class="tt-row' + (sl.brk ? ' brk' : '') + (live ? ' live' : '') + '"' + attrs + '>' +
      '<span class="tt-time"><b>' + esc(sl.start) + '</b>' + esc(sl.end) + '</span>' +
      '<span class="tt-body">' + body + '</span>' +
      (editable ? '<span class="chev">›</span>' : '') +
      '</' + tag + '>';
  }

  function renderTimetable() {
    var day = ui.ttDay;
    $('#ttDays').innerHTML = SCHOOL_DAYS.map(function (d) {
      var n = classCount(d);
      return '<button class="chip-btn' + (d === day ? ' active' : '') + '" data-action="tt-day" data-day="' + d + '">' +
        DAY_SHORT[d] + '<span class="n">' + (n ? n + (n === 1 ? ' class' : ' classes') : 'empty') + '</span></button>';
    }).join('');

    var list = slotList();
    $('#ttList').innerHTML = list.length
      ? '<div class="card flush">' + list.map(function (sl) { return ttRow(day, sl, true); }).join('') + '</div>'
      : '<div class="card"><div class="empty">No time slots yet — add your school periods below.</div></div>';
  }

  function renderTodayClasses() {
    var card = $('#cardTodayClasses');
    if (!card) return;
    var day = new Date().getDay();
    var rows = slotList().filter(function (sl) { return !sl.brk && classAt(day, sl.id); });
    if (!rows.length) { card.hidden = true; return; }
    card.hidden = false;
    $('#todayClasses').innerHTML = rows.map(function (sl) { return ttRow(day, sl, false); }).join('');
  }

  /* ------------------------------------------------------------------ *
   * Routing
   * ------------------------------------------------------------------ */

  var TITLES = {
    today: 'Today', homework: 'Homework', plan: 'Study plan',
    study: 'Study', stats: 'Progress', setup: 'Setup'
  };

  function go(view) {
    if (!TITLES[view]) view = 'today';
    if (view !== 'study' && document.body.classList.contains('focus-on')) focusMode(false);
    ui.view = view;
    $$('.view').forEach(function (v) { v.classList.toggle('active', v.id === 'view-' + view); });
    $$('#tabs button').forEach(function (b) { b.classList.toggle('active', b.dataset.view === view); });
    $('#hdrTitle').textContent = TITLES[view];
    if (history.replaceState) history.replaceState(null, '', '#' + view);
    render();
    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------------ *
   * Rendering
   * ------------------------------------------------------------------ */

  function render() {
    renderHeader();
    renderNowBar();
    if (ui.view === 'today') { renderToday(); renderTodayClasses(); }
    if (ui.view === 'homework') renderHomework();
    if (ui.view === 'plan') renderPlan();
    if (ui.view === 'study') renderStudy();
    if (ui.view === 'stats') renderStats();
    if (ui.view === 'setup') renderSetup();
  }

  function renderHeader() {
    var now = new Date();
    var name = state.profile.name ? ', ' + state.profile.name.split(' ')[0] : '';
    var st = streak();
    $('#hdrSub').textContent = now.toLocaleDateString('en-IE', { weekday: 'long', day: 'numeric', month: 'long' }) +
      (st ? ' · ' + st + ' day streak' : name);
    var themeBtn = $('#btnTheme');
    if (themeBtn) {
      var isDark = effectiveDark();
      themeBtn.classList.toggle('is-dark', isDark);
      themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeBtn.title = themeBtn.getAttribute('aria-label');
    }

    var perm = ('Notification' in window) ? Notification.permission : 'unsupported';
    var bell = $('#btnBell');
    var label = perm === 'granted' ? 'Reminders are on' : 'Turn on reminders';
    bell.classList.toggle('on', perm === 'granted');
    bell.classList.toggle('alert', perm !== 'granted');
    bell.setAttribute('aria-label', label);
    bell.title = label;
  }

  function renderToday() {
    /* Countdown */
    var exam = atTime(parseYmd(state.profile.examDate), '09:30');
    var days = Math.max(0, Math.ceil((exam - new Date()) / 864e5));
    $('#examDays').textContent = days;
    $('#examUnit').textContent = days === 1 ? 'day to go' : 'days to go';
    $('#examDateLabel').textContent = parseYmd(state.profile.examDate)
      .toLocaleDateString('en-IE', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
    var weeks = Math.floor(days / 7);
    var odd = days - weeks * 7;
    $('#examBreakdown').textContent = days > 0
      ? weeks + (weeks === 1 ? ' week' : ' weeks') + ' and ' + odd + (odd === 1 ? ' day' : ' days') +
        ' · about ' + Math.max(0, countSchoolDays(new Date(), exam)) + ' school days'
      : 'Best of luck.';

    /* Progress through sixth year: 1 September to the first exam */
    var yearStart = new Date(exam.getFullYear() - 1, 8, 1);
    var pct = Math.min(100, Math.max(0, ((new Date() - yearStart) / (exam - yearStart)) * 100));
    $('#yearBar').style.width = pct.toFixed(1) + '%';
    $('#yearLabel').textContent = Math.round(pct) + '% of sixth year gone';

    /* Daily goal */
    var doneMins = minutesOn(new Date());
    var goal = state.profile.dailyGoal || 0;
    $('#goalBar').style.width = (goal ? Math.min(100, (doneMins / goal) * 100) : 0) + '%';
    $('#goalLabel').textContent = dur(doneMins) + (goal ? ' of ' + dur(goal) : '');

    /* Due soon: everything open in the next 7 days, plus anything overdue */
    var cut = addDays(startOfDay(new Date()), 8).getTime();
    var soon = openHomework().filter(function (h) { return new Date(h.due).getTime() < cut; });
    $('#todayDue').innerHTML = soon.length
      ? soon.slice(0, 8).map(hwRow).join('')
      : '<div class="empty">Nothing due in the next week. Add homework from the Homework tab.</div>';

    /* Planned blocks for today */
    var today = new Date().getDay();
    var blocks = state.plan.filter(function (b) { return b.day === today; })
      .sort(function (a, b) { return minsFrom(a.start) - minsFrom(b.start); });
    $('#todayPlan').innerHTML = blocks.length
      ? blocks.map(blockRow).join('')
      : '<div class="empty">No blocks planned for today. Try Auto-fill week on the Plan tab.</div>';

    /* Subjects going stale */
    var stale = state.subjects.map(function (s) {
      var last = lastStudied(s.id);
      return { s: s, days: last === null ? 999 : daysBetween(new Date(last), new Date()) };
    }).filter(function (x) { return x.days >= 5; })
      .sort(function (a, b) { return b.days - a.days; }).slice(0, 4);
    $('#neglected').innerHTML = stale.length
      ? stale.map(function (x) {
          return '<div class="item"><div class="body" style="cursor:default"><span class="t">' + esc(x.s.name) + '</span>' +
            '<span class="meta">' + (x.days === 999 ? 'Not studied yet' : 'Last studied ' + x.days + ' days ago') + '</span></div>' +
            '<button class="btn small subtle" data-action="quick-study" data-id="' + x.s.id + '">Study</button></div>';
        }).join('')
      : '<div class="empty">Every subject has had a look-in recently. Nice work.</div>';

    renderSetupBanner();
  }

  function countSchoolDays(from, to) {
    var n = 0, d = startOfDay(from);
    while (d < to) {
      var wd = d.getDay();
      if (wd >= 1 && wd <= 5) n++;
      d = addDays(d, 1);
    }
    return n;
  }

  function renderSetupBanner() {
    var el = $('#setupBanner');
    if (state.subjects.length > 3 || state.seeded) { el.innerHTML = ''; return; }
    el.innerHTML = '<div class="banner"><span>Add the subjects you are sitting so your plan and stats make sense.</span>' +
      '<button class="btn small primary" data-action="seed-subjects">Add</button></div>';
  }

  function hwRow(h) {
    var d = new Date(h.due);
    var late = !h.done && d < new Date();
    var soon = !h.done && !late && d - new Date() < 36 * 3600e3;
    var cls = late ? 'late' : (soon ? 'soon' : '');
    return '<div class="item ' + (h.done ? 'done' : '') + '">' +
      '<button class="tick ' + (h.done ? 'on' : '') + '" data-action="toggle-hw" data-id="' + h.id + '" aria-label="Mark done"></button>' +
      '<button class="body" data-action="edit-hw" data-id="' + h.id + '">' +
        '<span class="t">' + esc(h.title) + '</span>' +
        '<span class="meta">' +
          '<span class="pill"><i class="dot" style="background:' + subjectColor(h.subjectId) + '"></i>' + esc(subjectName(h.subjectId)) + '</span>' +
          '<span class="pill ' + cls + '">' + (late ? 'Overdue · ' : '') + esc(fmtDue(h.due)) + '</span>' +
          (h.estMins ? '<span class="pill">' + dur(h.estMins) + '</span>' : '') +
        '</span>' +
        (h.notes ? '<span class="note">' + esc(h.notes) + '</span>' : '') +
      '</button>' +
      '</div>';
  }

  function blockRow(b) {
    return '<div class="block">' +
      '<span class="chip" style="background:' + subjectColor(b.subjectId) + '"></span>' +
      '<span class="time">' + esc(b.start) + '</span>' +
      '<span class="nm">' + esc(subjectName(b.subjectId)) + (b.topic ? ' <span class="muted small">· ' + esc(b.topic) + '</span>' : '') + '</span>' +
      '<span class="len">' + dur(b.mins) + '</span>' +
      '<button class="icon-btn" data-action="del-block" data-id="' + b.id + '" aria-label="Remove">&times;</button>' +
      '</div>';
  }

  /* ---------------- Homework ---------------- */

  function renderHomework() {
    var now = new Date();
    var open = openHomework();
    var groups = [
      { name: 'Overdue', items: [] },
      { name: 'Today', items: [] },
      { name: 'Tomorrow', items: [] },
      { name: 'This week', items: [] },
      { name: 'Later', items: [] }
    ];
    open.forEach(function (h) {
      var d = new Date(h.due), diff = daysBetween(now, d);
      if (d < now) groups[0].items.push(h);
      else if (diff === 0) groups[1].items.push(h);
      else if (diff === 1) groups[2].items.push(h);
      else if (diff <= 7) groups[3].items.push(h);
      else groups[4].items.push(h);
    });

    var html = groups.filter(function (g) { return g.items.length; }).map(function (g) {
      var mins = g.items.reduce(function (a, h) { return a + (h.estMins || 0); }, 0);
      return '<section class="group"><div class="section-title">' + g.name + ' · ' + g.items.length +
        (mins ? ' · ' + dur(mins) : '') + '</div><div class="card">' + g.items.map(hwRow).join('') + '</div></section>';
    }).join('');

    if (!open.length) {
      html = '<section class="group"><div class="card"><div class="empty">No homework outstanding. Either you are on top of it, or it is time to add some.</div></div></section>';
    }

    var done = state.homework.filter(function (h) { return h.done; })
      .sort(function (a, b) { return new Date(b.doneAt || b.due) - new Date(a.doneAt || a.due); });
    $('#btnToggleDone').textContent = ui.showDone ? 'Hide' : 'Done ' + done.length;
    if (ui.showDone && done.length) {
      html += '<section class="group"><div class="section-title">Done</div><div class="card">' +
        done.slice(0, 40).map(hwRow).join('') + '</div></section>';
    }
    $('#hwList').innerHTML = html;
  }

  /* ---------------- Plan ---------------- */

  function renderPlan() {
    $$('#planSeg button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.plantab === ui.planTab);
    });
    $('#planTimetable').hidden = ui.planTab !== 'timetable';
    $('#planStudy').hidden = ui.planTab !== 'study';
    $('#hdrTitle').textContent = ui.planTab === 'timetable' ? 'Timetable' : 'Study plan';
    renderTimetable();

    var total = state.plan.reduce(function (a, b) { return a + b.mins; }, 0);
    $('#planTotal').textContent = total ? dur(total) + ' a week' : '';
    var today = new Date().getDay();
    $('#planList').innerHTML = WEEK_ORDER.map(function (day) {
      var blocks = state.plan.filter(function (b) { return b.day === day; })
        .sort(function (a, b) { return minsFrom(a.start) - minsFrom(b.start); });
      var mins = blocks.reduce(function (a, b) { return a + b.mins; }, 0);
      return '<section class="group"><div class="day-head"><span class="d">' + DAY_NAMES[day] +
        (day === today ? '<em> · today</em>' : '') + '</span>' +
        '<span class="side">' + (mins ? dur(mins) : '—') + '</span></div>' +
        (blocks.length ? '<div class="card flush">' + blocks.map(blockRow).join('') + '</div>'
          : '<div class="day-free">Free</div>') + '</section>';
    }).join('');
  }

  function autoPlan() {
    if (!state.subjects.length) { toast('Add your subjects first'); return; }
    var startM = minsFrom(state.profile.studyStart || '17:00');
    var endM = minsFrom(state.profile.studyEnd || '21:30');
    var goal = state.profile.dailyGoal || 120;
    var BLOCK = 45, GAP = 15;

    /* Weight each subject: its own priority, how long since it was studied,
       and whether homework is due for it in the next week. */
    var now = new Date();
    var soonCut = addDays(now, 7).getTime();
    var weights = state.subjects.map(function (s) {
      var last = lastStudied(s.id);
      var neglect = last === null ? 14 : Math.min(14, daysBetween(new Date(last), now));
      var hwDue = state.homework.some(function (h) {
        return !h.done && h.subjectId === s.id && new Date(h.due).getTime() < soonCut;
      });
      return { s: s, w: (s.priority || 2) * (1 + neglect / 14) * (hwDue ? 1.4 : 1), count: 0 };
    });

    var plan = [];
    WEEK_ORDER.forEach(function (day) {
      var perDay = day === 0 || day === 6 ? Math.round(goal * 1.25) : goal;   // weekends take a bit more
      var slots = Math.max(0, Math.floor(perDay / BLOCK));
      var t = startM, lastPick = null;
      for (var i = 0; i < slots; i++) {
        if (t + BLOCK > endM) break;
        var pick = null, best = -1;
        weights.forEach(function (x) {
          if (x.s.id === lastPick && weights.length > 1) return;              // no back-to-back repeats
          var score = x.w / (x.count + 0.6);
          if (score > best) { best = score; pick = x; }
        });
        if (!pick) break;
        pick.count++;
        lastPick = pick.s.id;
        plan.push({ id: uid(), day: day, start: hm(t), mins: BLOCK, subjectId: pick.s.id, topic: '' });
        t += BLOCK + GAP;
      }
    });

    state.plan = plan;
    save();
    render();
    toast('Week planned — ' + dur(plan.length * BLOCK));
  }

  /* ---------------- Study timer ---------------- */

  var tickHandle = null;

  var DEFAULT_TITLE = 'Sixth Year — Leaving Cert Study Planner';

  function timerState() {
    if (!state.timer) {
      state.timer = {
        running: false, mode: 'focus', remaining: (state.profile.focusMins || 25) * 60,
        endsAt: 0, subjectId: state.subjects.length ? state.subjects[0].id : null, topic: '', startedAt: 0
      };
    }
    var t = state.timer;
    if (t.kind !== 'stopwatch') t.kind = t.kind || 'pomodoro';
    if (typeof t.swAccum !== 'number') t.swAccum = 0;
    if (typeof t.swStart !== 'number') t.swStart = 0;
    return t;
  }

  /* Seconds on the stopwatch, counting the stretch since it was last started. */
  function stopwatchSecs() {
    var t = timerState();
    return Math.floor(t.swAccum + (t.running && t.swStart ? (Date.now() - t.swStart) / 1000 : 0));
  }

  function clockText(secs) {
    var h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), sec = secs % 60;
    return h ? h + ':' + pad(m) + ':' + pad(sec) : pad(m) + ':' + pad(sec);
  }

  function setTimerKind(kind) {
    var t = timerState();
    if (t.kind === kind) return;
    if (t.running) pauseTimer();
    t.kind = kind;
    save(true);
    renderStudy();
  }

  function timerRemaining() {
    var t = timerState();
    return t.running ? Math.max(0, Math.round((t.endsAt - Date.now()) / 1000)) : t.remaining;
  }

  function renderStudy() {
    var t = timerState();
    var sel = $('#timerSubject');
    sel.innerHTML = state.subjects.map(function (s) {
      return '<option value="' + s.id + '"' + (s.id === t.subjectId ? ' selected' : '') + '>' + esc(s.name) + '</option>';
    }).join('') || '<option value="">Add a subject in Setup</option>';
    $('#timerTopic').value = t.topic || '';
    $('#focusMins').value = state.profile.focusMins;
    $('#breakMins').value = state.profile.breakMins;
    $$('#timerModeSeg button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.tmode === t.kind);
    });
    $('#pomoSettings').hidden = t.kind === 'stopwatch';
    paintTimer();

    var recent = state.sessions.slice(-12).reverse();
    $('#sessionList').innerHTML = recent.length ? recent.map(function (s) {
      var d = new Date(s.at);
      return '<div class="item"><button class="body" data-action="edit-session" data-id="' + s.id + '">' +
        '<span class="t">' + esc(subjectName(s.subjectId)) +
        (s.topic ? ' <span class="muted small">· ' + esc(s.topic) + '</span>' : '') + '</span>' +
        '<span class="meta">' + dur(s.mins) + ' · ' + fmtDue(s.at) + '</span>' +
        (s.note ? '<span class="note">' + esc(s.note) + '</span>' : '') +
        '</button>' +
        '<button class="icon-btn" data-action="del-session" data-id="' + s.id + '" aria-label="Delete">&times;</button></div>';
    }).join('') : '<div class="empty">No sessions logged yet.</div>';
  }

  function paintTimer() {
    var t = timerState();
    var circumference = 2 * Math.PI * 52;

    if (t.kind === 'stopwatch') {
      var run = stopwatchSecs();
      $('#dialTime').textContent = clockText(run);
      $('#dialMode').textContent = 'Stopwatch';
      $('#dial').classList.remove('break');
      /* The ring sweeps once an hour, so a long session still reads as progress. */
      $('#dialProg').style.strokeDashoffset = (circumference * (1 - (run % 3600) / 3600)).toFixed(1);
      $('#btnTimer').textContent = t.running ? 'Pause' : (run ? 'Resume' : 'Start');
      $('#btnTimerReset').textContent = 'Stop & log';
      if (document.body.classList.contains('focus-on')) renderFocusSubject();
      document.title = t.running ? clockText(run) + ' · Studying' : DEFAULT_TITLE;
      return;
    }

    var secs = timerRemaining();
    var totalSecs = (t.mode === 'focus' ? state.profile.focusMins : state.profile.breakMins) * 60 || 1;
    $('#dialTime').textContent = pad(Math.floor(secs / 60)) + ':' + pad(secs % 60);
    $('#dialMode').textContent = t.mode === 'focus' ? 'Focus' : 'Break';
    $('#dial').classList.toggle('break', t.mode === 'break');
    $('#dialProg').style.strokeDashoffset = (circumference * (1 - Math.min(1, secs / totalSecs))).toFixed(1);
    $('#btnTimer').textContent = t.running ? 'Pause' : 'Start';
    $('#btnTimerReset').textContent = 'Reset';
    document.title = t.running
      ? pad(Math.floor(secs / 60)) + ':' + pad(secs % 60) + ' · ' + (t.mode === 'focus' ? 'Focus' : 'Break')
      : DEFAULT_TITLE;
  }

  function startTimer() {
    var t = timerState();
    if (!t.subjectId && state.subjects.length) t.subjectId = state.subjects[0].id;
    if (t.kind === 'stopwatch') {
      t.running = true;
      t.swStart = Date.now();
      save(true);
      runTicker();
      return;
    }
    if (t.remaining <= 0) t.remaining = (t.mode === 'focus' ? state.profile.focusMins : state.profile.breakMins) * 60;
    t.running = true;
    t.endsAt = Date.now() + t.remaining * 1000;
    if (!t.startedAt) t.startedAt = Date.now();
    save(true);
    runTicker();
  }

  function pauseTimer() {
    var t = timerState();
    if (t.kind === 'stopwatch') {
      t.swAccum = stopwatchSecs();
      t.swStart = 0;
      t.running = false;
      save(true);
      stopTicker();
      paintTimer();
      return;
    }
    t.remaining = timerRemaining();
    t.running = false;
    save(true);
    stopTicker();
    paintTimer();
  }

  function resetTimer(keepMode) {
    var t = timerState();
    if (t.mode === 'focus' && t.running) logElapsed();
    t.running = false;
    if (!keepMode) t.mode = 'focus';
    t.remaining = (t.mode === 'focus' ? state.profile.focusMins : state.profile.breakMins) * 60;
    t.startedAt = 0;
    stopTicker();
    save(true);
    paintTimer();
  }

  /* Stopwatch: bank whatever has run, then go back to zero. */
  function stopStopwatch() {
    var t = timerState();
    var mins = Math.round(stopwatchSecs() / 60);
    t.running = false;
    t.swStart = 0;
    t.swAccum = 0;
    stopTicker();
    if (mins >= 1) {
      logSession(t.subjectId, t.topic, mins);
      toast(dur(mins) + ' logged to ' + subjectName(t.subjectId));
    } else {
      save(true);
      toast('Under a minute — nothing logged');
    }
    if (ui.view === 'study') renderStudy(); else paintTimer();
  }

  function logElapsed() {
    var t = timerState();
    var total = state.profile.focusMins * 60;
    var elapsed = Math.round((total - timerRemaining()) / 60);
    if (elapsed >= 1) logSession(t.subjectId, t.topic, elapsed);
  }

  function logSession(subjectId, topic, mins) {
    state.sessions.push({ id: uid(), subjectId: subjectId, topic: topic || '', mins: mins, at: new Date().toISOString() });
    save();
  }

  function runTicker() {
    stopTicker();
    tickHandle = setInterval(function () {
      var t = timerState();
      if (!t.running) return stopTicker();
      if (t.kind === 'stopwatch') {
        if (ui.view === 'study' || document.visibilityState === 'visible') paintTimer();
        return;
      }
      if (timerRemaining() <= 0) {
        completePhase();
      } else if (ui.view === 'study' || document.visibilityState === 'visible') {
        paintTimer();
      }
    }, 500);
    paintTimer();
  }
  function stopTicker() { if (tickHandle) { clearInterval(tickHandle); tickHandle = null; } }

  function completePhase() {
    var t = timerState();
    t.running = false;
    stopTicker();
    if (t.mode === 'focus') {
      logSession(t.subjectId, t.topic, state.profile.focusMins);
      t.mode = 'break';
      t.remaining = state.profile.breakMins * 60;
      if (state.notify.timer) notifyNow('Focus block done', dur(state.profile.focusMins) + ' of ' + subjectName(t.subjectId) + ' logged. Take a ' + state.profile.breakMins + ' minute break.', 'study');
      beep();
    } else {
      t.mode = 'focus';
      t.remaining = state.profile.focusMins * 60;
      if (state.notify.timer) notifyNow('Break over', 'Back to it — ' + dur(state.profile.focusMins) + ' on ' + subjectName(t.subjectId) + '.', 'study');
      beep();
    }
    t.startedAt = 0;
    save();
    if (ui.view === 'study') renderStudy(); else paintTimer();
  }

  function beep() {
    try {
      var ac = new (window.AudioContext || window.webkitAudioContext)();
      var o = ac.createOscillator(), g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.frequency.value = 660; g.gain.value = 0.001;
      g.gain.exponentialRampToValueAtTime(0.25, ac.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.7);
      o.start(); o.stop(ac.currentTime + 0.75);
      setTimeout(function () { ac.close(); }, 1200);
    } catch (e) { /* no audio, no harm */ }
  }

  /* ---------------- Focus mode ---------------- */

  var wakeLock = null;

  function focusMode(on) {
    document.body.classList.toggle('focus-on', on);
    if (on) {
      renderFocusSubject();
      requestWakeLock();
      window.scrollTo(0, 0);
    } else {
      releaseWakeLock();
    }
  }

  function renderFocusSubject() {
    var t = timerState();
    var el = $('#focusSubject');
    if (el) el.textContent = subjectName(t.subjectId) + (t.topic ? ' · ' + t.topic : '');
  }

  /* Keep the screen awake while a focus block runs, where the browser allows it. */
  function requestWakeLock() {
    if (!navigator.wakeLock || wakeLock) return;
    navigator.wakeLock.request('screen').then(function (lock) {
      wakeLock = lock;
      lock.addEventListener('release', function () { wakeLock = null; });
    }).catch(function () { /* denied or unsupported */ });
  }
  function releaseWakeLock() {
    if (!wakeLock) return;
    try { wakeLock.release(); } catch (e) { /* already gone */ }
    wakeLock = null;
  }

  /* ---------------- Stats ---------------- */

  function renderStats() {
    /* Current week, Monday to Sunday */
    var now = new Date();
    var monday = startOfDay(addDays(now, -((now.getDay() + 6) % 7)));
    var vals = [], labels = [];
    for (var i = 0; i < 7; i++) {
      var d = addDays(monday, i);
      vals.push(minutesOn(d));
      labels.push(DAY_SHORT[d.getDay()][0]);
    }
    var max = Math.max(60, Math.max.apply(null, vals));
    $('#weekChart').innerHTML = vals.map(function (v, i) {
      var isToday = ymd(addDays(monday, i)) === ymd(now);
      return '<div class="col' + (isToday ? ' today' : '') + '" title="' + dur(v) + '">' +
        '<div class="stem' + (v ? ' has' : '') + '" style="height:' + Math.max(3, (v / max) * 100) + '%"></div>' +
        '<div class="lbl">' + labels[i] + '</div></div>';
    }).join('');
    var weekMins = vals.reduce(function (a, b) { return a + b; }, 0);
    $('#weekTotal').textContent = dur(weekMins);

    var last30 = minutesSince(30);
    var mins30 = last30.reduce(function (a, s) { return a + s.mins; }, 0);
    var doneHw = state.homework.filter(function (h) { return h.done; }).length;
    var tiles = [
      { v: streak(), l: 'day streak' },
      { v: dur(Math.round(mins30 / 30)), l: 'daily average' },
      { v: Math.round(mins30 / 60) + 'h', l: 'last 30 days' },
      { v: last30.length, l: 'sessions (30d)' },
      { v: doneHw, l: 'homework done' },
      { v: openHomework().length, l: 'still open' }
    ];
    $('#statTiles').innerHTML = tiles.map(function (t) {
      return '<div class="stat"><b>' + esc(t.v) + '</b><span>' + t.l + '</span></div>';
    }).join('');

    var per = {};
    last30.forEach(function (s) { per[s.subjectId] = (per[s.subjectId] || 0) + s.mins; });
    var rows = state.subjects.map(function (s) { return { s: s, m: per[s.id] || 0 }; })
      .sort(function (a, b) { return b.m - a.m; });
    var top = Math.max.apply(null, rows.map(function (r) { return r.m; }).concat([1]));
    $('#subjectBars').innerHTML = rows.length ? rows.map(function (r) {
      return '<div class="subject-row"><span class="nm">' + esc(r.s.name) + '</span>' +
        '<span class="track"><i style="width:' + ((r.m / top) * 100) + '%;background:' + r.s.color + '"></i></span>' +
        '<span class="val">' + (r.m ? dur(r.m) : '—') + '</span></div>';
    }).join('') : '<div class="empty">Add subjects in Setup.</div>';

    renderResults();
    renderPoints();
    renderCourses();
  }

  function fmtDate(iso) {
    var d = new Date(iso);
    var out = d.getDate() + ' ' + d.toLocaleString('en-IE', { month: 'short' });
    return d.getFullYear() === new Date().getFullYear() ? out : out + ' ' + d.getFullYear();
  }

  function previousResult(r) {
    var list = resultsFor(r.subjectId);
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === r.id) return i > 0 ? list[i - 1] : null;
    }
    return null;
  }

  function renderResults() {
    var list = state.results.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    $('#resultsList').innerHTML = list.length
      ? list.slice(0, 25).map(function (r) {
          var sub = subject(r.subjectId);
          var prev = previousResult(r);
          var delta = prev ? r.percent - prev.percent : null;
          return '<button class="res-row" data-action="edit-result" data-id="' + r.id + '">' +
            '<span class="body"><span class="t">' + esc(subjectName(r.subjectId)) + '</span>' +
            '<span class="meta"><span class="pill">' + esc(r.label) + '</span>' +
            '<span class="pill">' + esc(fmtDate(r.date)) + '</span>' +
            (delta !== null ? '<span class="trend ' + (delta >= 0 ? 'up' : 'down') + '">' +
              (delta >= 0 ? '+' : '') + delta + '% on last</span>' : '') +
            '</span></span>' +
            '<span class="score">' + r.percent + '%<small>' + gradeFromPercent(sub ? sub.level : 'H', r.percent) + '</small></span>' +
            '</button>';
        }).join('')
      : '<div class="empty">No results yet. Add a mock, Christmas test or class test and the points estimate can follow your real marks.</div>';
  }

  function pointsEstimate() {
    var scores = state.subjects.map(function (sub) {
      var g = gradeForPoints(sub);
      if (!g) return null;
      return POINTS[sub.level][+g.slice(1)] + (bonusFor(sub, g) ? 25 : 0);
    }).filter(function (x) { return x !== null; }).sort(function (a, b) { return b - a; });
    return { total: scores.slice(0, 6).reduce(function (a, b) { return a + b; }, 0), counted: scores.length };
  }

  function renderCourses() {
    var est = pointsEstimate().total;
    var list = state.courses.slice().sort(function (a, b) { return (b.points || 0) - (a.points || 0); });
    $('#coursesList').innerHTML = list.length
      ? list.map(function (c) {
          var gap = est - (c.points || 0);
          var cls = gap >= 0 ? 'hit' : (gap >= -20 ? 'near' : 'miss');
          return '<button class="res-row course-row" data-action="edit-course" data-id="' + c.id + '">' +
            '<span class="body"><span class="t">' + esc(c.title) + '</span>' +
            '<span class="meta">' +
              (c.code ? '<span class="pill">' + esc(c.code) + '</span>' : '') +
              (c.college ? '<span class="pill">' + esc(c.college) + '</span>' : '') +
            '</span></span>' +
            '<span class="score">' + (c.points || 0) +
            '<small class="gap ' + cls + '">' + (gap >= 0 ? '+' : '') + gap + '</small></span></button>';
        }).join('')
      : '<div class="empty">No courses yet. Add the ones you are aiming for to see the gap.</div>';
  }

  function renderPoints() {
    $$('#pointsSrc button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.psrc === ui.pointsSource);
    });
    $('#pointsHint').textContent = ui.pointsSource === 'results'
      ? 'Using the latest test result for each subject, converted to a grade. Subjects with no result yet fall back to your target.'
      : 'Set the grade you are realistically working towards. Best six count, plus 25 bonus points for H6 or better in Higher Level Maths.';

    var rows = state.subjects.map(function (s) {
      var target = state.grades[s.id] || '';
      var eff = gradeForPoints(s);
      var mid;
      if (ui.pointsSource === 'results') {
        var r = latestResult(s.id);
        mid = '<span class="grow small muted">' + (r
          ? esc(r.label) + ' · ' + r.percent + '% · ' + gradeFromPercent(s.level, r.percent)
          : 'no result — target ' + (target || 'not set')) + '</span>';
      } else {
        var opts = ['<option value="">—</option>'];
        for (var i = 1; i <= 8; i++) {
          var code = s.level + i;
          opts.push('<option value="' + code + '"' + (target === code ? ' selected' : '') + '>' + code + '</option>');
        }
        mid = '<select data-action="grade" data-id="' + s.id + '">' + opts.join('') + '</select>';
      }
      return '<div class="subject-row"><span class="nm">' + esc(s.name) + '</span>' +
        '<span class="lvl">' + s.level + 'L</span>' + mid +
        '<span class="val">' + (eff ? POINTS[s.level][+eff.slice(1)] + (bonusFor(s, eff) ? '+25' : '') : '—') + '</span></div>';
    });
    $('#pointsRows').innerHTML = rows.join('') || '<div class="empty">Add subjects in Setup.</div>';

    var est = pointsEstimate();
    $('#pointsTotal').textContent = est.counted
      ? est.total + ' points'
      : (ui.pointsSource === 'results' ? 'no results logged yet' : 'set your target grades');
  }

  /* 25 bonus points for H6 or better in Higher Level Maths. */
  function bonusFor(s, grade) {
    return s.level === 'H' && isMaths(s.name) && +grade.slice(1) <= 6;
  }
  function isMaths(name) { return /^(maths|mathematics)$/i.test(String(name).trim()); }

  /* SEC grade bands: H1/O1 from 90%, then every ten points down to a fail under 30%. */
  function gradeFromPercent(level, pct) {
    var n = pct >= 90 ? 1 : pct >= 80 ? 2 : pct >= 70 ? 3 : pct >= 60 ? 4
          : pct >= 50 ? 5 : pct >= 40 ? 6 : pct >= 30 ? 7 : 8;
    return level + n;
  }

  function resultsFor(subjectId) {
    return state.results.filter(function (r) { return r.subjectId === subjectId; })
      .sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
  }
  function latestResult(subjectId) {
    var list = resultsFor(subjectId);
    return list.length ? list[list.length - 1] : null;
  }

  /* The grade a subject counts as, from whichever source the user picked. */
  function gradeForPoints(sub) {
    if (ui.pointsSource === 'results') {
      var r = latestResult(sub.id);
      if (r) return gradeFromPercent(sub.level, r.percent);
    }
    return state.grades[sub.id] || '';
  }

  /* ---------------- Setup ---------------- */

  function renderSetup() {
    var p = state.profile, n = state.notify;
    $('#setName').value = p.name;
    $('#setExam').value = p.examDate;
    $('#setGoal').value = p.dailyGoal;
    $('#setStudyStart').value = p.studyStart;
    $('#setStudyEnd').value = p.studyEnd;
    $('#setTheme').value = p.theme || 'system';
    $('#setTextSize').value = p.textSize || 'normal';
    $('#setFont').checked = !!p.readableFont;
    $('#ntfHomework').checked = n.homework;
    $('#ntfDaily').checked = n.daily;
    $('#ntfDailyTime').value = n.dailyTime;
    $('#ntfBlocks').checked = n.blocks;
    $('#ntfWeekly').checked = n.weekly;
    $('#ntfTimer').checked = n.timer;
    $('#ntfLead').value = n.lead.join(',');

    $('#subjectList').innerHTML = state.subjects.map(function (s) {
      return '<div class="item">' +
        '<button class="body" data-action="edit-subject" data-id="' + s.id + '">' +
        '<span class="t">' + esc(s.name) + '</span>' +
        '<span class="meta"><span class="pill"><i class="dot" style="background:' + s.color + '"></i>' +
        (s.level === 'H' ? 'Higher' : 'Ordinary') + '</span>' +
        '<span class="pill">' + ['', 'low', 'normal', 'high'][s.priority || 2] + ' priority</span></span>' +
        '</button>' +
        '<button class="icon-btn" data-action="edit-subject" data-id="' + s.id + '" aria-label="Edit">&rsaquo;</button></div>';
    }).join('') || '<div class="empty">No subjects yet.</div>';

    var slots = slotList();
    var teaching = slots.filter(function (sl) { return !sl.brk; }).length;
    var breaks = slots.length - teaching;
    $('#slotSummary').textContent = slots.length
      ? teaching + ' class periods and ' + breaks + ' break' + (breaks === 1 ? '' : 's') +
        ', ' + slots[0].start + ' to ' + slots[slots.length - 1].end + '.'
      : 'No time slots set up yet.';

    var perm = ('Notification' in window) ? Notification.permission : 'unsupported';
    var msg = {
      granted: 'Notifications are on for this device.',
      denied: 'Notifications are blocked. Turn them back on in your browser or phone settings for this site.',
      default: 'Notifications are not switched on yet.',
      unsupported: 'This browser does not support notifications.'
    }[perm];
    if (perm === 'granted' && !navigator.serviceWorker) msg += ' Serve the app over http(s) for background reminders.';
    $('#permState').textContent = msg;
  }

  /* ------------------------------------------------------------------ *
   * Modals
   * ------------------------------------------------------------------ */

  /* Sheets are built as grab handle + scrolling body + a footer that stays put,
     so Save is always reachable with the keyboard up on a phone. */
  function openModal(title, body, foot, onOpen) {
    $('#modal').innerHTML =
      '<div class="grab"></div>' +
      '<div class="sheet-body"><h2>' + esc(title) + '</h2>' + body + '</div>' +
      '<div class="sheet-foot">' + foot + '</div>';
    $('#modalBack').hidden = false;
    document.body.style.overflow = 'hidden';
    if (onOpen) onOpen($('#modal'));
  }
  function closeModal() {
    $('#modalBack').hidden = true;
    $('#modal').innerHTML = '';
    document.body.style.overflow = '';
  }

  function subjectOptions(selected) {
    return state.subjects.map(function (s) {
      return '<option value="' + s.id + '"' + (s.id === selected ? ' selected' : '') + '>' + esc(s.name) + '</option>';
    }).join('');
  }

  function localDatetimeValue(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  /* Quick due-date buttons, the first of which is the next time this subject
     is actually on — which is when the homework is really wanted. */
  function dueQuickHtml(subjectId) {
    function chip(date, label) {
      return '<button class="btn small subtle" data-action="set-due" data-at="' + date.getTime() + '">' +
        esc(label) + '</button>';
    }
    var out = [];
    var nc = subjectId ? nextClassFor(subjectId, new Date()) : null;
    if (nc) {
      out.push(chip(nc.at, 'Next ' + subjectName(subjectId) + ' class · ' +
        DAY_SHORT[nc.at.getDay()] + ' ' + nc.slot.start));
    }
    out.push(chip(atTime(addDays(new Date(), 1), '09:00'), 'Tomorrow'));
    out.push(chip(atTime(addDays(new Date(), 7), '09:00'), 'Next week'));
    return out.join('');
  }

  function homeworkModal(id, preset) {
    preset = preset || {};
    var h = id ? state.homework.filter(function (x) { return x.id === id; })[0] : null;
    var due = h ? new Date(h.due)
      : (preset.due ? new Date(preset.due) : atTime(addDays(new Date(), 1), '09:00'));
    var subjectId = h ? h.subjectId
      : (preset.subjectId || (state.subjects.length ? state.subjects[0].id : null));
    openModal(h ? 'Edit homework' : 'Add homework',
      '<label class="field"><span>What is it?</span><input id="mTitle" placeholder="e.g. Essay on Macbeth, Ch.7 questions" value="' + esc(h ? h.title : '') + '"></label>' +
      '<label class="field"><span>Subject</span><select id="mSubject">' + subjectOptions(subjectId) + '</select></label>' +
      '<div class="grid2">' +
        '<label class="field"><span>Due</span><input type="datetime-local" id="mDue" value="' + localDatetimeValue(due) + '"></label>' +
        '<label class="field"><span>Minutes</span><input type="number" id="mEst" min="0" step="15" inputmode="numeric" value="' + (h && h.estMins ? h.estMins : 30) + '"></label>' +
      '</div>' +
      '<div class="row" id="dueQuick" style="margin:-2px 0 12px">' + dueQuickHtml(subjectId) + '</div>' +
      '<label class="field"><span>Notes</span><textarea id="mNotes" placeholder="Page numbers, what the teacher said, anything else">' + esc(h ? h.notes : '') + '</textarea></label>',
      (h ? '<button class="btn danger" data-action="delete-hw" data-id="' + h.id + '">Delete</button>' : '') +
      '<button class="btn ghost" data-action="close-modal">Cancel</button>' +
      '<button class="btn primary" data-action="save-hw" data-id="' + (h ? h.id : '') + '">Save</button>',
      function (m) { if (!h) { var f = $('#mTitle', m); if (f) f.focus(); } }
    );
  }

  function saveHomework(id) {
    var title = $('#mTitle').value.trim();
    if (!title) { toast('Give it a name first'); return; }
    var dueVal = $('#mDue').value;
    var due = dueVal ? new Date(dueVal) : atTime(addDays(new Date(), 1), '09:00');
    var rec = id ? state.homework.filter(function (x) { return x.id === id; })[0] : null;
    if (!rec) {
      rec = { id: uid(), done: false, createdAt: new Date().toISOString() };
      state.homework.push(rec);
    }
    rec.title = title;
    rec.subjectId = $('#mSubject').value || null;
    rec.due = due.toISOString();
    rec.estMins = +$('#mEst').value || 0;
    rec.notes = $('#mNotes').value.trim();
    save();
    closeModal();
    render();
    toast('Saved');
  }

  function blockModal() {
    openModal('Add a study block',
      '<label class="field"><span>Subject</span><select id="bSubject">' + subjectOptions(null) + '</select></label>' +
      '<label class="field"><span>Day</span><select id="bDay">' +
        WEEK_ORDER.map(function (d) { return '<option value="' + d + '"' + (d === new Date().getDay() ? ' selected' : '') + '>' + DAY_NAMES[d] + '</option>'; }).join('') +
      '</select></label>' +
      '<div class="grid2">' +
        '<label class="field"><span>Start</span><input type="time" id="bStart" value="' + esc(state.profile.studyStart) + '"></label>' +
        '<label class="field"><span>Minutes</span><input type="number" id="bMins" min="15" step="15" inputmode="numeric" value="45"></label>' +
      '</div>' +
      '<label class="field"><span>Topic (optional)</span><input id="bTopic" placeholder="e.g. Past paper 2019 Q3"></label>',
      '<button class="btn ghost" data-action="close-modal">Cancel</button>' +
      '<button class="btn primary" data-action="save-block">Add block</button>'
    );
  }

  function subjectModal(id) {
    var s = id ? subject(id) : null;
    openModal(s ? 'Edit subject' : 'Add subject',
      '<label class="field"><span>Subject</span><input id="sName" list="lcSubjects" value="' + esc(s ? s.name : '') + '" placeholder="Start typing…">' +
      '<datalist id="lcSubjects">' + LC_SUBJECTS.map(function (n) { return '<option value="' + esc(n) + '">'; }).join('') + '</datalist></label>' +
      '<div class="grid2">' +
        '<label class="field"><span>Level</span><select id="sLevel">' +
          '<option value="H"' + (!s || s.level === 'H' ? ' selected' : '') + '>Higher</option>' +
          '<option value="O"' + (s && s.level === 'O' ? ' selected' : '') + '>Ordinary</option>' +
        '</select></label>' +
        '<label class="field"><span>Priority</span><select id="sPriority">' +
          [1, 2, 3].map(function (p) {
            return '<option value="' + p + '"' + ((s ? s.priority : 2) === p ? ' selected' : '') + '>' + ['', 'Low', 'Normal', 'High'][p] + '</option>';
          }).join('') +
        '</select></label>' +
      '</div>',
      (s ? '<button class="btn danger" data-action="delete-subject" data-id="' + s.id + '">Delete</button>' : '') +
      '<button class="btn ghost" data-action="close-modal">Cancel</button>' +
      '<button class="btn primary" data-action="save-subject" data-id="' + (s ? s.id : '') + '">Save</button>'
    );
  }

  function seedModal() {
    openModal('Your subjects',
      '<p class="hint">Tick the ones you are sitting. Levels and priorities are set afterwards in Setup.</p>' +
      '<div class="pick-list">' +
      LC_SUBJECTS.map(function (n) {
        var have = state.subjects.some(function (s) { return s.name === n; });
        return '<label class="pick"><span>' + esc(n) + '</span>' +
          '<input type="checkbox" class="seedbox" value="' + esc(n) + '"' + (have ? ' checked' : '') + '></label>';
      }).join('') +
      '</div>',
      '<button class="btn ghost" data-action="close-modal">Cancel</button>' +
      '<button class="btn primary" data-action="save-seed">Save subjects</button>'
    );
  }

  function classModal(day, slotId) {
    var sl = slotById(slotId);
    var existing = classAt(day, slotId);
    var c = existing || {};
    openModal(DAY_NAMES[day] + (sl ? ' · ' + sl.start + '–' + sl.end : ''),
      '<label class="field"><span>Subject</span><select id="cSubject">' +
        '<option value="">Something else…</option>' + subjectOptions(c.subjectId || null) +
      '</select></label>' +
      '<label class="field"><span>Or type it in</span><input id="cName" value="' + esc(c.name || '') +
        '" placeholder="e.g. PE, Religion, Study hall"></label>' +
      '<div class="grid2">' +
        '<label class="field"><span>Room</span><input id="cRoom" value="' + esc(c.room || '') + '" placeholder="e.g. 12 or Lab 2"></label>' +
        '<label class="field"><span>Teacher</span><input id="cTeacher" value="' + esc(c.teacher || '') + '" placeholder="e.g. Ms Ryan"></label>' +
      '</div>' +
      (existing && existing.subjectId
        ? '<button class="link" data-action="hw-from-class" data-id="' + existing.subjectId + '">+ Add homework for this class</button>'
        : ''),
      (existing ? '<button class="btn danger" data-action="clear-class" data-day="' + day + '" data-slot="' + slotId + '">Clear</button>' : '') +
      '<button class="btn ghost" data-action="close-modal">Cancel</button>' +
      '<button class="btn primary" data-action="save-class" data-day="' + day + '" data-slot="' + slotId + '">Save</button>'
    );
  }

  function slotsModal() {
    openModal('Time slots',
      '<p class="hint">These times apply to every school day. Tap one to change it.</p>' +
      slotList().map(function (sl) {
        return '<button class="slot-row" data-action="edit-slot" data-id="' + sl.id + '">' +
          '<span class="nm">' + esc(sl.label) + (sl.brk ? ' <span class="muted small">· break</span>' : '') + '</span>' +
          '<span class="tm">' + esc(sl.start) + '–' + esc(sl.end) + '</span>' +
          '<span class="chev">›</span></button>';
      }).join(''),
      '<button class="btn ghost" data-action="close-modal">Done</button>' +
      '<button class="btn primary" data-action="edit-slot" data-id="">+ Add slot</button>'
    );
  }

  function slotModal(id) {
    var sl = id ? slotById(id) : null;
    openModal(sl ? 'Edit slot' : 'Add slot',
      '<label class="field"><span>Name</span><input id="slName" value="' + esc(sl ? sl.label : '') +
        '" placeholder="e.g. Class 1, Break, Lunch"></label>' +
      '<div class="grid2">' +
        '<label class="field"><span>Starts</span><input type="time" id="slStart" value="' + esc(sl ? sl.start : '09:00') + '"></label>' +
        '<label class="field"><span>Ends</span><input type="time" id="slEnd" value="' + esc(sl ? sl.end : '09:40') + '"></label>' +
      '</div>' +
      '<label class="pick"><span>Break or lunch — no class here</span>' +
        '<input type="checkbox" id="slBrk"' + (sl && sl.brk ? ' checked' : '') + '></label>',
      (sl ? '<button class="btn danger" data-action="delete-slot" data-id="' + sl.id + '">Delete</button>' : '') +
      '<button class="btn ghost" data-action="edit-slots">Back</button>' +
      '<button class="btn primary" data-action="save-slot" data-id="' + (sl ? sl.id : '') + '">Save</button>'
    );
  }

  function sessionModal(id) {
    var ses = state.sessions.filter(function (x) { return x.id === id; })[0];
    if (!ses) return;
    openModal('Study session',
      '<label class="field"><span>Subject</span><select id="sesSubject">' + subjectOptions(ses.subjectId) + '</select></label>' +
      '<div class="grid2">' +
        '<label class="field"><span>Minutes</span><input type="number" id="sesMins" min="1" step="5" inputmode="numeric" value="' + ses.mins + '"></label>' +
        '<label class="field"><span>When</span><input type="datetime-local" id="sesWhen" value="' + localDatetimeValue(new Date(ses.at)) + '"></label>' +
      '</div>' +
      '<label class="field"><span>Topic</span><input id="sesTopic" value="' + esc(ses.topic || '') + '" placeholder="e.g. Trigonometry"></label>' +
      '<label class="field"><span>Notes</span><textarea id="sesNote" placeholder="What you covered, what tripped you up, what to redo">' + esc(ses.note || '') + '</textarea></label>',
      '<button class="btn danger" data-action="del-session" data-id="' + ses.id + '">Delete</button>' +
      '<button class="btn ghost" data-action="close-modal">Cancel</button>' +
      '<button class="btn primary" data-action="save-session" data-id="' + ses.id + '">Save</button>'
    );
  }

  var RESULT_KINDS = ['Mock', 'Christmas test', 'Summer test', 'Class test', 'Oral', 'Practical', 'Other'];

  function resultModal(id) {
    var r = id ? state.results.filter(function (x) { return x.id === id; })[0] : null;
    openModal(r ? 'Edit result' : 'Add a result',
      '<label class="field"><span>Subject</span><select id="rSubject">' + subjectOptions(r ? r.subjectId : null) + '</select></label>' +
      '<div class="grid2">' +
        '<label class="field"><span>What was it?</span><select id="rLabel">' +
          RESULT_KINDS.map(function (k) {
            return '<option value="' + esc(k) + '"' + (r && r.label === k ? ' selected' : '') + '>' + esc(k) + '</option>';
          }).join('') +
        '</select></label>' +
        '<label class="field"><span>Percentage</span><input type="number" id="rPct" min="0" max="100" inputmode="numeric" value="' + (r ? r.percent : '') + '"></label>' +
      '</div>' +
      '<label class="field"><span>Date</span><input type="date" id="rDate" value="' + esc(r ? r.date : ymd(new Date())) + '"></label>' +
      '<label class="field"><span>Notes</span><textarea id="rNote" placeholder="Where the marks went, what to fix">' + esc(r ? r.note || '' : '') + '</textarea></label>',
      (r ? '<button class="btn danger" data-action="delete-result" data-id="' + r.id + '">Delete</button>' : '') +
      '<button class="btn ghost" data-action="close-modal">Cancel</button>' +
      '<button class="btn primary" data-action="save-result" data-id="' + (r ? r.id : '') + '">Save</button>'
    );
  }

  function courseModal(id) {
    var c = id ? state.courses.filter(function (x) { return x.id === id; })[0] : null;
    openModal(c ? 'Edit course' : 'Add a CAO course',
      '<label class="field"><span>Course</span><input id="coTitle" value="' + esc(c ? c.title : '') + '" placeholder="e.g. Computer Science"></label>' +
      '<div class="grid2">' +
        '<label class="field"><span>Code</span><input id="coCode" value="' + esc(c ? c.code || '' : '') + '" placeholder="e.g. TR033"></label>' +
        '<label class="field"><span>Points last year</span><input type="number" id="coPoints" min="0" max="625" inputmode="numeric" value="' + (c ? c.points : '') + '"></label>' +
      '</div>' +
      '<label class="field"><span>College</span><input id="coCollege" value="' + esc(c ? c.college || '' : '') + '" placeholder="e.g. University of Galway"></label>' +
      '<label class="field"><span>Notes</span><textarea id="coNote" placeholder="Entry requirements, open day, anything to remember">' + esc(c ? c.note || '' : '') + '</textarea></label>',
      (c ? '<button class="btn danger" data-action="delete-course" data-id="' + c.id + '">Delete</button>' : '') +
      '<button class="btn ghost" data-action="close-modal">Cancel</button>' +
      '<button class="btn primary" data-action="save-course" data-id="' + (c ? c.id : '') + '">Save</button>'
    );
  }

  function manualLogModal() {
    openModal('Log study time',
      '<label class="field"><span>Subject</span><select id="lSubject">' + subjectOptions(timerState().subjectId) + '</select></label>' +
      '<div class="grid2">' +
        '<label class="field"><span>Minutes</span><input type="number" id="lMins" min="5" step="5" inputmode="numeric" value="45"></label>' +
        '<label class="field"><span>When</span><input type="datetime-local" id="lWhen" value="' + localDatetimeValue(new Date()) + '"></label>' +
      '</div>' +
      '<label class="field"><span>Topic (optional)</span><input id="lTopic"></label>' +
      '<label class="field"><span>Notes (optional)</span><textarea id="lNote" placeholder="What you covered"></textarea></label>',
      '<button class="btn ghost" data-action="close-modal">Cancel</button>' +
      '<button class="btn primary" data-action="save-log">Log it</button>'
    );
  }

  /* ------------------------------------------------------------------ *
   * Notifications
   * ------------------------------------------------------------------ */

  var swReg = null;

  function initServiceWorker() {
    if (!('serviceWorker' in navigator) || location.protocol === 'file:') return Promise.resolve(null);
    return navigator.serviceWorker.register('./sw.js').then(function (reg) {
      swReg = reg;
      return navigator.serviceWorker.ready;
    }).then(function (reg) {
      swReg = reg || swReg;
      requestPeriodicSync();
      return swReg;
    }).catch(function () { return null; });
  }

  function requestPeriodicSync() {
    if (!swReg || !swReg.periodicSync || !navigator.permissions) return;
    navigator.permissions.query({ name: 'periodic-background-sync' }).then(function (st) {
      if (st.state === 'granted') {
        swReg.periodicSync.register('reminders', { minInterval: 60 * 60 * 1000 }).catch(function () {});
      }
    }).catch(function () {});
  }

  function askPermission() {
    if (!('Notification' in window)) { toast('This browser has no notifications'); return Promise.resolve('unsupported'); }
    if (Notification.permission === 'granted') { toast('Reminders are already on'); return Promise.resolve('granted'); }
    return Notification.requestPermission().then(function (p) {
      renderHeader();
      if (ui.view === 'setup') renderSetup();
      if (p === 'granted') {
        toast('Reminders on');
        rebuildReminders();
        requestPeriodicSync();
      } else {
        toast('Reminders blocked — check your browser settings');
      }
      return p;
    });
  }

  function notifyNow(title, body, view) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    var opts = {
      body: body, icon: './icon.svg', badge: './badge.svg',
      tag: 'now-' + view, renotify: true, data: { view: view || 'today' }
    };
    if (swReg) swReg.showNotification(title, opts);
    else try { new Notification(title, opts); } catch (e) { /* ignore */ }
  }

  /* Build every reminder for the next fortnight and hand it to the queue. */
  function buildReminders() {
    var out = [], now = Date.now(), n = state.notify;
    var horizon = now + 14 * 864e5;

    function push(key, at, title, body, view, allowLate) {
      if (at > horizon) return;
      if (at <= now && !allowLate) return;                 // the moment has gone, let it go
      if (at <= now - 6 * 3600e3) return;                  // and never dump stale alerts
      out.push({ key: key, at: at, title: title, body: body, tag: key, view: view || 'today' });
    }

    if (n.homework) {
      state.homework.filter(function (h) { return !h.done; }).forEach(function (h) {
        var due = new Date(h.due).getTime();
        (n.lead || []).forEach(function (lead) {
          var when = lead >= 1440
            ? atTime(addDays(new Date(due), -Math.round(lead / 1440)), '17:00').getTime()
            : due - lead * 60000;
          var days = Math.round(lead / 1440);
          var whenLabel = lead >= 1440 ? (days === 1 ? 'tomorrow' : 'in ' + days + ' days') : 'in ' + dur(lead);
          push('hw:' + h.id + ':' + lead, when,
            subjectName(h.subjectId) + ' due ' + whenLabel,
            h.title + (h.estMins ? ' · about ' + dur(h.estMins) : ''), 'homework');
        });
        push('hw:' + h.id + ':due', due, 'Due now: ' + subjectName(h.subjectId), h.title, 'homework', true);
        /* A nudge each morning while it stays overdue */
        for (var i = 0; i < 3; i++) {
          var day = addDays(new Date(due), i + 1);
          push('hw:' + h.id + ':late:' + ymd(day), atTime(day, '08:00').getTime(),
            'Still outstanding: ' + subjectName(h.subjectId), h.title + ' was due ' + fmtDue(h.due), 'homework', true);
        }
      });
    }

    if (n.daily) {
      for (var d = 0; d < 14; d++) {
        var day = addDays(new Date(), d);
        var at = atTime(day, n.dailyTime || '16:30').getTime();
        var dayEnd = atTime(addDays(day, 1), '00:00').getTime();
        var dueThatDay = state.homework.filter(function (h) {
          var t = new Date(h.due).getTime();
          return !h.done && t < dayEnd;
        });
        var blocks = state.plan.filter(function (b) { return b.day === day.getDay(); });
        var planMins = blocks.reduce(function (a, b) { return a + b.mins; }, 0);
        var parts = [];
        if (dueThatDay.length) parts.push(dueThatDay.length + ' piece' + (dueThatDay.length === 1 ? '' : 's') + ' of homework outstanding');
        parts.push(planMins ? dur(planMins) + ' of study planned' : 'no study planned');
        push('daily:' + ymd(day), at, 'Plan for this evening', parts.join(' · '), 'today');
      }
    }

    if (n.blocks) {
      for (var k = 0; k < 14; k++) {
        var dd = addDays(new Date(), k);
        state.plan.filter(function (b) { return b.day === dd.getDay(); }).forEach(function (b) {
          var at = atTime(dd, b.start).getTime() - 10 * 60000;
          push('block:' + b.id + ':' + ymd(dd), at, subjectName(b.subjectId) + ' in 10 minutes',
            dur(b.mins) + ' block at ' + b.start + (b.topic ? ' · ' + b.topic : ''), 'study');
        });
      }
    }

    if (n.weekly) {
      for (var w = 0; w < 14; w++) {
        var sd = addDays(new Date(), w);
        if (sd.getDay() !== 0) continue;
        var exam = atTime(parseYmd(state.profile.examDate), '09:30');
        var left = Math.ceil((exam - startOfDay(sd)) / 864e5);
        if (left <= 0) continue;
        var mins = 0;
        for (var i2 = 0; i2 < 7; i2++) mins += minutesOn(addDays(sd, -i2));
        push('week:' + ymd(sd), atTime(sd, '19:00').getTime(),
          Math.floor(left / 7) + ' weeks to the Leaving Cert',
          'You did ' + dur(mins) + ' of study this week. Set up the week ahead.', 'plan');
      }
    }

    return out.sort(function (a, b) { return a.at - b.at; });
  }

  function rebuildReminders() {
    if (!window.ReminderQueue || !window.indexedDB) return Promise.resolve();
    var items = buildReminders();
    return ReminderQueue.sync(items)
      .then(scheduleTriggers)
      .then(fireDueReminders)
      .catch(function () {});
  }

  /* Chrome supports notifications scheduled ahead of time; use it where present
     so reminders arrive even with the browser fully closed. */
  function scheduleTriggers() {
    if (!swReg || !('TimestampTrigger' in window) || Notification.permission !== 'granted') return;
    return swReg.getNotifications({ includeTriggered: true }).then(function (list) {
      list.forEach(function (nt) { if (nt.data && nt.data.scheduled) nt.close(); });
      return ReminderQueue.all();
    }).then(function (items) {
      var now = Date.now();
      items.filter(function (r) { return !r.fired && r.at > now + 5000; })
        .sort(function (a, b) { return a.at - b.at; })
        .slice(0, 60)
        .forEach(function (r) {
          try {
            swReg.showNotification(r.title, {
              body: r.body, tag: r.tag, icon: './icon.svg', badge: './badge.svg',
              showTrigger: new window.TimestampTrigger(r.at),
              data: { view: r.view, key: r.key, scheduled: true }
            });
          } catch (e) { /* trigger unsupported after all */ }
        });
    }).catch(function () {});
  }

  function fireDueReminders() {
    if (!window.ReminderQueue || !('Notification' in window) || Notification.permission !== 'granted') return Promise.resolve();
    return ReminderQueue.due(Date.now()).then(function (items) {
      if (!items.length) return;
      items.forEach(function (r) { notifyQueued(r); });
      return ReminderQueue.markFired(items.map(function (r) { return r.key; }));
    }).catch(function () {});
  }

  function notifyQueued(r) {
    var opts = {
      body: r.body, icon: './icon.svg', badge: './badge.svg',
      tag: r.tag, renotify: true, data: { view: r.view, key: r.key }
    };
    if (swReg) swReg.showNotification(r.title, opts);
    else try { new Notification(r.title, opts); } catch (e) { /* ignore */ }
  }

  function pokeServiceWorker() {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'check-reminders' });
    }
  }

  /* ------------------------------------------------------------------ *
   * Import / export / install
   * ------------------------------------------------------------------ */

  function exportData() {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'sixth-year-backup-' + ymd(new Date()) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function importData(file) {
    var fr = new FileReader();
    fr.onload = function () {
      try {
        var incoming = JSON.parse(fr.result);
        if (!incoming || !Array.isArray(incoming.subjects)) throw new Error('bad file');
        state = Object.assign(defaults(), incoming);
        if (!state.timetable || !Array.isArray(state.timetable.slots)) state.timetable = defaults().timetable;
        if (!state.timetable.classes) state.timetable.classes = {};
        if (!Array.isArray(state.results)) state.results = [];
        if (!Array.isArray(state.courses)) state.courses = [];
        save();
        render();
        toast('Backup restored');
      } catch (e) { toast('That file could not be read'); }
    };
    fr.readAsText(file);
  }

  var installPrompt = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    installPrompt = e;
    var b = $('#btnInstall');
    if (b) b.hidden = false;
  });

  /* ------------------------------------------------------------------ *
   * Toast
   * ------------------------------------------------------------------ */

  var toastTimer = null;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2400);
  }

  /* ------------------------------------------------------------------ *
   * Events
   * ------------------------------------------------------------------ */

  document.addEventListener('click', function (e) {
    var goBtn = e.target.closest('[data-go]');
    if (goBtn) { go(goBtn.dataset.go); return; }

    var tab = e.target.closest('#tabs button');
    if (tab) { go(tab.dataset.view); return; }

    var el = e.target.closest('[data-action]');
    if (!el) {
      if (e.target.id === 'modalBack') closeModal();
      return;
    }
    var id = el.dataset.id;

    switch (el.dataset.action) {
      case 'close-modal': closeModal(); break;

      case 'open-timetable':
        ui.planTab = 'timetable';
        if (SCHOOL_DAYS.indexOf(new Date().getDay()) !== -1) ui.ttDay = new Date().getDay();
        go('plan');
        break;
      case 'tt-day':
        ui.ttDay = +el.dataset.day;
        renderTimetable();
        break;
      case 'edit-class': classModal(+el.dataset.day, el.dataset.slot); break;
      case 'save-class': {
        var cDay = +el.dataset.day, cSlot = el.dataset.slot;
        var subjId = $('#cSubject').value;
        var freeName = $('#cName').value.trim();
        if (!subjId && !freeName) { toast('Pick a subject or type a name'); break; }
        state.timetable.classes[classKey(cDay, cSlot)] = {
          subjectId: subjId || null,
          name: subjId ? '' : freeName,
          room: $('#cRoom').value.trim(),
          teacher: $('#cTeacher').value.trim()
        };
        save(); closeModal(); render(); toast('Saved');
        break;
      }
      case 'clear-class':
        delete state.timetable.classes[classKey(+el.dataset.day, el.dataset.slot)];
        save(); closeModal(); render();
        break;

      case 'edit-slots': slotsModal(); break;
      case 'edit-slot': slotModal(el.dataset.id || null); break;
      case 'save-slot': {
        var name = $('#slName').value.trim();
        var from = $('#slStart').value || '09:00';
        var to = $('#slEnd').value || '09:40';
        if (!name) { toast('Give the slot a name'); break; }
        if (minsFrom(to) <= minsFrom(from)) { toast('The end time has to be after the start'); break; }
        var slot = id ? slotById(id) : null;
        if (!slot) { slot = { id: uid() }; state.timetable.slots.push(slot); }
        slot.label = name;
        slot.start = from;
        slot.end = to;
        slot.brk = $('#slBrk').checked;
        save(); render(); slotsModal();
        break;
      }
      case 'delete-slot':
        state.timetable.slots = state.timetable.slots.filter(function (sl) { return sl.id !== id; });
        Object.keys(state.timetable.classes).forEach(function (k) {
          if (k.split(':')[1] === id) delete state.timetable.classes[k];
        });
        save(); render(); slotsModal();
        break;

      case 'toggle-hw': {
        var h = state.homework.filter(function (x) { return x.id === id; })[0];
        if (h) {
          h.done = !h.done;
          h.doneAt = h.done ? new Date().toISOString() : null;
          save();
          render();
          if (h.done) toast('Nice — ticked off');
        }
        break;
      }
      case 'edit-hw': homeworkModal(id); break;
      case 'save-hw': saveHomework(id || null); break;
      case 'delete-hw':
        state.homework = state.homework.filter(function (x) { return x.id !== id; });
        save(); closeModal(); render(); toast('Deleted');
        break;

      case 'del-block':
        state.plan = state.plan.filter(function (b) { return b.id !== id; });
        save(); render();
        break;
      case 'save-block': {
        state.plan.push({
          id: uid(), day: +$('#bDay').value, start: $('#bStart').value || '17:00',
          mins: +$('#bMins').value || 45, subjectId: $('#bSubject').value || null,
          topic: $('#bTopic').value.trim()
        });
        save(); closeModal(); render();
        break;
      }

      case 'edit-subject': subjectModal(id); break;
      case 'save-subject': {
        var nameVal = $('#sName').value.trim();
        if (!nameVal) { toast('Name the subject first'); break; }
        var s = id ? subject(id) : null;
        if (!s) { s = mkSubject(nameVal, 'H', state.subjects.length); state.subjects.push(s); }
        s.name = nameVal;
        s.level = $('#sLevel').value;
        s.priority = +$('#sPriority').value;
        save(); closeModal(); render();
        break;
      }
      case 'delete-subject': {
        var dropped = subject(id);
        Object.keys(state.timetable.classes).forEach(function (k) {
          var cl = state.timetable.classes[k];
          if (cl && cl.subjectId === id) { cl.subjectId = null; cl.name = dropped ? dropped.name : 'Class'; }
        });
        state.subjects = state.subjects.filter(function (x) { return x.id !== id; });
        state.plan = state.plan.filter(function (b) { return b.subjectId !== id; });
        save(); closeModal(); render();
        break;
      }

      case 'seed-subjects': seedModal(); break;
      case 'save-seed': {
        var picked = $$('.seedbox').filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
        var kept = state.subjects.filter(function (s2) { return picked.indexOf(s2.name) !== -1; });
        picked.forEach(function (nm, i) {
          if (!kept.some(function (s3) { return s3.name === nm; })) kept.push(mkSubject(nm, 'H', kept.length + i));
        });
        state.subjects = kept;
        state.seeded = true;
        save(); closeModal(); render();
        toast(kept.length + ' subjects saved');
        break;
      }

      case 'quick-study': {
        timerState().subjectId = id;
        save(true);
        go('study');
        break;
      }
      case 'edit-session': sessionModal(id); break;
      case 'save-session': {
        var ses = state.sessions.filter(function (x) { return x.id === id; })[0];
        if (ses) {
          ses.subjectId = $('#sesSubject').value || null;
          ses.mins = Math.max(1, +$('#sesMins').value || 1);
          ses.at = ($('#sesWhen').value ? new Date($('#sesWhen').value) : new Date(ses.at)).toISOString();
          ses.topic = $('#sesTopic').value.trim();
          ses.note = $('#sesNote').value.trim();
          save();
        }
        closeModal(); render(); toast('Saved');
        break;
      }
      case 'del-session':
        state.sessions = state.sessions.filter(function (s4) { return s4.id !== id; });
        save();
        if (!$('#modalBack').hidden) closeModal();
        render();
        break;

      case 'set-due':
        $('#mDue').value = localDatetimeValue(new Date(+el.dataset.at));
        break;
      case 'hw-from-class': {
        var nc = nextClassFor(id, new Date());
        closeModal();
        homeworkModal(null, { subjectId: id, due: nc ? nc.at : null });
        break;
      }

      case 'add-result': resultModal(null); break;
      case 'edit-result': resultModal(id); break;
      case 'save-result': {
        var pct = +$('#rPct').value;
        if (!$('#rSubject').value) { toast('Pick a subject'); break; }
        if (isNaN(pct) || pct < 0 || pct > 100) { toast('Give a percentage between 0 and 100'); break; }
        var res = id ? state.results.filter(function (x) { return x.id === id; })[0] : null;
        if (!res) { res = { id: uid() }; state.results.push(res); }
        res.subjectId = $('#rSubject').value;
        res.label = $('#rLabel').value;
        res.percent = Math.round(pct);
        res.date = $('#rDate').value || ymd(new Date());
        res.note = $('#rNote').value.trim();
        save(true); closeModal(); render(); toast('Result saved');
        break;
      }
      case 'delete-result':
        state.results = state.results.filter(function (x) { return x.id !== id; });
        save(true); closeModal(); render();
        break;

      case 'add-course': courseModal(null); break;
      case 'edit-course': courseModal(id); break;
      case 'save-course': {
        var title = $('#coTitle').value.trim();
        if (!title) { toast('Name the course first'); break; }
        var crs = id ? state.courses.filter(function (x) { return x.id === id; })[0] : null;
        if (!crs) { crs = { id: uid() }; state.courses.push(crs); }
        crs.title = title;
        crs.code = $('#coCode').value.trim();
        crs.college = $('#coCollege').value.trim();
        crs.points = Math.max(0, +$('#coPoints').value || 0);
        crs.note = $('#coNote').value.trim();
        save(true); closeModal(); render(); toast('Course saved');
        break;
      }
      case 'delete-course':
        state.courses = state.courses.filter(function (x) { return x.id !== id; });
        save(true); closeModal(); render();
        break;
      case 'save-log': {
        var when = $('#lWhen').value ? new Date($('#lWhen').value) : new Date();
        state.sessions.push({
          id: uid(), subjectId: $('#lSubject').value || null, topic: $('#lTopic').value.trim(),
          mins: +$('#lMins').value || 0, at: when.toISOString(),
          note: $('#lNote').value.trim()
        });
        save(); closeModal(); render(); toast('Logged');
        break;
      }
    }
  });

  document.addEventListener('change', function (e) {
    var subjPick = e.target.closest('#mSubject');
    if (subjPick) {
      var quick = $('#dueQuick');
      if (quick) quick.innerHTML = dueQuickHtml(subjPick.value);
    }
    var el = e.target.closest('[data-action="grade"]');
    if (el) {
      if (el.value) state.grades[el.dataset.id] = el.value;
      else delete state.grades[el.dataset.id];
      save(true);
      renderPoints();
    }
  });

  function wire() {
    $('#btnTheme').addEventListener('click', toggleTheme);
    $('#btnBell').addEventListener('click', askPermission);
    $('#planSeg').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-plantab]');
      if (!b) return;
      ui.planTab = b.dataset.plantab;
      renderPlan();
    });
    $('#btnAddHw').addEventListener('click', function () { homeworkModal(null); });
    $('#btnToggleDone').addEventListener('click', function () { ui.showDone = !ui.showDone; renderHomework(); });
    $('#btnAddBlock').addEventListener('click', blockModal);
    $('#btnAutoPlan').addEventListener('click', autoPlan);
    $('#btnClearPlan').addEventListener('click', function () {
      if (!state.plan.length || confirm('Clear the whole weekly plan?')) { state.plan = []; save(); render(); }
    });
    $('#btnAddSubject').addEventListener('click', function () { subjectModal(null); });
    $('#btnLogManual').addEventListener('click', manualLogModal);

    $('#btnTimer').addEventListener('click', function () {
      var t = timerState();
      if (t.running) pauseTimer(); else startTimer();
      paintTimer();
    });
    $('#btnFocus').addEventListener('click', function () { focusMode(true); });
    $('#btnFocusExit').addEventListener('click', function () { focusMode(false); });
    $('#pointsSrc').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-psrc]');
      if (!b) return;
      ui.pointsSource = b.dataset.psrc;
      renderPoints();
      renderCourses();
    });
    $('#btnTimerReset').addEventListener('click', function () {
      if (timerState().kind === 'stopwatch') stopStopwatch(); else resetTimer(false);
    });
    $('#timerModeSeg').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-tmode]');
      if (b) setTimerKind(b.dataset.tmode);
    });
    $('#timerSubject').addEventListener('change', function () { timerState().subjectId = this.value; save(true); });
    $('#timerTopic').addEventListener('input', function () { timerState().topic = this.value; save(true); });
    $('#focusMins').addEventListener('change', function () {
      state.profile.focusMins = Math.max(5, Math.min(120, +this.value || 25));
      if (!timerState().running && timerState().mode === 'focus') timerState().remaining = state.profile.focusMins * 60;
      save(true); paintTimer();
    });
    $('#breakMins').addEventListener('change', function () {
      state.profile.breakMins = Math.max(1, Math.min(30, +this.value || 5));
      save(true); paintTimer();
    });

    /* Setup fields */
    var bind = function (sel, fn) { $(sel).addEventListener('change', fn); };
    bind('#setName', function () { state.profile.name = this.value.trim(); save(true); renderHeader(); });
    bind('#setExam', function () { state.profile.examDate = this.value; save(); });
    bind('#setGoal', function () { state.profile.dailyGoal = Math.max(0, +this.value || 0); save(); });
    bind('#setStudyStart', function () { state.profile.studyStart = this.value; save(); });
    bind('#setStudyEnd', function () { state.profile.studyEnd = this.value; save(); });
    bind('#setTheme', function () { state.profile.theme = this.value; applyTheme(); save(true); });
    bind('#setTextSize', function () { state.profile.textSize = this.value; applyTheme(); save(true); });
    bind('#setFont', function () { state.profile.readableFont = this.checked; applyTheme(); save(true); });
    bind('#ntfHomework', function () { state.notify.homework = this.checked; save(); });
    bind('#ntfDaily', function () { state.notify.daily = this.checked; save(); });
    bind('#ntfDailyTime', function () { state.notify.dailyTime = this.value; save(); });
    bind('#ntfBlocks', function () { state.notify.blocks = this.checked; save(); });
    bind('#ntfWeekly', function () { state.notify.weekly = this.checked; save(); });
    bind('#ntfTimer', function () { state.notify.timer = this.checked; save(true); });
    bind('#ntfLead', function () {
      state.notify.lead = this.value.split(',').map(Number).filter(function (x) { return x > 0; });
      save();
    });

    $('#btnEnableNtf').addEventListener('click', askPermission);
    $('#btnTestNtf').addEventListener('click', function () {
      askPermission().then(function (p) {
        if (p === 'granted') notifyNow('Test reminder', 'This is what your homework reminders will look like.', 'today');
      });
    });

    $('#btnExport').addEventListener('click', exportData);
    $('#btnImport').addEventListener('click', function () { $('#importFile').click(); });
    $('#importFile').addEventListener('change', function () { if (this.files[0]) importData(this.files[0]); this.value = ''; });
    $('#btnReset').addEventListener('click', function () {
      if (confirm('Delete all subjects, homework, sessions and plans on this device?')) {
        state = defaults();
        save();
        render();
        toast('Everything cleared');
      }
    });
    $('#btnInstall').addEventListener('click', function () {
      if (!installPrompt) return;
      installPrompt.prompt();
      installPrompt = null;
      this.hidden = true;
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (!$('#modalBack').hidden) closeModal();
      else if (document.body.classList.contains('focus-on')) focusMode(false);
    });

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        fireDueReminders();
        render();
        if (timerState().running) runTicker();
        if (document.body.classList.contains('focus-on')) requestWakeLock();
      }
    });

    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', function (e) {
        if (e.data && e.data.type === 'go') go(e.data.view);
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * Start
   * ------------------------------------------------------------------ */

  function init() {
    applyTheme();
    if (darkQuery && darkQuery.addEventListener) {
      darkQuery.addEventListener('change', function () { applyTheme(); renderHeader(); });
    }
    wire();
    go((location.hash || '#today').slice(1));
    if (timerState().running) runTicker(); else paintTimer();

    initServiceWorker().then(rebuildReminders);

    /* Foreground safety net: check reminders every half minute, and nudge the
       worker so it can fire them too. */
    setInterval(function () {
      fireDueReminders();
      pokeServiceWorker();
    }, 30000);

    /* Keep the header and the now/next bar honest as periods tick over. */
    setInterval(function () {
      if (document.visibilityState !== 'visible') return;
      renderHeader();
      renderNowBar();
      if (ui.view === 'today') renderTodayClasses();
      if (ui.view === 'plan' && ui.planTab === 'timetable') renderTimetable();
    }, 30000);

    var lastDay = ymd(new Date());
    setInterval(function () {
      var d = ymd(new Date());
      if (d !== lastDay) { lastDay = d; rebuildReminders(); render(); }
    }, 60000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
