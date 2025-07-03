"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var path = _interopRequireWildcard(require("path"));
var _slash = _interopRequireDefault(require("slash"));
var _adminjs = _interopRequireDefault(require("../../adminjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * Generates entry file for all UsersComponents.
 * Entry consists of 3 parts:
 * 1. Setup AdminJS.UserComponents map.
 * 2. List of all environmental variables passed to AdminJS in configuration option.
 * 3. Imports of user components defined by ComponentLoader.
 *
 * @param {AdminJS}    admin
 * @param {String}      entryPath  path to folder where entry file is located
 * @return {String}     content of an entry file
 *
 * @private
 */
const generateUserComponentEntry = (admin, entryPath) => {
  const {
    env = {}
  } = admin.options;
  admin.componentLoader.__unsafe_merge(_adminjs.default.__unsafe_staticComponentLoader);
  const components = admin.componentLoader.getComponents();
  const absoluteEntryPath = path.resolve(entryPath);
  const setupPart = 'AdminJS.UserComponents = {}\n';
  const envPart = Object.keys(env).map(envKey => `AdminJS.env.${envKey} = ${JSON.stringify(env[envKey])}\n`).join('');
  const componentsPart = Object.keys(components || {}).map(componentId => {
    const componentUrl = path.relative(absoluteEntryPath, components[componentId]);
    return [`import ${componentId} from '${(0, _slash.default)(componentUrl)}'`, `AdminJS.UserComponents.${componentId} = ${componentId}`].join('\n');
  }).join('\n');
  return setupPart + envPart + componentsPart;
};
var _default = exports.default = generateUserComponentEntry;