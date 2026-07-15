const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  DEFAULT_PROMOTION_MIN_MS,
  UnsavedWorkTracker,
} = require("../worklogger-unsaved.cjs");

function input(overrides = {}) {
  return {
    now: 1000,
    fromWatcher: true,
    connected: true,
    watcherSessionId: "watcher-1",
    hasActiveDocument: true,
    documentToken: "d1",
    identityTrusted: true,
    docPath: "",
    docTitle: "Part4.SLDPRT",
    docType: "1",
    shouldCount: true,
    eligibleSavedPath: false,
    ...overrides,
  };
}

function accrue(tracker, startAt, intervals, overrides = {}) {
  let now = startAt;
  let result = tracker.observe(input({ now, ...overrides }));
  for (const interval of intervals) {
    now += interval;
    result = tracker.observe(input({ now, ...overrides }));
  }
  return { now, result };
}

{
  const tracker = new UnsavedWorkTracker();
  const { now, result } = accrue(tracker, 1000, [10000, 10000, 10000, 10000, 10000, 10000]);
  assert.equal(result.kind, "unsaved");
  assert.equal(result.pendingMs, DEFAULT_PROMOTION_MIN_MS);
  const promoted = tracker.observe(input({
    now,
    docPath: "C:\\CompanyProjects\\PRJ-26-001\\RealName.SLDPRT",
    docTitle: "RealName.SLDPRT",
    eligibleSavedPath: true,
  }));
  assert.equal(promoted.kind, "promote");
  assert.equal(promoted.promoteMs, DEFAULT_PROMOTION_MIN_MS);
  assert.equal(promoted.docTitle, "Part4.SLDPRT");
  assert.equal(tracker.snapshot().pending.length, 0);
  assert.equal(tracker.observe(input({
    now: now + 2500,
    docPath: "C:\\CompanyProjects\\PRJ-26-001\\RealName.SLDPRT",
    eligibleSavedPath: true,
  })).kind, "none");
}

{
  const tracker = new UnsavedWorkTracker();
  const { now, result } = accrue(tracker, 1000, [10000, 10000, 10000, 10000, 10000, 9999]);
  assert.equal(result.pendingMs, 59999);
  const discarded = tracker.observe(input({
    now,
    docPath: "C:\\CompanyProjects\\PRJ-26-001\\Brief.SLDPRT",
    eligibleSavedPath: true,
  }));
  assert.equal(discarded.kind, "discard");
  assert.equal(discarded.discardedMs, 59999);
}

{
  const tracker = new UnsavedWorkTracker();
  tracker.observe(input({ now: 1000 }));
  const capped = tracker.observe(input({ now: 61000 }));
  assert.equal(capped.elapsedMs, 15000);
  assert.equal(capped.pendingMs, 15000);
}

{
  const tracker = new UnsavedWorkTracker();
  tracker.observe(input({ now: 1000 }));
  assert.equal(tracker.observe(input({ now: 11000 })).pendingMs, 10000);
  assert.equal(tracker.observe(input({ now: 21000, shouldCount: false })).pendingMs, 10000);
  assert.equal(tracker.observe(input({ now: 31000 })).pendingMs, 10000);
  assert.equal(tracker.observe(input({ now: 41000 })).pendingMs, 20000);
}

{
  const tracker = new UnsavedWorkTracker();
  let now = 1000;
  tracker.observe(input({ now, documentToken: "d1" }));
  for (let i = 0; i < 3; i += 1) {
    now += 10000;
    tracker.observe(input({ now, documentToken: "d1" }));
  }
  tracker.observe(input({ now, documentToken: "d2", docTitle: "Part5.SLDPRT" }));
  for (let i = 0; i < 2; i += 1) {
    now += 10000;
    tracker.observe(input({ now, documentToken: "d2", docTitle: "Part5.SLDPRT" }));
  }
  tracker.observe(input({ now, documentToken: "d1" }));
  for (let i = 0; i < 3; i += 1) {
    now += 10000;
    tracker.observe(input({ now, documentToken: "d1" }));
  }
  const pending = tracker.snapshot().pending;
  assert.equal(pending.find((entry) => entry.documentToken === "d1").totalMs, 60000);
  assert.equal(pending.find((entry) => entry.documentToken === "d2").totalMs, 20000);
  assert.equal(tracker.observe(input({
    now,
    documentToken: "d3",
    docPath: "C:\\CompanyProjects\\PRJ-26-001\\Wrong.SLDPRT",
    eligibleSavedPath: true,
  })).kind, "none");
  assert.equal(tracker.snapshot().pending.length, 2);
}

{
  const tracker = new UnsavedWorkTracker();
  const { now } = accrue(tracker, 1000, [10000, 10000, 10000, 10000, 10000, 10000]);
  const held = tracker.observe(input({
    now,
    docPath: "C:\\Temp\\RealName.SLDPRT",
    eligibleSavedPath: false,
  }));
  assert.equal(held.kind, "held-ineligible");
  assert.equal(held.pendingMs, 60000);
  const promoted = tracker.observe(input({
    now: now + 2500,
    docPath: "C:\\CompanyProjects\\PRJ-26-001\\RealName.SLDPRT",
    eligibleSavedPath: true,
  }));
  assert.equal(promoted.kind, "promote");
  assert.equal(promoted.promoteMs, 60000);
}

{
  const tracker = new UnsavedWorkTracker();
  const { now } = accrue(tracker, 1000, [10000, 10000, 10000, 10000, 10000, 10000]);
  const fallback = tracker.observe(input({
    now: now + 6000,
    fromWatcher: false,
    watcherSessionId: "",
    documentToken: "",
    identityTrusted: false,
    docPath: "C:\\CompanyProjects\\PRJ-26-001\\RealName.SLDPRT",
    eligibleSavedPath: true,
  }));
  assert.equal(fallback.kind, "none");
  assert.equal(tracker.snapshot().pending.length, 1);
  const promoted = tracker.observe(input({
    now: now + 8500,
    docPath: "C:\\CompanyProjects\\PRJ-26-001\\RealName.SLDPRT",
    eligibleSavedPath: true,
  }));
  assert.equal(promoted.kind, "promote");
  assert.equal(promoted.promoteMs, 60000);
}

{
  const tracker = new UnsavedWorkTracker();
  accrue(tracker, 1000, [10000, 10000]);
  tracker.observe(input({ now: 31000, watcherSessionId: "watcher-2", documentToken: "d1" }));
  const snapshot = tracker.snapshot();
  assert.equal(snapshot.watcherSessionId, "watcher-2");
  assert.equal(snapshot.pending.length, 1);
  assert.equal(snapshot.pending[0].totalMs, 0);
  const reset = tracker.reset();
  assert.equal(reset.clearedSessions, 1);
  assert.equal(tracker.snapshot().pending.length, 0);
}

const root = path.join(__dirname, "..");
const watcher = fs.readFileSync(path.join(root, "scripts", "solidworks-watcher.vbs"), "utf8");
assert.match(watcher, /watcherSessionId/);
assert.match(watcher, /documentToken/);
assert.match(watcher, /identityTrusted/);
assert.match(watcher, /Function DocumentTokenFor\(doc\)/);

const main = fs.readFileSync(path.join(root, "main.cjs"), "utf8");
assert.match(main, /hasActiveCountableDoc \|\| hasExplicitActiveDocument/);
assert.match(main, /addPromotedUnsavedProjectActivityTime/);
assert.match(main, /UNSAVED_PROJECT_ACTIVITY_PROMOTION_MIN_MS/);

console.log("Unsaved Work Logger identity, threshold, promotion, and fail-closed tests passed.");
