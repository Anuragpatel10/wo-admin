"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PropertyLabel = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireDefault(require("react"));
var _propertyDescription = require("../property-description");
var _allowOverride = _interopRequireDefault(require("../../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PropertyLabel = props => {
  const {
    property,
    props: labelProps
  } = props;
  if (property.hideLabel) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_designSystem.Label, _extends({
    htmlFor: property.path,
    required: property.isRequired
  }, labelProps), property.label, property.description && /*#__PURE__*/_react.default.createElement(_propertyDescription.PropertyDescription, {
    property: property
  }));
};
const OverridablePropertyLabel = exports.PropertyLabel = exports.default = (0, _allowOverride.default)(PropertyLabel, 'PropertyLabel');