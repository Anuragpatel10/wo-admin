"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  BasePropertyComponent: true,
  CleanPropertyComponent: true
};
exports.BasePropertyComponent = void 0;
Object.defineProperty(exports, "CleanPropertyComponent", {
  enumerable: true,
  get: function () {
    return _cleanPropertyComponent.default;
  }
});
exports.default = void 0;
var _basePropertyComponent = _interopRequireDefault(require("./base-property-component"));
var _cleanPropertyComponent = _interopRequireDefault(require("./clean-property-component"));
var defaultType = _interopRequireWildcard(require("./default-type"));
var boolean = _interopRequireWildcard(require("./boolean"));
var datetime = _interopRequireWildcard(require("./datetime"));
var richtext = _interopRequireWildcard(require("./richtext"));
var reference = _interopRequireWildcard(require("./reference"));
var textarea = _interopRequireWildcard(require("./textarea"));
var password = _interopRequireWildcard(require("./password"));
var currency = _interopRequireWildcard(require("./currency"));
var phone = _interopRequireWildcard(require("./phone"));
var _basePropertyProps = require("./base-property-props");
Object.keys(_basePropertyProps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _basePropertyProps[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _basePropertyProps[key];
    }
  });
});
var _utils = require("./utils");
Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function camelizePropertyType(type) {
  return {
    Edit: type.edit,
    Show: type.show,
    List: type.list,
    Filter: type.filter
  };
}
const BasePropertyComponentExtended = exports.BasePropertyComponent = exports.default = Object.assign(_basePropertyComponent.default, {
  DefaultType: camelizePropertyType(defaultType),
  Boolean: camelizePropertyType(boolean),
  DateTime: camelizePropertyType(datetime),
  RichText: camelizePropertyType(richtext),
  Reference: camelizePropertyType(reference),
  TextArea: camelizePropertyType(textarea),
  Password: camelizePropertyType(password),
  Currency: camelizePropertyType(currency),
  Phone: camelizePropertyType(phone)
});