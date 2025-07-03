"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _truncate = _interopRequireDefault(require("lodash/truncate"));
var _react = _interopRequireDefault(require("react"));
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const stripHtml = html => {
  const el = window.document.createElement('DIV');
  el.innerHTML = html;
  return el.textContent || el.innerText || '';
};
const List = props => {
  var _property$custom;
  const {
    property,
    record
  } = props;
  const maxLength = ((_property$custom = property.custom) === null || _property$custom === void 0 ? void 0 : _property$custom.maxLength) || 15;
  const value = record.params[property.path] || '';
  const textValue = stripHtml(value);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (0, _truncate.default)(textValue, {
    length: maxLength,
    separator: ' '
  }));
};
var _default = exports.default = (0, _allowOverride.default)(List, 'DefaultReferenceListProperty');