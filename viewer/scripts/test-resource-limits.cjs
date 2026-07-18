const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const guards = require("../modules/dxf/resource-limits.js");

const { LIMITS } = guards;

const browserContext = {};
vm.createContext(browserContext);
vm.runInContext(
  fs.readFileSync(path.join(__dirname, "..", "modules", "dxf", "resource-limits.js"), "utf8"),
  browserContext,
);
assert.equal(browserContext.DxfResourceLimits?.LIMITS?.MAX_FILE_BYTES, LIMITS.MAX_FILE_BYTES);

function expectLimit(code, callback) {
  assert.throws(callback, (error) => (
    error instanceof guards.DxfResourceLimitError
    && error.code === `DXF_LIMIT_${code}`
    && /DXF resource limit exceeded/.test(error.message)
  ));
}

assert.equal(guards.assertFileBytes(LIMITS.MAX_FILE_BYTES), LIMITS.MAX_FILE_BYTES);
expectLimit("FILE_BYTES", () => guards.assertFileBytes(LIMITS.MAX_FILE_BYTES + 1));
assert.equal(guards.assertOutputBytes(LIMITS.MAX_OUTPUT_BYTES), LIMITS.MAX_OUTPUT_BYTES);
expectLimit("OUTPUT_BYTES", () => guards.assertOutputBytes(LIMITS.MAX_OUTPUT_BYTES + 1));
assert.equal(guards.assertFolderFileCount(LIMITS.MAX_FOLDER_FILES), LIMITS.MAX_FOLDER_FILES);
expectLimit("FOLDER_FILES", () => guards.assertFolderFileCount(LIMITS.MAX_FOLDER_FILES + 1));

const lineBoundary = "\n".repeat(LIMITS.MAX_LINES - 1);
assert.deepEqual(guards.assertInputText(lineBoundary), {
  lines: LIMITS.MAX_LINES,
  pairs: LIMITS.MAX_PAIRS,
});
expectLimit("LINES", () => guards.assertInputText(`${lineBoundary}\n`));
expectLimit("TEXT_CHARS", () => guards.assertInputText("x".repeat(LIMITS.MAX_TEXT_CHARS + 1)));
assert.deepEqual(guards.assertInputText("0\r\nSECTION\r\n"), { lines: 3, pairs: 2 });
assert.deepEqual(guards.assertInputText("0\rSECTION\r"), { lines: 3, pairs: 2 });
guards.assertPairFieldLengths(LIMITS.MAX_PAIR_CODE_CHARS, LIMITS.MAX_PAIR_VALUE_CHARS);
expectLimit("PAIR_CODE_CHARS", () => guards.assertPairFieldLengths(LIMITS.MAX_PAIR_CODE_CHARS + 1, 0));
expectLimit("PAIR_VALUE_CHARS", () => guards.assertPairFieldLengths(0, LIMITS.MAX_PAIR_VALUE_CHARS + 1));
assert.equal(guards.assertFeatureCount(LIMITS.MAX_FEATURES), LIMITS.MAX_FEATURES);
expectLimit("FEATURES", () => guards.assertFeatureCount(LIMITS.MAX_FEATURES + 1));

const entityBudget = guards.createParseBudget();
guards.claimEntity(entityBudget, LIMITS.MAX_ENTITIES);
expectLimit("ENTITIES", () => guards.claimEntity(entityBudget));

const pointBudget = guards.createParseBudget();
guards.claimPoints(pointBudget, LIMITS.MAX_POINTS);
expectLimit("POINTS", () => guards.claimPoints(pointBudget));

const blockBudget = guards.createParseBudget();
guards.claimBlock(blockBudget, LIMITS.MAX_BLOCKS);
expectLimit("BLOCKS", () => guards.claimBlock(blockBudget));

const annotationBudget = guards.createParseBudget();
guards.claimAnnotationChars(annotationBudget, LIMITS.MAX_ANNOTATION_CHARS);
expectLimit("ANNOTATION_CHARS", () => guards.claimAnnotationChars(annotationBudget, 1));

assert.equal(
  guards.assertCurveSamples(LIMITS.MAX_CURVE_SAMPLES_PER_ENTITY),
  LIMITS.MAX_CURVE_SAMPLES_PER_ENTITY,
);
expectLimit("CURVE_SAMPLES", () => guards.assertCurveSamples(LIMITS.MAX_CURVE_SAMPLES_PER_ENTITY + 1));
assert.equal(guards.assertSplineDegree(LIMITS.MAX_SPLINE_DEGREE), LIMITS.MAX_SPLINE_DEGREE);
expectLimit("SPLINE_DEGREE", () => guards.assertSplineDegree(LIMITS.MAX_SPLINE_DEGREE + 1));

const comparisonBudget = guards.createComparisonBudget();
guards.claimEndpointComparisons(comparisonBudget, LIMITS.MAX_ENDPOINT_COMPARISONS);
expectLimit("ENDPOINT_COMPARISONS", () => guards.claimEndpointComparisons(comparisonBudget));

const outputBudget = guards.createOutputBudget();
guards.claimOutputPair(outputBudget, "0", "EOF");
assert.equal(outputBudget.chars, 8);
expectLimit("OUTPUT_CHARS", () => guards.assertOutputText("x".repeat(LIMITS.MAX_OUTPUT_CHARS + 1)));

console.log("DXF resource-limit boundary and adversarial tests passed.");
