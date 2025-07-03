"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _designSystem = require("@adminjs/design-system");
var _propertyLabel = require("../utils/property-label");
var _convertToSubProperty = require("./convert-to-sub-property");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Edit = props => {
  const {
    property,
    record,
    ItemComponent
  } = props;
  const error = record.errors && record.errors[property.path];
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: !!error
  }, /*#__PURE__*/_react.default.createElement(_propertyLabel.PropertyLabel, {
    property: property
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Section, property.props, property.subProperties.filter(subProperty => !subProperty.isId).map(subProperty => {
    const subPropertyWithPath = (0, _convertToSubProperty.convertToSubProperty)(property, subProperty);
    return /*#__PURE__*/_react.default.createElement(ItemComponent, _extends({}, props, {
      key: subPropertyWithPath.path,
      property: subPropertyWithPath
    }));
  })), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error && error.message));
};
var _default = exports.default = (0, _allowOverride.default)(Edit, 'DefaultMixedEditProperty');