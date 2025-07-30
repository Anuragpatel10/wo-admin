"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledBackButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _reactRouterDom = require("react-router-dom");
var _designSystem = require("@adminjs/design-system");
var _reactRedux = require("react-redux");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledLink = (0, _styledComponents.default)(({
  rounded,
  ...rest
}) => /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, rest)).withConfig({
  displayName: "styled-back-button__StyledLink",
  componentId: "sc-pn0p1u-0"
})(["", ""], _designSystem.ButtonCSS);
const StyledBackButton = props => {
  const {
    showInDrawer
  } = props;
  const {
    previousRoute
  } = (0, _reactRedux.useSelector)(state => state.drawer);
  const {
    from = {}
  } = (0, _reactRedux.useSelector)(state => state.router);
  const cssCloseIcon = showInDrawer ? 'ChevronRight' : 'ChevronLeft';
  const backLink = (0, _react.useMemo)(() => {
    if (!showInDrawer) {
      return from === null || from === void 0 ? void 0 : from.pathname;
    }
    if (previousRoute !== null && previousRoute !== void 0 && previousRoute.pathname) {
      return previousRoute === null || previousRoute === void 0 ? void 0 : previousRoute.pathname;
    }
    return from === null || from === void 0 ? void 0 : from.pathname;
  }, [previousRoute, from]);
  return /*#__PURE__*/_react.default.createElement(StyledLink, {
    size: "icon",
    to: backLink,
    rounded: true,
    mr: "lg",
    type: "button"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: cssCloseIcon
  }));
};
const OverridableStyledBackButton = exports.StyledBackButton = exports.default = (0, _allowOverride.default)(StyledBackButton, 'StyledBackButton');