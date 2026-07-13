const path = require("node:path");
const esbuild = require("esbuild");

const projectRoot = path.resolve(__dirname, "..");
const outfile = path.join(projectRoot, "modules", "dxf", "vendor", "concaveman.global.js");

esbuild.build({
  absWorkingDir: projectRoot,
  entryPoints: ["concaveman"],
  outfile,
  bundle: true,
  platform: "browser",
  format: "iife",
  globalName: "Concaveman",
  target: ["es2022"],
  minify: true,
  sourcemap: false,
  legalComments: "none",
  banner: {
    js: "/* concaveman 2.0.0 and dependencies; see THIRD_PARTY_NOTICES.md */",
  },
  logLevel: "info",
}).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
