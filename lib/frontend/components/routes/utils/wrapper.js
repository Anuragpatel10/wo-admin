"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _designSystem = require("@adminjs/design-system");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const StyledWrapperWithFilter = (0, _styledComponents.default)(_designSystem.Box).withConfig({
  displayName: "wrapper__StyledWrapperWithFilter",
  componentId: "sc-1jcopgf-0"
})(["& > ", "{background:", ";padding:", ";overflow:visible;}& > ", "{background:", ";padding:0 ", " ", ";}"], _designSystem.DrawerContent, ({
  theme
}) => theme.colors.white, ({
  theme
}) => theme.space.xxl, _designSystem.DrawerFooter, ({
  theme
}) => theme.colors.white, ({
  theme
}) => theme.space.xxl, ({
  theme
}) => theme.space.xxl);
const StyledWrapper = (0, _styledComponents.default)(_designSystem.Box).withConfig({
  displayName: "wrapper__StyledWrapper",
  componentId: "sc-1jcopgf-1"
})(["& ", "{background:", ";padding:", ";overflow:visible;}& ", "{background:", ";padding:0 ", " ", ";}"], _designSystem.DrawerContent, ({
  theme
}) => theme.colors.white, ({
  theme
}) => theme.space.xxl, _designSystem.DrawerFooter, ({
  theme
}) => theme.colors.white, ({
  theme
}) => theme.space.xxl, ({
  theme
}) => theme.space.xxl);
const Wrapper = props => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    children,
    variant,
    color,
    showFilter = false,
    ...rest
  } = props;
  const Component = showFilter ? StyledWrapperWithFilter : StyledWrapper;
  return /*#__PURE__*/_react.default.createElement(Component, _extends({}, rest, {
    variant: "grey",
    mx: "auto",
    "data-css": "styled-wrapper"
  }), children);
};
var _default = exports.default = (0, _allowOverride.default)(Wrapper, 'RouteWrapper');