"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _basePropertyComponent = require("./base-property-component");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * This component is the same as `BasePropertyComponent` but it will not render
 * custom components. Use this in your custom components to render the default
 * property component.
 *
 * This is useful if you want your custom component to appear custom only for
 * specific `where` value and default for all others.
 */
const CleanPropertyComponent = props => {
  const {
    property
  } = props;
  const cleanProperty = (0, _react.useMemo)(() => ({
    ...property,
    components: {}
  }), [property]);
  return /*#__PURE__*/_react.default.createElement(_basePropertyComponent.BasePropertyComponent, _extends({}, props, {
    property: cleanProperty
  }));
};
var _default = exports.default = CleanPropertyComponent;