"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;
exports.outPath = void 0;
var fs = _interopRequireWildcard(require("fs"));
var path = _interopRequireWildcard(require("path"));
var util = _interopRequireWildcard(require("util"));
var _bundler = _interopRequireDefault(require("./bundler"));
var _generateUserComponentEntry = _interopRequireDefault(require("./generate-user-component-entry"));
var _constants = require("../../constants");
var _bundlerEnv = _interopRequireDefault(require("./bundler-env"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const entryPath = path.join(_constants.ADMIN_JS_TMP_DIR, '.entry.js');
const outPath = exports.outPath = path.join(_constants.ADMIN_JS_TMP_DIR, 'bundle.js');
async function build(admin, {
  write = false,
  watch = false
} = {}) {
  const {
    options: {
      bundler: bundlerOptions
    }
  } = admin;
  const entryFile = (0, _generateUserComponentEntry.default)(admin, _constants.ADMIN_JS_TMP_DIR);
  try {
    await util.promisify(fs.mkdir)(_constants.ADMIN_JS_TMP_DIR, {
      recursive: true
    });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }

  // if components bundle was requested and there are already bundled - return
  // that instead of bundling them again
  if (!write) {
    try {
      const existingBundle = await util.promisify(fs.readFile)(outPath, 'utf-8');
      return existingBundle;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }
  await util.promisify(fs.writeFile)(entryPath, entryFile);
  const output = await (0, _bundler.default)({
    name: 'AdminJSCustom',
    input: entryPath,
    watch,
    file: write ? outPath : null,
    minify: _bundlerEnv.default === 'production',
    ...bundlerOptions
  });
  let jsOutput = output.code;
  if (output.map) {
    jsOutput += `
//# sourceMappingURL=data:application/json;charset=utf-8;base64,${Buffer.from(JSON.stringify(output.map)).toString('base64')}
    `;
  }
  return jsOutput;
}