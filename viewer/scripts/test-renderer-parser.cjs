const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const resourceLimits = require("../modules/dxf/resource-limits.js");

function noOp() {}

const canvasContext = new Proxy({
  measureText: () => ({ width: 0 }),
}, {
  get(target, property) {
    return property in target ? target[property] : noOp;
  },
});

function createClassList() {
  const values = new Set();
  return {
    add: (...names) => names.forEach((name) => values.add(name)),
    remove: (...names) => names.forEach((name) => values.delete(name)),
    contains: (name) => values.has(name),
    toggle(name, force) {
      const enabled = force === undefined ? !values.has(name) : !!force;
      if (enabled) values.add(name);
      else values.delete(name);
      return enabled;
    },
  };
}

function createElement(tagName = "div") {
  const element = {
    tagName: String(tagName).toUpperCase(),
    classList: createClassList(),
    style: {},
    dataset: {},
    children: [],
    hidden: false,
    disabled: false,
    checked: false,
    open: false,
    value: "",
    textContent: "",
    innerHTML: "",
    width: 1200,
    height: 800,
    addEventListener: noOp,
    removeEventListener: noOp,
    appendChild(child) { this.children.push(child); return child; },
    replaceChildren(...children) { this.children = children; },
    setAttribute: noOp,
    removeAttribute: noOp,
    toggleAttribute: noOp,
    focus: noOp,
    click: noOp,
    close() { this.open = false; },
    showModal() { this.open = true; },
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 1200, height: 800 }),
    getContext: () => canvasContext,
    querySelector: () => null,
    querySelectorAll: () => [],
  };
  return new Proxy(element, {
    get(target, property) {
      if (property in target) return target[property];
      return noOp;
    },
  });
}

const elements = new Map();
const document = {
  body: createElement("body"),
  activeElement: createElement("body"),
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, createElement(id === "canvas" ? "canvas" : "div"));
    return elements.get(id);
  },
  querySelector: () => createElement("div"),
  querySelectorAll: () => [],
  createElement,
  addEventListener: noOp,
};

const windowObject = {
  document,
  DxfResourceLimits: resourceLimits,
  dxfApp: null,
  devicePixelRatio: 1,
  location: { search: "?dxf-test" },
  addEventListener: noOp,
  removeEventListener: noOp,
};
windowObject.window = windowObject;

const context = vm.createContext({
  window: windowObject,
  document,
  console,
  alert: noOp,
  confirm: () => false,
  Blob,
  URL,
  URLSearchParams,
  setTimeout,
  clearTimeout,
  requestAnimationFrame: (callback) => { callback(); return 1; },
  cancelAnimationFrame: noOp,
});

const appSource = fs.readFileSync(path.join(__dirname, "..", "modules", "dxf", "app.js"), "utf8");
const testInstrumentation = `
window.DxfTestApi = Object.freeze({
  summarize(text, { buildFeatureSummary = false } = {}) {
    const doc = parseDxf(text);
    const summary = {
      pairs: doc.pairs.length,
      entities: doc.entities.length,
      supportedEntities: doc.entities.filter((entity) => entity.supported).length,
      virtualEntities: doc.entities.filter((entity) => entity.virtual).length,
      types: doc.entities.map((entity) => entity.type),
      resourceUsage: { ...doc.resourceUsage },
    };
    if (!buildFeatureSummary) return summary;
    const previousDoc = state.doc;
    const previousFeatures = state.features;
    try {
      state.doc = doc;
      buildFeatures();
      summary.features = state.features.map((feature) => ({
        entities: feature.entities.length,
        closed: feature.closed,
        kind: feature.kind,
      }));
      return summary;
    } finally {
      state.doc = previousDoc;
      state.features = previousFeatures;
    }
  },
});
`;
vm.runInContext(`${appSource}\n${testInstrumentation}`, context, {
  filename: "modules/dxf/app.js",
  timeout: 10_000,
});
const api = windowObject.DxfTestApi;
assert.ok(api, "Renderer parser test API was not exposed in test mode.");

function pair(code, value) {
  return `${code}\n${value}`;
}

