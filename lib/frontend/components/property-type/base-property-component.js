"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BasePropertyComponent = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireWildcard(require("react"));
var _errorBoundary = _interopRequireDefault(require("../app/error-boundary"));
var ArrayType = _interopRequireWildcard(require("./array"));
var KeyValueType = _interopRequireWildcard(require("./key-value"));
var MixedType = _interopRequireWildcard(require("./mixed"));
var _utils = require("../../utils");
var boolean = _interopRequireWildcard(require("./boolean"));
var currency = _interopRequireWildcard(require("./currency"));
var datetime = _interopRequireWildcard(require("./datetime"));
var defaultType = _interopRequireWildcard(require("./default-type"));
var password = _interopRequireWildcard(require("./password"));
var phone = _interopRequireWildcard(require("./phone"));
var reference = _interopRequireWildcard(require("./reference"));
var richtext = _interopRequireWildcard(require("./richtext"));
var textarea = _interopRequireWildcard(require("./textarea"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let globalAny = {};
try {
  globalAny = window;
} catch (error) {
  if (error.message !== 'window is not defined') {
    throw error;
  }
}
const types = {
  textarea,
  boolean,
  datetime,
  reference,
  password,
  date: datetime,
  richtext,
  string: defaultType,
  number: defaultType,
  float: defaultType,
  uuid: defaultType,
  mixed: null,
  'key-value': null,
  currency,
  phone
};

/**
 * @load ./base-property-component.doc.md
 * @component
 * @name BasePropertyComponent
 * @subcategory Application
 * @class
 * @hideconstructor
 */
const BasePropertyComponent = props => {
  const {
    property: baseProperty,
    resource,
    record,
    filter,
    where,
    onChange
  } = props;
  const property = (0, _react.useMemo)(() => ({
    ...baseProperty,
    // we fill the path if it is not there. That is why all the actual Component Renderers are
    // called with the path set to this root path. Next mixed and array components adds to this
    // path either index (for array) or subProperty name.
    path: baseProperty.path || baseProperty.propertyPath
  }), [baseProperty]);
  const testId = `property-${where}-${property.path}`;
  const contentTag = (0, _utils.getActionElementCss)(resource.id, where, property.path);
  let Component = types[property.type] && types[property.type][where] || defaultType[where];
  if (property.components && property.components[where]) {
    const component = property.components[where];
    if (!component) {
      throw new Error(`there is no "${property.path}.components.${where}"`);
    }
    Component = globalAny.AdminJS.UserComponents[component] ?? (() => {
      throw new Error(`Component "${component}" has not been bundled, ensure it was added to your ComponentLoader instance (the one included in AdminJS options).`);
    });
    return /*#__PURE__*/_react.default.createElement(_errorBoundary.default, null, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
      "data-css": contentTag,
      "data-testid": testId
    }, /*#__PURE__*/_react.default.createElement(Component, {
      property: property,
      resource: resource,
      record: record,
      filter: filter,
      onChange: onChange,
      where: where
    })));
  }
  const Array = ArrayType[where];
  const Mixed = MixedType[where];
  const KeyValue = KeyValueType[where];
  if (baseProperty.isArray) {
    if (!Array) {
      return /*#__PURE__*/_react.default.createElement("div", null);
    }
    return /*#__PURE__*/_react.default.createElement(Array, _extends({}, props, {
      property: property,
      ItemComponent: BasePropertyComponent,
      testId: testId
    }));
  }
  if (baseProperty.type === 'key-value') {
    if (!KeyValue) {
      return /*#__PURE__*/_react.default.createElement("div", null);
    }
    return /*#__PURE__*/_react.default.createElement(KeyValue, _extends({}, props, {
      property: property,
      testId: testId
    }));
  }
  if (baseProperty.type === 'mixed') {
    if (!Mixed) {
      return /*#__PURE__*/_react.default.createElement("div", null);
    }
    return /*#__PURE__*/_react.default.createElement(Mixed, _extends({}, props, {
      property: property,
      ItemComponent: BasePropertyComponent,
      testId: testId
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_errorBoundary.default, null, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    "data-css": contentTag,
    "data-testid": testId
  }, /*#__PURE__*/_react.default.createElement(Component, {
    property: property,
    resource: resource,
    record: record,
    filter: filter,
    onChange: onChange,
    where: where
  })));
};
exports.BasePropertyComponent = exports.default = BasePropertyComponent;