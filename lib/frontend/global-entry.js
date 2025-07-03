"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "React", {
  enumerable: true,
  get: function () {
    return _react.default;
  }
});
Object.defineProperty(exports, "ReactDOM", {
  enumerable: true,
  get: function () {
    return _reactDom.default;
  }
});
Object.defineProperty(exports, "ReactRedux", {
  enumerable: true,
  get: function () {
    return _reactRedux.default;
  }
});
var _react = _interopRequireDefault(require("react"));
var _redux = _interopRequireDefault(require("redux"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _client = require("react-dom/client");
var _reactRedux = _interopRequireDefault(require("react-redux"));
var _reactRouter = _interopRequireDefault(require("react-router"));
var _reactRouterDom = _interopRequireDefault(require("react-router-dom"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var styled = _interopRequireWildcard(require("styled-components"));
var _async = _interopRequireDefault(require("react-select/async"));
var _creatable = _interopRequireDefault(require("react-select/creatable"));
var ReactSelect = _interopRequireWildcard(require("react-select"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable import/first, import/no-extraneous-dependencies */
window.global = {};
window.React = _react.default;
window.ReactDOM = _reactDom.default;
window.createRoot = _client.createRoot;
window.Redux = _redux.default;
window.ReactRedux = _reactRedux.default;
window.ReactRouter = _reactRouter.default;
window.ReactRouterDOM = _reactRouterDom.default;
window.PropTypes = _propTypes.default;
window.styled = styled;
window.ReactSelect = ReactSelect;
window.ReactSelectAsync = _async.default;
window.ReactSelectCreatable = _creatable.default;