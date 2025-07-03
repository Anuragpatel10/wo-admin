"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Edit = void 0;
var _react = _interopRequireWildcard(require("react"));
var _designSystem = require("@adminjs/design-system");
var _dnd = require("@hello-pangea/dnd");
var _addNewItemTranslation = _interopRequireDefault(require("./add-new-item-translation"));
var _utils = require("../../../../utils");
var _propertyLabel = require("../utils/property-label");
var _convertToSubProperty = require("./convert-to-sub-property");
var _removeSubProperty = require("./remove-sub-property");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ItemRenderer = props => {
  const {
    ItemComponent,
    property,
    onDelete,
    index,
    record,
    isDraggable
  } = props;
  const uniqueDraggableId = window.btoa(unescape(encodeURIComponent(`${JSON.stringify(_utils.flat.get(record.params, property.path))}-${property.path}`)));
  return /*#__PURE__*/_react.default.createElement(_dnd.Draggable, {
    draggableId: uniqueDraggableId,
    index: index,
    key: uniqueDraggableId,
    isDragDisabled: !isDraggable
  }, provided => /*#__PURE__*/_react.default.createElement(_designSystem.Box, _extends({
    ref: provided.innerRef
  }, provided.draggableProps, provided.dragHandleProps, {
    backgroundColor: "white",
    flex: true,
    flexDirection: "row",
    alignItems: "center",
    "data-testid": property.path
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexGrow: 1
  }, /*#__PURE__*/_react.default.createElement(ItemComponent, props)), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexShrink: 0,
    ml: "lg"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    rounded: true,
    ml: "default",
    "data-testid": "delete-item",
    type: "button",
    size: "icon",
    onClick: event => onDelete(event, property),
    variant: "danger"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "TrashCan"
  })))));
};
const InputsInSection = props => {
  const {
    property,
    record,
    resource,
    onChange
  } = props;
  const items = _utils.flat.get(record.params, property.path) || [];
  const addNew = (0, _react.useCallback)(event => {
    const newItems = [...items, property.subProperties.length ? {} : ''];
    onChange(property.path, newItems);
    event.preventDefault();
    return false;
  }, [record, onChange, property]);
  const removeItem = (0, _react.useCallback)((event, subProperty) => {
    const newRecord = (0, _removeSubProperty.removeSubProperty)(record, subProperty.path);
    onChange(newRecord);
    event.preventDefault();
    return false;
  }, [record, onChange, property]);
  const handleOnDragEnd = (0, _react.useCallback)(result => {
    const {
      source,
      destination
    } = result;
    if (!source || !destination || destination.index === source.index) return;
    const itemsCopy = Array.from(items);
    const [sourceItem] = itemsCopy.splice(source.index, 1);
    itemsCopy.splice(destination.index, 0, sourceItem);
    onChange(property.path, itemsCopy);
  }, [record, onChange, property]);
  return /*#__PURE__*/_react.default.createElement(_dnd.DragDropContext, {
    onDragEnd: handleOnDragEnd
  }, /*#__PURE__*/_react.default.createElement(_dnd.Droppable, {
    droppableId: property.path
  }, provided => /*#__PURE__*/_react.default.createElement(_designSystem.Section, _extends({
    ref: provided.innerRef
  }, provided.droppableProps, {
    mt: "xl",
    className: property.path
  }), items.map((item, i) => {
    const itemProperty = (0, _convertToSubProperty.convertToSubProperty)(property, i);
    return /*#__PURE__*/_react.default.createElement(ItemRenderer, _extends({}, props, {
      property: itemProperty,
      isDraggable: property.isDraggable,
      key: itemProperty.path,
      onDelete: removeItem,
      index: i
    }));
  }), provided.placeholder, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    onClick: addNew,
    type: "button",
    rounded: true
  }, /*#__PURE__*/_react.default.createElement(_addNewItemTranslation.default, {
    resource: resource,
    property: property
  })))));
};
const Edit = props => {
  const {
    property,
    record,
    testId
  } = props;
  const error = record.errors && record.errors[property.propertyPath];
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: !!error,
    "data-testid": testId
  }, /*#__PURE__*/_react.default.createElement(_propertyLabel.PropertyLabel, {
    property: property
  }), /*#__PURE__*/_react.default.createElement(InputsInSection, props), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error && error.message));
};
const OverridableEdit = exports.Edit = exports.default = (0, _allowOverride.default)(Edit, 'DefaultArrayEditProperty');