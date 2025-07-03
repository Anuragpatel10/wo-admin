"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DrawerPortal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactDom = require("react-dom");
var _client = require("react-dom/client");
var _designSystem = require("@adminjs/design-system");
var _styledComponents = require("styled-components");
var _setDrawerPreroute = require("../../store/actions/set-drawer-preroute");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * @alias DrawerPortalProps
 * @memberof DrawerPortal
 */

const DRAWER_PORTAL_ID = 'drawerPortal';
const DRAWER_PORTAL_WRAPPER_ID = 'drawerPortalWrapper';
const DrawerWrapper = ({
  onMount,
  onUnmount
}) => {
  (0, _react.useEffect)(() => {
    onMount();
    return onUnmount;
  }, []);
  return /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
    theme: window.THEME
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Drawer, {
    id: DRAWER_PORTAL_ID,
    className: "hidden",
    "data-css": "drawer"
  }));
};
const getOrCreatePortalContainer = id => {
  let container = document.getElementById(id);
  if (!container) {
    container = window.document.createElement('div');
    container.id = id;
    window.document.body.appendChild(container);
  }
  return container;
};

/**
 * Shows all of its children in a Drawer on the right.
 * Instead of rendering it's own {@link Drawer} component it reuses
 * the global Drawer via React Portal.
 *
 * ### Usage
 *
 * ```
 * import { DrawerPortal } from 'adminjs'
 * ```
 *
 * @component
 * @subcategory Application
 */
const DrawerPortal = ({
  children,
  width
}) => {
  const [drawerElement, setDrawerElement] = (0, _react.useState)(document.getElementById(DRAWER_PORTAL_ID));
  const {
    to = null
  } = (0, _reactRedux.useSelector)(state => state.router);
  const dispatch = (0, _reactRedux.useDispatch)();
  const handleDrawerMount = () => {
    dispatch((0, _setDrawerPreroute.setDrawerPreRoute)({
      previousRoute: to
    }));
    setDrawerElement(document.getElementById(DRAWER_PORTAL_ID));
  };
  const handleDrawerUnmount = () => {
    dispatch((0, _setDrawerPreroute.setDrawerPreRoute)({
      previousRoute: null
    }));
  };
  (0, _react.useEffect)(() => {
    const innerWrapperElement = getOrCreatePortalContainer(DRAWER_PORTAL_WRAPPER_ID);
    if (!drawerElement && window) {
      const drawerRoot = (0, _client.createRoot)(innerWrapperElement);
      drawerRoot.render(/*#__PURE__*/_react.default.createElement(DrawerWrapper, {
        onMount: handleDrawerMount,
        onUnmount: handleDrawerUnmount
      }));
    }
    return () => {
      const innerWrapper = document.getElementById(DRAWER_PORTAL_WRAPPER_ID);
      if (innerWrapper) document.body.removeChild(innerWrapper);
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (drawerElement) {
      drawerElement.classList.remove('hidden');
      if (width) {
        drawerElement.style.width = Array.isArray(width) ? width[0].toString() : width.toString();
      }
      return () => {
        drawerElement.style.width = _designSystem.DEFAULT_DRAWER_WIDTH;
        drawerElement.classList.add('hidden');
        drawerElement.setAttribute('data-css', 'drawer-element');
      };
    }
    return () => undefined;
  }, [drawerElement]);
  if (!drawerElement) {
    return null;
  }
  return /*#__PURE__*/(0, _reactDom.createPortal)(children, drawerElement);
};
exports.DrawerPortal = DrawerPortal;
var _default = exports.default = DrawerPortal;