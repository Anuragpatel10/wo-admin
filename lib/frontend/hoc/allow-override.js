"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allowOverride = exports.default = allowOverride;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable react/function-component-definition */
/**
 * @private
 *
 * @classdesc
 * Overrides one of the component form AdminJS core when user pass its name to
 * {@link ComponentLoader.add} or {@link ComponentLoader.override} method.
 *
 * If case of being overridden, component receives additional prop: `OriginalComponent`
 *
 * @example
 * new ComponentLoader().override('SidebarFooter', MySidebarFooter)
 */
function allowOverride(OriginalComponent, name) {
  const WrapperComponent = props => {
    let Component = OriginalComponent;

    /**
     * @new in version 6.3
     *
     * This adds support for future theme-specific components via their "theme.bundle.js"
     *
     */
    if (typeof window !== 'undefined') {
      var _window$AdminJS, _THEME;
      Component = ((_window$AdminJS = window.AdminJS) === null || _window$AdminJS === void 0 || (_window$AdminJS = _window$AdminJS.UserComponents) === null || _window$AdminJS === void 0 ? void 0 : _window$AdminJS[name]) ?? ((_THEME = window.THEME) === null || _THEME === void 0 || (_THEME = _THEME.Components) === null || _THEME === void 0 ? void 0 : _THEME[name]) ?? OriginalComponent;
    }
    return /*#__PURE__*/_react.default.createElement(Component, _extends({}, props, {
      OriginalComponent: OriginalComponent
    }));
  };
  return WrapperComponent;
}