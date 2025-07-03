"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _errorBoundary = _interopRequireDefault(require("../app/error-boundary"));
var _errorMessage = _interopRequireDefault(require("../app/error-message"));
var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Page = () => {
  const [pages] = (0, _reactRedux.useSelector)(state => [state.pages]);
  const params = (0, _reactRouter.useParams)();
  const {
    pageName
  } = params;
  const [isClient, setIsClient] = (0, _react.useState)(false);
  const currentPage = pages.find(page => page.name === pageName);
  (0, _react.useEffect)(() => {
    setIsClient(true);
  }, []);
  if (!currentPage) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.default, {
      title: "There is no page of given name"
    }, /*#__PURE__*/_react.default.createElement("p", null, "Page:", /*#__PURE__*/_react.default.createElement("b", null, ` "${pageName}" `), "does not exist."));
  }
  const Component = AdminJS.UserComponents[currentPage.component];
  if (!Component || !isClient) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.default, {
      title: "No component specified"
    }, /*#__PURE__*/_react.default.createElement("p", null, "You have to specify component which will render this Page"));
  }
  return /*#__PURE__*/_react.default.createElement(_errorBoundary.default, null, /*#__PURE__*/_react.default.createElement(Component, null));
};
var _default = exports.default = (0, _allowOverride.default)(Page, 'PageRoute');