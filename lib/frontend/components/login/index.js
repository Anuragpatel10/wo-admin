"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Login = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _reactRedux = require("react-redux");
var _designSystem = require("@adminjs/design-system");
var _hooks = require("../../hooks");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const GlobalStyle = (0, _styledComponents.createGlobalStyle)(["html,body,#app{width:100%;height:100%;margin:0;padding:0;}"]);
const Wrapper = (0, _styledComponents.default)(_designSystem.Box).withConfig({
  displayName: "login__Wrapper",
  componentId: "sc-13rvd86-0"
})(["align-items:center;justify-content:center;flex-direction:column;height:100%;"]);
const StyledLogo = _styledComponents.default.img.withConfig({
  displayName: "login__StyledLogo",
  componentId: "sc-13rvd86-1"
})(["max-width:200px;margin:", " 0;"], (0, _designSystem.themeGet)('space', 'md'));
const Login = props => {
  const {
    action,
    message
  } = props;
  const {
    translateMessage
  } = (0, _hooks.useTranslation)();
  const branding = (0, _reactRedux.useSelector)(state => state.branding);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(GlobalStyle, null), /*#__PURE__*/_react.default.createElement(Wrapper, {
    flex: true,
    variant: "grey"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    bg: "white",
    height: "440px",
    flex: true,
    boxShadow: "login",
    width: [1, 2 / 3, 'auto']
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    as: "form",
    action: action,
    method: "POST",
    p: "x3",
    flexGrow: 1,
    width: ['100%', '100%', '480px']
  }, /*#__PURE__*/_react.default.createElement(_designSystem.H5, {
    marginBottom: "xxl"
  }, branding.logo ? /*#__PURE__*/_react.default.createElement(StyledLogo, {
    src: branding.logo,
    alt: branding.companyName
  }) : branding.companyName), message && /*#__PURE__*/_react.default.createElement(_designSystem.MessageBox, {
    my: "lg",
    message: message.split(' ').length > 1 ? message : translateMessage(message),
    variant: "danger"
  }), /*#__PURE__*/_react.default.createElement("link", {
    href: 'https://partner.wobot.ai/'
  }, "Please Login Via Partner Portal"))), branding.withMadeWithLove ? /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    mt: "xxl"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.MadeWithLove, null)) : null));
};
exports.Login = Login;
var _default = exports.default = Login;