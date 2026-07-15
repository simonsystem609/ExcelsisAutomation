const DEFAULT_PROMOTION_MIN_MS = 60 * 1000;
const DEFAULT_MAX_SAMPLE_MS = 15 * 1000;
const DEFAULT_MAX_PENDING_MS = 24 * 60 * 60 * 1000;
const DEFAULT_MAX_SESSIONS = 32;

function cleanIdentityPart(value) {
  return String(value || "").trim();
}

class UnsavedWorkTracker {
  constructor(options = {}) {
    this.promotionMinMs = Math.max(1, Number(options.promotionMinMs || DEFAULT_PROMOTION_MIN_MS));
    this.maxSampleMs = Math.max(1, Number(options.maxSampleMs || DEFAULT_MAX_SAMPLE_MS));
    this.maxPendingMs = Math.max(this.promotionMinMs, Number(options.maxPendingMs || DEFAULT_MAX_PENDING_MS));
    this.maxSessions = Math.max(1, Math.round(Number(options.maxSessions || DEFAULT_MAX_SESSIONS)));
    this.pending = new Map();
    this.watcherSessionId = "";
    this.lastSample = { at: 0, key: "", counting: false };
  }

  reset() {
    const clearedSessions = this.pending.size;
    const clearedMs = Array.from(this.pending.values()).reduce(
      (sum, entry) => sum + Math.max(0, Number(entry.totalMs || 0)),
      0,
    );
    this.pending.clear();
    this.watcherSessionId = "";
    this.lastSample = { at: 0, key: "", counting: false };
    return { clearedSessions, clearedMs };
  }

  snapshot() {
    return {
      watcherSessionId: this.watcherSessionId,
      pending: Array.from(this.pending.values()).map((entry) => ({ ...entry })),
      lastSample: { ...this.lastSample },
    };
  }

  observe(input = {}) {
    const now = Number.isFinite(Number(input.now)) ? Number(input.now) : Date.now();
    const fromWatcher = input.fromWatcher === true;
    const connected = input.connected !== false;
    const watcherSessionId = cleanIdentityPart(input.watcherSessionId);

    if (!connected) {
      const cleared = this.reset();
      return { kind: "none", reason: "disconnected", ...cleared };
    }

    if (fromWatcher && watcherSessionId) {
      if (this.watcherSessionId && this.watcherSessionId !== watcherSessionId) {
        this.pending.clear();
        this.lastSample = { at: 0, key: "", counting: false };
      }
      this.watcherSessionId = watcherSessionId;
    }

    const documentToken = cleanIdentityPart(input.documentToken);
    const trustedIdentity = Boolean(
      fromWatcher
      && watcherSessionId
      && documentToken
      && input.identityTrusted === true,
    );
    if (!trustedIdentity) {
      this.lastSample = { at: now, key: "", counting: false };
      return { kind: "none", reason: "untrusted-identity" };
    }

    const key = `${watcherSessionId}\u0000${documentToken}`;
    const hasActiveDocument = input.hasActiveDocument === true;
    const docPath = String(input.docPath || "").trim();
    if (!hasActiveDocument) {
      this.lastSample = { at: now, key: "", counting: false };
      return { kind: "none", reason: "no-active-document", key };
    }

    if (!docPath) {
      const entry = this.getOrCreateEntry(key, {
        watcherSessionId,
        documentToken,
        docTitle: input.docTitle,
        docType: input.docType,
        now,
      });
      const elapsedMs = this.sampleElapsedMs(key, now, input.shouldCount === true);
      entry.totalMs = Math.min(this.maxPendingMs, entry.totalMs + elapsedMs);
      entry.lastSeenAt = now;
      entry.docTitle = String(input.docTitle || entry.docTitle || "").trim();
      entry.docType = String(input.docType || entry.docType || "").trim();
      return {
        kind: "unsaved",
        key,
        elapsedMs,
        pendingMs: entry.totalMs,
        promotionMinMs: this.promotionMinMs,
        shouldCount: input.shouldCount === true,
        docTitle: entry.docTitle,
        docType: entry.docType,
      };
    }

    const entry = this.pending.get(key);
    if (!entry) {
      this.lastSample = { at: now, key: "", counting: false };
      return { kind: "none", reason: "saved-without-pending", key };
    }

    const elapsedMs = this.sampleElapsedMs(key, now, input.shouldCount === true);
    entry.totalMs = Math.min(this.maxPendingMs, entry.totalMs + elapsedMs);
    entry.lastSeenAt = now;
    this.lastSample = { at: now, key: "", counting: false };

    if (entry.totalMs < this.promotionMinMs) {
      this.pending.delete(key);
      return {
        kind: "discard",
        reason: "below-minimum",
        key,
        elapsedMs,
        discardedMs: entry.totalMs,
        promotionMinMs: this.promotionMinMs,
      };
    }

    if (input.eligibleSavedPath !== true) {
      return {
        kind: "held-ineligible",
        reason: "saved-path-ineligible",
        key,
        elapsedMs,
        pendingMs: entry.totalMs,
        promotionMinMs: this.promotionMinMs,
      };
    }

    this.pending.delete(key);
    return {
      kind: "promote",
      key,
      elapsedMs,
      promoteMs: entry.totalMs,
      promotionMinMs: this.promotionMinMs,
      docTitle: entry.docTitle,
      docType: entry.docType,
    };
  }

  sampleElapsedMs(key, now, shouldCount) {
    const previous = this.lastSample;
    const elapsedMs = shouldCount
      && previous.counting
      && previous.at > 0
      && previous.key === key
      ? Math.max(0, Math.min(this.maxSampleMs, now - previous.at))
      : 0;
    this.lastSample = { at: now, key, counting: shouldCount };
    return elapsedMs;
  }

  getOrCreateEntry(key, details) {
    let entry = this.pending.get(key);
    if (entry) return entry;

    if (this.pending.size >= this.maxSessions) {
      let oldestKey = "";
      let oldestAt = Number.POSITIVE_INFINITY;
      for (const [candidateKey, candidate] of this.pending.entries()) {
        const candidateAt = Number(candidate.lastSeenAt || candidate.firstSeenAt || 0);
        if (candidateAt < oldestAt) {
          oldestAt = candidateAt;
          oldestKey = candidateKey;
        }
      }
      if (oldestKey) this.pending.delete(oldestKey);
    }

    entry = {
      key,
      watcherSessionId: details.watcherSessionId,
      documentToken: details.documentToken,
      docTitle: String(details.docTitle || "").trim(),
      docType: String(details.docType || "").trim(),
      totalMs: 0,
      firstSeenAt: details.now,
      lastSeenAt: details.now,
    };
    this.pending.set(key, entry);
    return entry;
  }
}

module.exports = {
  DEFAULT_PROMOTION_MIN_MS,
  DEFAULT_MAX_SAMPLE_MS,
  DEFAULT_MAX_PENDING_MS,
  DEFAULT_MAX_SESSIONS,
  UnsavedWorkTracker,
};
