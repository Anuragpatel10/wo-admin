"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ConfigurationError = void 0;
var _errorType = require("../../../utils/error-type.enum");
var CONSTANTS = _interopRequireWildcard(require("../../../constants"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const buildUrl = page => `${CONSTANTS.DOCS}/${page}`;

/**
 * Error which is thrown when user messed up something in the configuration
 *
 * @category Errors
 */
class ConfigurationError extends Error {
  /**
   * @param   {string}  fnName  name of the function, base on which error will
   * print on the output link to the method documentation.
   * @param {string} message
   */
  constructor(message, fnName) {
    const msg = `
    ${message}
    More information can be found at: ${buildUrl(fnName)}
    `;
    super(msg);
    this.message = msg;
    this.name = _errorType.ErrorTypeEnum.Configuration;
  }
}
exports.ConfigurationError = ConfigurationError;
var _default = exports.default = ConfigurationError;