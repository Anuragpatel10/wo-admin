"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _designSystem = require("@adminjs/design-system");
var BackendFilter = _interopRequireWildcard(require("../../../../backend/utils/filter/filter"));
var _useTranslation = require("../../../hooks/use-translation");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  PARAM_SEPARATOR
} = BackendFilter;
const Filter = props => {
  const {
    property,
    filter,
    onChange
  } = props;
  const {
    translateProperty
  } = (0, _useTranslation.useTranslation)();
  const fromKey = `${property.path}${PARAM_SEPARATOR}from`;
  const toKey = `${property.path}${PARAM_SEPARATOR}to`;
  const fromValue = filter[fromKey];
  const toValue = filter[toKey];
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    variant: "filter"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Label, null, property.label), /*#__PURE__*/_react.default.createElement(_designSystem.Label, null, `- ${translateProperty('from')}: `), /*#__PURE__*/_react.default.createElement(_designSystem.DatePicker, {
    value: fromValue,
    onChange: date => onChange(fromKey, date),
    propertyType: property.type
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Label, {
    mt: "default"
  }, `- ${translateProperty('to')}: `), /*#__PURE__*/_react.default.createElement(_designSystem.DatePicker, {
    value: toValue,
    onChange: date => onChange(toKey, date),
    propertyType: property.type
  }));
};
var _default = exports.default = (0, _allowOverride.default)(Filter, 'DefaultDatetimeFilterProperty');