"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../backend/utils");
var _login = _interopRequireDefault(require("./components/login"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const html = async (admin, {
  action,
  errorMessage
}) => (0, _utils.getComponentHtml)(_login.default, {
  action,
  message: errorMessage
}, admin);
var _default = exports.default = html;