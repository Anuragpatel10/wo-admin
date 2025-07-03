"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _designSystem = require("@adminjs/design-system");
var _utils = require("../../../../utils");
var _convertToSubProperty = require("./convert-to-sub-property");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Show = props => {
  const {
    property,
    record,
    ItemComponent
  } = props;
  const items = _utils.flat.get(record.params, property.path) || [];
  return /*#__PURE__*/_react.default.createElement(_designSystem.ValueGroup, {
    label: property.label
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Section, null, (items || []).map((item, i) => {
    const itemProperty = (0, _convertToSubProperty.convertToSubProperty)(property, i);
    return /*#__PURE__*/_react.default.createElement(ItemComponent, _extends({}, props, {
      key: itemProperty.path,
      property: itemProperty
    }));
  })));
};
var _default = exports.default = (0, _allowOverride.default)(Show, 'DefaultArrayShowProperty');