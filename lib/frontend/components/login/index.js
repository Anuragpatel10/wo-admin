"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Login = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _designSystem = require("@adminjs/design-system");
var _hooks = require("../../hooks");
var _reactRedux = require("react-redux");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const GlobalStyle = (0, _styledComponents.createGlobalStyle)(["html,body,#app{width:100%;height:100%;margin:0;padding:0;overflow:hidden;}.auth-root{height:auto;min-height:100vh;background-color:#f8f9fa;position:relative;overflow:hidden;}.auth-header{margin:40px 32px 0px 32px;display:flex;justify-content:unset;align-items:flex-start;width:100%;z-index:1;flex:0;}.logo-box{position:absolute;z-index:1;max-width:200px;left:40px;}.auth-box-wrapper{position:relative;flex:1;width:100%;}.auth-box-wrapper.wrapper-fw{width:100%;max-width:100%;}.auth-box-wrapper .content-box{box-sizing:border-box;z-index:0;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}.content-header{text-align:center;margin:0 auto;max-width:550px;}@media screen and (max-width:991px){.content-header{margin:60px auto 0;}}.auth-layout{display:flex;flex-direction:column;justify-content:flex-start;position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;width:100%;max-width:1140px;min-height:100%;margin:0 auto;}.box-rotate-fixed{position:absolute;height:420px;left:0;right:0;top:50%;bottom:0;z-index:0;transform:skewY(-30deg) translateY(-50%);}@media screen and (max-width:720px){.box-rotate-fixed{top:120px;}}.box-rotate-fixed .box-strip-bottom-left{left:0;max-width:44%;width:100%;border-top:8px solid #e6f0ff;}.box-rotate-fixed .box-strip-top-right{right:0;max-width:44%;width:100%;border-bottom:8px solid #e6f0ff;}.box-rotate-fixed .box-strip-middle{width:100%;}.box-rotate-fixed .box-strip{position:absolute;height:400px;background-color:#f5f5f5;}"]);
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
  const branding = (0, _reactRedux.useSelector)(state => state.branding);
  const {
    translateMessage
  } = (0, _hooks.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(GlobalStyle, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "box-rotate-fixed"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "box-strip box-strip-middle"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "box-strip box-strip-top-right"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "box-strip box-strip-bottom-left"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "auth-layout container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "auth-header"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "logo-box"
  }, branding.logo && /*#__PURE__*/_react.default.createElement(StyledLogo, {
    src: branding.logo,
    alt: branding.companyName
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "auth-box-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "content-box"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    bg: "white",
    height: "300px",
    flex: true,
    boxShadow: "login",
    width: [1, 2 / 3, 'auto']
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    bg: "primary100",
    color: "white",
    p: "x3",
    width: "380px",
    flexGrow: 0,
    display: ['none', 'none', 'block'],
    position: "relative"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.H2, {
    fontWeight: "lighter"
  }, "Wo-admin"), /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    fontWeight: "lighter",
    mt: "default"
  }, "Wobot's powerful, admin panel."), /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    fontWeight: "lighter",
    mt: "default"
  }, "it lets you manage all data seamlessly in one centralized interface.")), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    as: "form",
    action: action,
    method: "POST",
    p: "x3",
    flexGrow: 1,
    width: ['100%', '100%', '480px'],
    name: "loginForm",
    id: "loginForm"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    name: "ssoToken",
    id: "ssoToken",
    required: true
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    fontWeight: "lighter",
    mt: "default",
    textAlign: "center"
  }, branding.logo && /*#__PURE__*/_react.default.createElement("svg", {
    width: "52",
    height: "48",
    viewBox: "0 0 52 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react.default.createElement("rect", {
    width: "11.0477",
    height: "27.8427",
    rx: "5.52383",
    transform: "matrix(0.854439 -0.519552 0.510535 0.859857 0.499878 24.0586)",
    fill: "#3766E8"
  }), /*#__PURE__*/_react.default.createElement("rect", {
    width: "11.0477",
    height: "42.3694",
    rx: "5.52383",
    transform: "matrix(0.854439 -0.519552 0.510535 0.859857 12.3904 8.65234)",
    fill: "#3766E8"
  }), /*#__PURE__*/_react.default.createElement("rect", {
    width: "11.0477",
    height: "21.5479",
    rx: "5.52383",
    transform: "matrix(0.854439 -0.519552 0.510535 0.859857 31.0594 5.73828)",
    fill: "#3766E8"
  }))), message && /*#__PURE__*/_react.default.createElement(_designSystem.MessageBox, {
    my: "lg",
    message: message.split(' ').length > 1 ? message : translateMessage(message),
    variant: "danger"
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    fontWeight: "lighter",
    mt: "default",
    textAlign: "center"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: 'https://partner-staging.wobot.ai/'
  }, "Please Login Via Partner Portal"))))))));
};
exports.Login = Login;
var _default = exports.default = Login;