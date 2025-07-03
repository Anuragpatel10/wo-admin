"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  PropertyDecorator: true,
  PropertyOptions: true
};
Object.defineProperty(exports, "PropertyDecorator", {
  enumerable: true,
  get: function () {
    return _propertyDecorator.default;
  }
});
Object.defineProperty(exports, "PropertyOptions", {
  enumerable: true,
  get: function () {
    return _propertyOptions.default;
  }
});
var _propertyDecorator = _interopRequireDefault(require("./property-decorator"));
var _propertyOptions = _interopRequireWildcard(require("./property-options.interface"));
Object.keys(_propertyOptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _propertyOptions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _propertyOptions[key];
    }
  });
});
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }