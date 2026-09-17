# Sixth Year — Leaving Cert study planner

A class timetable, study tracker, weekly planner and homework diary built for Irish
sixth years.
It is an installable web app (PWA): plain HTML, CSS and JavaScript, no build step,
no accounts, no server. Everything is stored on the device in `localStorage`.

## Run it

From inside this folder:

```bash
python -m http.server 8742
```

then open <http://127.0.0.1:8742> on the laptop, or `http://<your-computer-ip>:8742`
on a phone on the same Wi-Fi.

It must be served over `http://localhost` or `https://` — opening `index.html`
straight from the file system disables the service worker, and with it offline
support and background reminders.

## What it does

**Now / next bar** — pinned under the header on every screen once your timetable has
anything in it. During a class it shows the subject, room, teacher, how many minutes are
left and a progress line; between classes it flips to the next one, rolling on to
tomorrow or Monday when the school day is over. Tap it to jump to the timetable.

**Today** — countdown to the first Leaving Cert exam (days, weeks and school days),
today's classes with rooms and teachers (the current one highlighted), how far through
sixth year you are, today's study against your daily goal, what is due in the next week,
tonight's planned blocks, and which subjects have gone stale.

**Timetable** (Plan → Timetable) — your school week. Pick a day, tap any period and set
the subject (or type something that is not one of your subjects, like PE or study hall),
the room and the teacher. *Edit time slots* is where the periods themselves live: rename
them, change start and end times, mark one as a break or lunch, add periods or delete
them. The defaults are a nine-period day with a break and lunch, 09:00 to 15:55 — change
them to match your own school. Slots apply to every day of the week; what you put in them
is per day.

**Homework** — add a piece of homework with subject, due date and time, how long you
think it will take, and notes. Grouped into Overdue / Today / Tomorrow / This week /
Later, with the total time each group needs. Tick it off when it is done.

The due-date field has quick buttons, the first of which is **the next time that subject
is actually on** — "Next Maths class · Tue 09:40" — worked out from your timetable, since
that is usually when homework is wanted. Open a class in the timetable and there is an
*Add homework for this class* link that opens the form already filled in.

**Syllabus** (Plan → Syllabus) — the official specification for each of your subjects,
strand by strand, at the size of a single study block. Twelve subjects ship with a full
topic list (Irish, English, Maths, Biology, Chemistry, Physics, Geography, History,
Business, Accounting, Applied Maths, Home Economics) and the modern languages share one;
anything else starts blank and you add the topics your class covers.

Biology, Chemistry, Physics and Business follow the **revised specifications introduced in
September 2025 and first examined in 2027** — unifying strand, contextual strands and
the specification's own section numbers, with the 40% Investigation / Investigative Study
listed as a topic in its own right. Irish carries the **prescribed literature for 2027
onwards**. Both were taken from the NCCA specification documents and the publishers'
own 2025 materials, not from memory.

For every topic you can:

