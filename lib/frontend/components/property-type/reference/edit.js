"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _designSystem = require("@adminjs/design-system");
var _apiClient = _interopRequireDefault(require("../../../utils/api-client"));
var _propertyLabel = require("../utils/property-label");
var _flat = require("../../../../utils/flat");
var _recordPropertyIsEqual = require("../record-property-is-equal");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Edit = props => {
  const {
    onChange,
    property,
    record
  } = props;
  const {
    reference: resourceId
  } = property;
  if (!resourceId) {
    throw new Error(`Cannot reference resource in property '${property.path}'`);
  }
  const handleChange = selected => {
    if (selected) {
      onChange(property.path, selected.value, selected.record);
    } else {
      onChange(property.path, null);
    }
  };
  const loadOptions = async inputValue => {
    const api = new _apiClient.default();
    const optionRecords = await api.searchRecords({
      resourceId,
      query: inputValue
    });
    return optionRecords.map(optionRecord => ({
      value: optionRecord.id,
      label: optionRecord.title,
      record: optionRecord
    }));
  };
  const error = record === null || record === void 0 ? void 0 : record.errors[property.path];
  const selectedId = (0, _react.useMemo)(() => _flat.flat.get(record === null || record === void 0 ? void 0 : record.params, property.path), [record]);
  const [loadedRecord, setLoadedRecord] = (0, _react.useState)();
  const [loadingRecord, setLoadingRecord] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    if (selectedId) {
      setLoadingRecord(c => c + 1);
      const api = new _apiClient.default();
      api.recordAction({
        actionName: 'show',
        resourceId,
        recordId: selectedId
      }).then(({
        data
      }) => {
        setLoadedRecord(data.record);
      }).finally(() => {
        setLoadingRecord(c => c - 1);
      });
    }
  }, [selectedId, resourceId]);
  const selectedValue = loadedRecord;
  const selectedOption = selectedId && selectedValue ? {
    value: selectedValue.id,
    label: selectedValue.title
  } : {
    value: '',
    label: ''
  };
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: Boolean(error)
  }, /*#__PURE__*/_react.default.createElement(_propertyLabel.PropertyLabel, {
    property: property
  }), /*#__PURE__*/_react.default.createElement(_designSystem.SelectAsync, _extends({
    cacheOptions: true,
    value: selectedOption,
    defaultOptions: true,
    loadOptions: loadOptions,
    onChange: handleChange,
    isClearable: true,
    isDisabled: property.isDisabled,
    isLoading: !!loadingRecord
  }, property.props)), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error === null || error === void 0 ? void 0 : error.message));
};
var _default = exports.default = (0, _allowOverride.default)(/*#__PURE__*/(0, _react.memo)(Edit, _recordPropertyIsEqual.recordPropertyIsEqual), 'DefaultReferenceEditProperty');