function line(x1, y1, x2, y2) {
  return [
    pair(0, "LINE"),
    pair(8, "0"),
    pair(10, x1),
    pair(20, y1),
    pair(11, x2),
    pair(21, y2),
  ].join("\n");
}

function drawing(entities, blocks = "") {
  const sections = [];
  if (blocks) sections.push(pair(0, "SECTION"), pair(2, "BLOCKS"), blocks, pair(0, "ENDSEC"));
  sections.push(pair(0, "SECTION"), pair(2, "ENTITIES"), entities, pair(0, "ENDSEC"), pair(0, "EOF"));
  return sections.join("\n");
}

const rectangle = drawing([
  line(0, 0, 10, 0),
  line(10, 0, 10, 5),
  line(10, 5, 0, 5),
  line(0, 5, 0, 0),
].join("\n"));
const rectangleSummary = api.summarize(rectangle, { buildFeatureSummary: true });
assert.equal(rectangleSummary.entities, 4);
assert.equal(rectangleSummary.supportedEntities, 4);
assert.deepEqual(
  JSON.parse(JSON.stringify(rectangleSummary.features)),
  [{ entities: 4, closed: true, kind: "outer" }],
);

const toleranceClosed = api.summarize(drawing([
  line(0, 0, 10, 0),
  line(10.04, 0, 10, 5),
  line(10, 5.04, 0, 5),
  line(0, 5, 0, 0.04),
].join("\n")), { buildFeatureSummary: true });
assert.equal(toleranceClosed.features.length, 1);
assert.equal(toleranceClosed.features[0].closed, true);

const outsideTolerance = api.summarize(drawing([
  line(0, 0, 10, 0),
  line(10.051, 0, 10, 5),
  line(10, 5, 0, 5),
  line(0, 5, 0, 0),
].join("\n")), { buildFeatureSummary: true });
assert.ok(outsideTolerance.features.every((feature) => !feature.closed));

const separatedSummary = api.summarize(
  drawing([line(0, 0, 1, 0), line(10, 0, 11, 0)].join("\n")),
  { buildFeatureSummary: true },
);
assert.equal(separatedSummary.features.length, 2);
assert.ok(separatedSummary.features.every((feature) => !feature.closed));

const blockDefinition = [
  pair(0, "BLOCK"),
  pair(2, "UNIT_LINE"),
  line(0, 0, 1, 0),
  pair(0, "ENDBLK"),
].join("\n");
const inserted = drawing([
  pair(0, "INSERT"),
  pair(2, "UNIT_LINE"),
  pair(10, "5"),
  pair(20, "7"),
].join("\n"), blockDefinition);
const insertSummary = api.summarize(inserted);
assert.equal(insertSummary.entities, 2);
assert.equal(insertSummary.supportedEntities, 1);
assert.equal(insertSummary.virtualEntities, 1);
assert.equal(insertSummary.resourceUsage.entities, 3);

const nonFinite = api.summarize(drawing(line("1e309", 0, 1, 1)));
assert.equal(nonFinite.supportedEntities, 0);

const tooManyFeatures = Array.from(
  { length: resourceLimits.LIMITS.MAX_FEATURES + 1 },
  (_, index) => line(index * 2, 0, index * 2 + 0.5, 0),
).join("\n");
assert.throws(
  () => api.summarize(drawing(tooManyFeatures), { buildFeatureSummary: true }),
  (error) => error?.code === "DXF_LIMIT_FEATURES",
);

const excessiveDegree = drawing([
  pair(0, "SPLINE"),
  pair(70, "0"),
  pair(71, String(resourceLimits.LIMITS.MAX_SPLINE_DEGREE + 1)),
].join("\n"));
assert.throws(
  () => api.summarize(excessiveDegree),
  (error) => error?.code === "DXF_LIMIT_SPLINE_DEGREE",
);

const denseLines = Array.from({ length: 2_001 }, () => line(0, 0, 0, 0)).join("\n");
assert.throws(
  () => api.summarize(drawing(denseLines), { buildFeatureSummary: true }),
  (error) => error?.code === "DXF_LIMIT_ENDPOINT_COMPARISONS",
);

console.log("Renderer DXF parser and spatial-connectivity regression tests passed.");
