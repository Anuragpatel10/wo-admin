"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _styledComponents = require("styled-components");
var _reactI18next = require("react-i18next");
var _i18next = _interopRequireDefault(require("i18next"));
var _application = _interopRequireDefault(require("./components/application"));
var _propertyType = _interopRequireWildcard(require("./components/property-type"));
var _store = _interopRequireDefault(require("./store/store"));
var _viewHelpers = _interopRequireDefault(require("../backend/utils/view-helpers/view-helpers"));
var AppComponents = _interopRequireWildcard(require("./components/app"));
var Hooks = _interopRequireWildcard(require("./hooks"));
var _apiClient = _interopRequireDefault(require("./utils/api-client"));
var _withNotice = _interopRequireDefault(require("./hoc/with-notice"));
var _flat = require("../utils/flat");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const env = {
  NODE_ENV: process.env.NODE_ENV || 'development'
};
const store = (0, _store.default)(window.REDUX_STATE);
const theme = window.THEME;
const {
  locale
} = window.REDUX_STATE;
_i18next.default.use(_reactI18next.initReactI18next).init({
  resources: {
    [locale.language]: {
      translation: locale.translations
    }
  },
  lng: locale.language,
  interpolation: {
    escapeValue: false
  }
});
const Application = /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
  store: store
}, /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
  theme: theme
}, /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_application.default, null))));

// eslint-disable-next-line no-undef
window.regeneratorRuntime = regeneratorRuntime;
var _default = exports.default = {
  withNotice: _withNotice.default,
  Application,
  ViewHelpers: _viewHelpers.default,
  UserComponents: {},
  ApiClient: _apiClient.default,
  BasePropertyComponent: _propertyType.default,
  CleanPropertyComponent: _propertyType.CleanPropertyComponent,
  env,
  ...AppComponents,
  ...Hooks,
  flat: _flat.flat
};