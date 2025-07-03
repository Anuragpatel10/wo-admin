"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Show = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireDefault(require("react"));
var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));
var _utils = require("../../utils");
var _actionHeader = _interopRequireDefault(require("../app/action-header/action-header"));
var _propertyType = _interopRequireDefault(require("../property-type"));
var _layoutElementRenderer = _interopRequireDefault(require("./utils/layout-element-renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * @name ShowAction
 * @category Actions
 * @description Shows a given record.
 * @component
 * @private
 */
const Show = props => {
  const {
    resource,
    record,
    action
  } = props;
  const properties = resource.showProperties;
  const contentTag = (0, _utils.getActionElementCss)(resource.id, action.name, 'drawer-content');
  return /*#__PURE__*/_react.default.createElement(_designSystem.DrawerContent, {
    "data-css": contentTag
  }, action !== null && action !== void 0 && action.showInDrawer ? /*#__PURE__*/_react.default.createElement(_actionHeader.default, props) : null, action.layout ? action.layout.map((layoutElement, i) => /*#__PURE__*/_react.default.createElement(_layoutElementRenderer.default
  // eslint-disable-next-line react/no-array-index-key
  , _extends({
    key: i,
    layoutElement: layoutElement
  }, props, {
    where: "show"
  }))) : properties.map(property => /*#__PURE__*/_react.default.createElement(_propertyType.default, {
    key: property.propertyPath,
    where: "show",
    property: property,
    resource: resource,
    record: record
  })));
};
const OverridableShow = exports.Show = exports.default = (0, _allowOverride.default)(Show, 'DefaultShowAction');