- **rate it** — tap the circle to cycle not rated → shaky (red) → getting there (gold) → solid (green);
- **map it to your book** — pick your textbook from the common ones (or type another) and
  enter the chapter number from its contents page. Where a book's chapter list has been
  checked against the edition, picking the book fills every chapter field for you and
  shows a contents card. Verified so far, from the books' own contents pages or the
  publishers' chapter maps: **Text & Tests 4 and 5** and **Active Maths 4 (Books 1 & 2)**
  for Maths; **Biology Plus (2025)**; **Chemistry Live! 3rd edition** and **Real World
  Physics 2nd edition** with their section headings; **Let's Do Business** and **Back in
  Business** (with the specification's numbered learning outcomes under each chapter);
  and **Tout va bien! 4th edition** and **À l'Attaque ! 2nd edition** for French. The
  remaining titles on 2025/26 school booklists are listed by name for you to map
  yourself, because editions differ and a wrong chapter is worse than a blank;
- **rate it part by part** — open a chapter on the contents card and every part of it
  (the book's own section headings, the learning outcomes, or the syllabus points it
  covers) gets a drop-down of its own. The topic's circle then follows the average, and
  the planner names the weakest part in each block: "Start with: 14.3 Evaluate how digital
  technologies influence recruitment". The same drop-downs sit under the topic picker on
  the Study tab, so a session can end with an honest update;
- **switch strands off** — options and electives your teacher is not doing come out of the
  planner with one tick;
- **add your own** — set texts, poets, case studies, or an entire syllabus for a subject
  that has no built-in list.

Every study session you log against a topic updates its *last studied* date, and rating
a topic shaky puts it on the Today screen under **Weak spots**, with a Study button that
preloads the timer.

**Study plan** (Plan → Study plan) — a repeating weekly set of evening study blocks. *Auto-fill week* spreads your
daily goal across 45-minute blocks between your study start and end times, weighting
each subject by its priority, how long since you last studied it, and whether homework
is due for it this week. Weekends get 25% more. You can add or delete blocks by hand.

Each block is then given a **specific topic**, not just a subject: shaky and unrated
topics first, then whatever you have not looked at for longest, nudged by how heavily
the exam leans on it, and spread across strands so a week is not six blocks of the same
unit. If you have mapped the chapter, the block reads "Photosynthesis · Biology Plus
ch. 12", and the reminder ten minutes before it says the same. The Study tab's topic
picker, the manual log and the session editor all use the same list, so a block, a
session and a rating are talking about the same thing.

**Study** — two timers behind one switch. **Pomodoro** counts down through focus and
break blocks you size yourself and logs each completed block. **Stopwatch** counts up
for open-ended study; *Stop & log* banks the elapsed time against the subject and topic,
rounded to the minute. Either way the clock survives a reload or a tab switch, and time
can also be logged by hand afterwards.

**Focus mode** takes the timer full screen — no tabs, no cards, just the clock, the
subject and a reminder to put the phone down — and asks the browser to keep the screen
awake. Escape or *Leave focus mode* returns.

**Session notes** — tap any session in the recent list to correct the subject, minutes or
time, and to write down what you actually covered and what to redo.

**Stats** — minutes per day this week, day streak, 30-day average, hours by subject and
homework completed, plus three exam-facing cards:

- **Test results** — log mocks, Christmas and summer tests, class tests, orals and
  practicals as a percentage. Each one shows the grade it converts to and the change on
  the previous result in that subject.
- **CAO points estimate** — the best six subjects, with the 25 bonus points for H6 or
  better in Higher Level Maths. Switch between **target grades** (what you are aiming
  for) and **latest results** (what you are actually getting, converted from your logged
  percentages, falling back to the target where there is no result yet).
- **CAO courses** — the courses you are aiming for with last year's points, sorted by
  points and showing the gap to your current estimate in green, amber or red.

**Setup** — your name, exam date, daily goal, study hours, appearance (match the
phone, always light, always dark), subjects and levels, notification settings, and a
JSON backup you can export and import.

## On a phone

The interface is built mobile first and every feature is reachable on a 375px screen:

- **Light and dark.** The sun/moon button in the header flips between them in one tap;
  Setup → Appearance adds a third option, following the phone. The browser chrome colour
  follows along.
- **Reading comfort.** Setup has three text sizes and an easier-reading font (Atkinson
  Hyperlegible where the device has it, otherwise Verdana, with looser line spacing).
  Paired fields collapse to one column as the text grows, so nothing gets clipped.
- **Laptops and tablets too.** From 900px the tab bar becomes a left sidebar and the
  content spreads across the whole window in as many columns as fit, rather than sitting
  in a phone-width column. Below that, nothing changes.
- **Bottom sheets.** Add and edit screens slide up as sheets with a scrolling body and a
  pinned action bar, so Save and Cancel stay put with the keyboard open.
- **No zoom jumps.** Inputs are 16px, which stops iOS zooming in when a field is focused.
- **Thumb-sized targets.** 44px minimum on buttons, 48px on the tab bar, and homework and
  subject rows open for editing when tapped anywhere along the row.
- **Safe areas.** Notch and home-indicator insets are respected in the header, the tab bar
  and inside sheets.
- **Nothing scrolls sideways.** Long subject names truncate, wide rows wrap.

## Notifications

Tap the bell in the header (it carries a red dot until reminders are on), or
*Turn on notifications* in Setup, to grant permission. The app then schedules:

- homework reminders ahead of the due time (default: 17:00 the day before, and two
  hours before), at the due time itself, and a nudge at 08:00 each morning it stays
  outstanding;
- a daily plan reminder at your chosen time, listing what is outstanding and how much
  study is planned;
- a 10-minute warning before each planned study block;
- a Sunday-evening summary of the week and the weeks left to the exams;
- focus/break alerts from the timer.

How they are delivered, in order of preference:

1. **Scheduled notifications** (`TimestampTrigger`) where the browser supports them —
   these fire at the right moment even with the app closed.
2. **Background sync** — the service worker is registered for `periodicsync` and checks
   the reminder queue when the browser wakes it (Chrome on Android, installed PWAs).
3. **Foreground catch-up** — whenever the app is open or you return to it, anything
   ripe in the last six hours fires immediately.

The reminder queue lives in IndexedDB (`store.js`), which is why both the page and the
service worker can read it.

### Server push

`sw.js` has a `push` handler, so true server-sent Web Push works if you ever put a
backend behind it: subscribe with `registration.pushManager.subscribe()` using your
VAPID public key, store the subscription, and POST
`{ "title": "...", "body": "...", "view": "homework" }` to it. Without a server there is
nothing to push from — which is why the scheduling above is done on the device instead.

### Phone notes

- **Android/Chrome**: install from the browser menu (*Install app*), then allow
  notifications. Background reminders work best once installed.
- **iPhone/Safari**: Share → *Add to Home Screen*, then open it from the home screen and
  allow notifications. iOS 16.4 or later is required, and iOS only delivers
  notifications to installed web apps.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | App shell and the six views |
| `app.css` | Styling: design tokens, light and dark, mobile first |
| `app.js` | State, rendering, timetable, planner, syllabus, timer, reminder scheduling |
| `syllabus.js` | The specification catalogue: strands, topics, exam weights, common textbooks |
| `store.js` | IndexedDB reminder queue shared with the service worker |
| `sw.js` | Offline cache, background reminders, notification clicks, push |
| `manifest.webmanifest` | Install metadata |

## Data

Nothing leaves the device. Setup → *Export backup* writes a JSON file; *Import backup*
restores it on another phone or browser. Clearing site data wipes everything, so export
before you switch device.

The default exam date is worked out as the Wednesday after the June bank holiday
Monday, which is when the Leaving Cert normally starts — change it in Setup once the
SEC confirms the real date.
