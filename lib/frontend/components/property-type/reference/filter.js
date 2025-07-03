"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _designSystem = require("@adminjs/design-system");
var _apiClient = _interopRequireDefault(require("../../../utils/api-client"));
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Filter = props => {
  const {
    property,
    filter,
    onChange
  } = props;
  const [options, setOptions] = (0, _react.useState)([]);
  const api = new _apiClient.default();
  const handleChange = selected => {
    onChange(property.path, selected ? selected.value : '');
  };
  const loadOptions = async inputValue => {
    const records = await api.searchRecords({
      resourceId: property.reference,
      query: inputValue
    });
    const loadedOptions = records.map(r => ({
      value: r.id,
      label: r.title
    }));
    setOptions(loadedOptions);
    return loadedOptions;
  };
  const value = typeof filter[property.path] === 'undefined' ? '' : filter[property.path];
  const selected = (options || []).find(o => String(o.value) === String(value));
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, null, /*#__PURE__*/_react.default.createElement(_designSystem.Label, null, property.label), /*#__PURE__*/_react.default.createElement(_designSystem.SelectAsync, {
    variant: "filter",
    value: typeof selected === 'undefined' ? '' : selected,
    isClearable: true,
    cacheOptions: true,
    loadOptions: loadOptions,
    onChange: handleChange,
    defaultOptions: true
  }));
};
var _default = exports.default = (0, _allowOverride.default)(Filter, 'DefaultReferenceFilterProperty');