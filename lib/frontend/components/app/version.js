"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Version = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _designSystem = require("@adminjs/design-system");
var _hooks = require("../../hooks");
var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VersionItem = (0, _styledComponents.default)(_designSystem.Text).withConfig({
  displayName: "version__VersionItem",
  componentId: "sc-r49gcr-0"
})(["padding:12px 24px 12px 0;"]);
VersionItem.defaultProps = {
  display: ['none', 'block'],
  color: 'grey100'
};
const Version = props => {
  const {
    versions
  } = props;
  const {
    admin,
    app
  } = versions;
  const {
    translateLabel
  } = (0, _hooks.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flex: true,
    flexGrow: 1,
    py: "default",
    px: "xxl"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Link, {
    href: "/"
  }, /*#__PURE__*/_react.default.createElement("svg", {
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
  }))));
};
const OverridableVersion = exports.Version = exports.default = (0, _allowOverride.default)(Version, 'Version');