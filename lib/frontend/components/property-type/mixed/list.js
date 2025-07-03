"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _designSystem = require("@adminjs/design-system");
var _viewHelpers = _interopRequireDefault(require("../../../../backend/utils/view-helpers/view-helpers"));
var _convertToSubProperty = require("./convert-to-sub-property");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const List = props => {
  const {
    property,
    record,
    resource,
    ItemComponent
  } = props;
  const renderItems = () => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, property.subProperties.filter(subProperty => !subProperty.isId).map(subProperty => {
    const subPropertyWithPath = (0, _convertToSubProperty.convertToSubProperty)(property, subProperty);
    return /*#__PURE__*/_react.default.createElement("div", {
      key: subPropertyWithPath.path
    }, /*#__PURE__*/_react.default.createElement(_designSystem.Label, {
      inline: true
    }, `${subProperty.label}: `), /*#__PURE__*/_react.default.createElement(ItemComponent, _extends({}, props, {
      property: subPropertyWithPath
    })));
  }));
  const showAction = record.recordActions.find(a => a.name === 'show');
  if (resource.titleProperty.propertyPath === property.propertyPath && showAction) {
    const h = new _viewHelpers.default();
    const href = h.recordActionUrl({
      resourceId: resource.id,
      recordId: record.id,
      actionName: 'show'
    });
    return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: href
    }, renderItems());
  }
  return renderItems();
};
var _default = exports.default = (0, _allowOverride.default)(List, 'DefaultMixedListProperty');