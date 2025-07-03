"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _designSystem = require("@adminjs/design-system");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const SortLink = props => {
  const {
    sortBy,
    property,
    direction
  } = props;
  const location = (0, _reactRouterDom.useLocation)();
  const isActive = (0, _react.useMemo)(() => sortBy === property.propertyPath, [sortBy, property]);
  const query = new URLSearchParams(location.search);
  const oppositeDirection = isActive && direction === 'asc' ? 'desc' : 'asc';
  const sortedByIcon = `Caret${direction === 'asc' ? 'Up' : 'Down'}`;
  query.set('direction', oppositeDirection);
  query.set('sortBy', property.propertyPath);
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: {
      search: query.toString()
    },
    className: (0, _designSystem.cssClass)('SortLink')
  }, property.label, isActive ? /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: sortedByIcon,
    color: "primary100",
    ml: "default"
  }) : '');
};
const checkSortProps = (prevProps, nextProps) => prevProps.direction === nextProps.direction && prevProps.property.propertyPath === nextProps.property.propertyPath && prevProps.sortBy === nextProps.sortBy;
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(SortLink, checkSortProps);