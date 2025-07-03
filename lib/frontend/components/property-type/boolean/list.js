"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _booleanPropertyValue = _interopRequireDefault(require("./boolean-property-value"));
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const List = props => /*#__PURE__*/_react.default.createElement(_booleanPropertyValue.default, props);
var _default = exports.default = (0, _allowOverride.default)(List, 'DefaultBooleanListProperty');