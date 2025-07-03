"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LayoutElementRenderer = void 0;
var _react = _interopRequireDefault(require("react"));
var DesignSystem = _interopRequireWildcard(require("@adminjs/design-system"));
var _propertyType = _interopRequireDefault(require("../../property-type"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LayoutElementRenderer = props => {
  const {
    layoutElement,
    resource,
    where,
    record,
    onChange
  } = props;
  const {
    props: layoutProps,
    properties: propertyNames,
    layoutElements: innerLayoutElements,
    component
  } = layoutElement;
  const {
    children,
    ...other
  } = layoutProps;
  const properties = propertyNames.map(name => resource.properties[name]);
  const Component = DesignSystem[component];
  if (!Component) {
    return /*#__PURE__*/_react.default.createElement(DesignSystem.MessageBox, {
      size: "sm",
      message: "Javascript Error",
      variant: "danger",
      py: "xl"
    }, "There is no component by the name of", /*#__PURE__*/_react.default.createElement(DesignSystem.Badge, {
      size: "sm",
      variant: "danger",
      mx: "default"
    }, component), "in @adminjs/design-system. Change", /*#__PURE__*/_react.default.createElement(DesignSystem.Badge, {
      size: "sm",
      variant: "danger",
      mx: "default"
    }, `@${component}`), "to available component like @Header");
  }
  return /*#__PURE__*/_react.default.createElement(Component, other, properties.map(property => /*#__PURE__*/_react.default.createElement(DesignSystem.Box, {
    flexGrow: 1,
    key: property.propertyPath
  }, /*#__PURE__*/_react.default.createElement(_propertyType.default, {
    key: property.propertyPath,
    where: where,
    property: property,
    resource: resource,
    record: record,
    onChange: onChange
  }))), innerLayoutElements.map((innerLayoutElement, i) => /*#__PURE__*/_react.default.createElement(LayoutElementRenderer, _extends({}, props, {
    // eslint-disable-next-line react/no-array-index-key
    key: i,
    layoutElement: innerLayoutElement
  }))), children);
};
exports.LayoutElementRenderer = LayoutElementRenderer;
var _default = exports.default = LayoutElementRenderer;