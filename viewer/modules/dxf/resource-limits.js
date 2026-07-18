(function exposeDxfResourceLimits(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.DxfResourceLimits = api;
}(typeof globalThis !== "undefined" ? globalThis : this, () => {
  "use strict";

  const LIMITS = Object.freeze({
    MAX_FILE_BYTES: 64 * 1024 * 1024,
    MAX_TEXT_CHARS: 64 * 1024 * 1024,
    MAX_LINES: 500_000,
    MAX_PAIRS: 250_000,
    MAX_PAIR_CODE_CHARS: 32,
    MAX_PAIR_VALUE_CHARS: 1024 * 1024,
    MAX_ENTITIES: 50_000,
    MAX_FEATURES: 5_000,
    MAX_POINTS: 250_000,
    MAX_BLOCKS: 5_000,
    MAX_ANNOTATION_CHARS: 2 * 1024 * 1024,
    MAX_CURVE_SAMPLES_PER_ENTITY: 4_096,
    MAX_SPLINE_DEGREE: 32,
    MAX_ENDPOINT_COMPARISONS: 2_000_000,
    MAX_OUTPUT_CHARS: 96 * 1024 * 1024,
    MAX_OUTPUT_BYTES: 96 * 1024 * 1024,
    MAX_UNDO_SNAPSHOTS: 20,
    MAX_UNDO_CHARS: 32 * 1024 * 1024,
    MAX_FOLDER_FILES: 20_000,
  });

  class DxfResourceLimitError extends Error {
    constructor(code, message) {
      super(`DXF resource limit exceeded: ${message}`);
      this.name = "DxfResourceLimitError";
      this.code = `DXF_LIMIT_${code}`;
    }
  }

  function fail(code, label, maximum) {
    throw new DxfResourceLimitError(code, `${label} is limited to ${maximum.toLocaleString("en-US")}.`);
  }

  function assertCount(value, maximum, code, label) {
    if (!Number.isSafeInteger(value) || value < 0 || value > maximum) {
      fail(code, label, maximum);
    }
    return value;
  }

  function countLogicalLines(text) {
    let lines = 1;
    for (let i = 0; i < text.length; i++) {
      if (text.charCodeAt(i) === 10 || (text.charCodeAt(i) === 13 && text.charCodeAt(i + 1) !== 10)) {
        lines++;
        if (lines > LIMITS.MAX_LINES) fail("LINES", "DXF line count", LIMITS.MAX_LINES);
      }
    }
    return lines;
  }

  function assertInputText(text) {
    if (typeof text !== "string") throw new TypeError("DXF content must be text.");
    assertCount(text.length, LIMITS.MAX_TEXT_CHARS, "TEXT_CHARS", "DXF text characters");
    const lines = countLogicalLines(text);
    const pairs = Math.ceil(lines / 2);
    assertCount(pairs, LIMITS.MAX_PAIRS, "PAIRS", "DXF code/value pairs");
    return { lines, pairs };
  }

  function assertFileBytes(bytes) {
    return assertCount(bytes, LIMITS.MAX_FILE_BYTES, "FILE_BYTES", "DXF input bytes");
  }

  function assertOutputBytes(bytes) {
    return assertCount(bytes, LIMITS.MAX_OUTPUT_BYTES, "OUTPUT_BYTES", "DXF output bytes");
  }

  function assertOutputText(text) {
    if (typeof text !== "string") throw new TypeError("DXF content must be text.");
    return assertCount(text.length, LIMITS.MAX_OUTPUT_CHARS, "OUTPUT_CHARS", "DXF output characters");
  }

  function assertPairCount(count) {
    return assertCount(count, LIMITS.MAX_PAIRS, "PAIRS", "DXF code/value pairs");
  }

  function assertPairFieldLengths(codeChars, valueChars) {
    assertCount(codeChars, LIMITS.MAX_PAIR_CODE_CHARS, "PAIR_CODE_CHARS", "DXF group-code characters");
    assertCount(valueChars, LIMITS.MAX_PAIR_VALUE_CHARS, "PAIR_VALUE_CHARS", "characters in one DXF value");
  }

  function assertFeatureCount(count) {
    return assertCount(count, LIMITS.MAX_FEATURES, "FEATURES", "disconnected drawing features");
  }

  function assertFolderFileCount(count) {
    return assertCount(count, LIMITS.MAX_FOLDER_FILES, "FOLDER_FILES", "DXF files in one folder");
  }

  function assertCurveSamples(count) {
    return assertCount(count, LIMITS.MAX_CURVE_SAMPLES_PER_ENTITY, "CURVE_SAMPLES", "curve samples per entity");
  }

  function assertSplineDegree(degree) {
    return assertCount(degree, LIMITS.MAX_SPLINE_DEGREE, "SPLINE_DEGREE", "spline degree");
  }

  function createParseBudget() {
    return { entities: 0, points: 0, blocks: 0, annotationChars: 0 };
  }

  function consume(budget, key, amount, maximum, code, label) {
    if (!budget || !Number.isSafeInteger(amount) || amount < 0) throw new TypeError("Invalid DXF resource budget.");
    const next = budget[key] + amount;
    assertCount(next, maximum, code, label);
    budget[key] = next;
    return next;
  }

  function claimEntity(budget, amount = 1) {
    return consume(budget, "entities", amount, LIMITS.MAX_ENTITIES, "ENTITIES", "parsed and expanded entities");
  }

  function claimPoints(budget, amount = 1) {
    return consume(budget, "points", amount, LIMITS.MAX_POINTS, "POINTS", "parsed and generated geometry points");
  }

  function claimBlock(budget, amount = 1) {
    return consume(budget, "blocks", amount, LIMITS.MAX_BLOCKS, "BLOCKS", "block definitions");
  }

  function claimAnnotationChars(budget, amount) {
    return consume(
      budget,
      "annotationChars",
      amount,
      LIMITS.MAX_ANNOTATION_CHARS,
      "ANNOTATION_CHARS",
      "annotation characters",
    );
  }

  function createComparisonBudget() {
    return { comparisons: 0 };
  }

  function claimEndpointComparisons(budget, amount = 1) {
    return consume(
      budget,
      "comparisons",
      amount,
      LIMITS.MAX_ENDPOINT_COMPARISONS,
      "ENDPOINT_COMPARISONS",
      "endpoint proximity comparisons",
    );
  }

  function createOutputBudget() {
    return { chars: 0 };
  }

  function claimOutputPair(budget, code, value) {
    const amount = String(code ?? "").length + String(value ?? "").length + 4;
    return consume(
      budget,
      "chars",
      amount,
      LIMITS.MAX_OUTPUT_CHARS,
      "OUTPUT_CHARS",
      "DXF output characters",
    );
  }

  return Object.freeze({
    LIMITS,
    DxfResourceLimitError,
    assertCount,
    assertInputText,
    assertFileBytes,
    assertOutputBytes,
    assertOutputText,
    assertPairCount,
    assertPairFieldLengths,
    assertFeatureCount,
    assertFolderFileCount,
    assertCurveSamples,
    assertSplineDegree,
    createParseBudget,
    claimEntity,
    claimPoints,
    claimBlock,
    claimAnnotationChars,
    createComparisonBudget,
    claimEndpointComparisons,
    createOutputBudget,
    claimOutputPair,
  });
}));
