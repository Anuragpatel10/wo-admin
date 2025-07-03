"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.New = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireWildcard(require("react"));
var _reactRouter = require("react-router");
var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));
var _useRecord = _interopRequireDefault(require("../../hooks/use-record/use-record"));
var _useTranslation = require("../../hooks/use-translation");
var _utils = require("../../utils");
var _actionHeader = _interopRequireDefault(require("../app/action-header/action-header"));
var _propertyType = _interopRequireDefault(require("../property-type"));
var _appendForceRefresh = require("./utils/append-force-refresh");
var _layoutElementRenderer = _interopRequireDefault(require("./utils/layout-element-renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const New = props => {
  const {
    record: initialRecord,
    resource,
    action
  } = props;
  const {
    record,
    handleChange,
    submit: handleSubmit,
    loading,
    setRecord
  } = (0, _useRecord.default)(initialRecord, resource.id);
  const {
    translateButton
  } = (0, _useTranslation.useTranslation)();
  const navigate = (0, _reactRouter.useNavigate)();
  (0, _react.useEffect)(() => {
    if (initialRecord) {
      setRecord(initialRecord);
    }
  }, [initialRecord]);
  const submit = event => {
    event.preventDefault();
    handleSubmit().then(response => {
      if (response.data.redirectUrl) {
        navigate((0, _appendForceRefresh.appendForceRefresh)(response.data.redirectUrl));
      }
      // if record has id === has been created
      if (response.data.record.id && !Object.keys(response.data.record.errors).length) {
        handleChange({
          params: {},
          populated: {},
          errors: {}
        });
      }
    });
    return false;
  };
  const contentTag = (0, _utils.getActionElementCss)(resource.id, action.name, 'drawer-content');
  const formTag = (0, _utils.getActionElementCss)(resource.id, action.name, 'form');
  const footerTag = (0, _utils.getActionElementCss)(resource.id, action.name, 'drawer-footer');
  const buttonTag = (0, _utils.getActionElementCss)(resource.id, action.name, 'drawer-submit');
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    as: "form",
    onSubmit: submit,
    flex: true,
    flexGrow: 1,
    flexDirection: "column",
    "data-css": formTag
  }, /*#__PURE__*/_react.default.createElement(_designSystem.DrawerContent, {
    "data-css": contentTag
  }, action !== null && action !== void 0 && action.showInDrawer ? /*#__PURE__*/_react.default.createElement(_actionHeader.default, props) : null, action.layout ? action.layout.map((layoutElement, i) => /*#__PURE__*/_react.default.createElement(_layoutElementRenderer.default
  // eslint-disable-next-line react/no-array-index-key
  , _extends({
    key: i,
    layoutElement: layoutElement
  }, props, {
    where: "edit",
    onChange: handleChange,
    record: record
  }))) : resource.editProperties.map(property => /*#__PURE__*/_react.default.createElement(_propertyType.default, {
    key: property.propertyPath,
    where: "edit",
    onChange: handleChange,
    property: property,
    resource: resource,
    record: record
  }))), /*#__PURE__*/_react.default.createElement(_designSystem.DrawerFooter, {
    "data-css": footerTag
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    variant: "primary",
    size: "lg",
    type: "submit",
    "data-css": buttonTag,
    "data-testid": "button-save",
    disabled: loading
  }, loading ? /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "Fade",
    spin: true
  }) : null, translateButton('save', resource.id))));
};
const OverridableNew = exports.New = exports.default = (0, _allowOverride.default)(New, 'DefaultNewAction');