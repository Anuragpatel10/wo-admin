"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Sidebar = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _reactRedux = require("react-redux");
var _designSystem = require("@adminjs/design-system");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const StyledSidebar = (0, _styledComponents.default)(_designSystem.Box).withConfig({
  displayName: "sidebar__StyledSidebar",
  componentId: "sc-rspq5q-0"
})(["transition:left 0.3s;top:0;bottom:0;flex-shrink:0;overflow-y:auto;&.hidden{left:-", ";}&.visible{left:0;}"], (0, _designSystem.themeGet)('sizes', 'sidebarWidth'));
StyledSidebar.defaultProps = {
  position: ['absolute', 'absolute', 'absolute', 'absolute', 'inherit'],
  width: 'sidebarWidth',
  borderRight: 'default',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 50,
  bg: 'white'
};
const SidebarOriginal = props => {
  const {
    isVisible
  } = props;
  const [branding, resources, pages] = (0, _reactRedux.useSelector)(state => [state.branding, state.resources, state.pages]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
};
const Sidebar = exports.Sidebar = (0, _allowOverride.default)(SidebarOriginal, 'Sidebar');
var _default = exports.default = Sidebar;