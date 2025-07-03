"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RecordInList = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouter = require("react-router");
var _designSystem = require("@adminjs/design-system");
var _propertyType = _interopRequireDefault(require("../../property-type"));
var _interfaces = require("../../../interfaces");
var _display = require("./utils/display");
var _mergeRecordResponse = _interopRequireDefault(require("../../../hooks/use-record/merge-record-response"));
var _hooks = require("../../../hooks");
var _actionsToButtonGroup = require("../action-header/actions-to-button-group");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
var _utils = require("../../../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const RecordInList = props => {
  const {
    resource,
    record: recordFromProps,
    actionPerformed,
    isLoading,
    onSelect,
    isSelected
  } = props;
  const [record, setRecord] = (0, _react.useState)(recordFromProps);
  const navigate = (0, _reactRouter.useNavigate)();
  const handleActionCallback = (0, _react.useCallback)(actionResponse => {
    if (actionResponse.record && !actionResponse.redirectUrl) {
      setRecord((0, _mergeRecordResponse.default)(record, actionResponse));
    } else if (actionPerformed) {
      actionPerformed(actionResponse);
    }
  }, [actionPerformed, record]);
  const actionResponseHandler = (0, _hooks.useActionResponseHandler)(handleActionCallback);
  (0, _react.useEffect)(() => {
    setRecord(recordFromProps);
  }, [recordFromProps]);
  const {
    recordActions
  } = record;
  const show = record.recordActions.find(({
    name
  }) => name === 'show');
  const edit = record.recordActions.find(({
    name
  }) => name === 'edit');
  const action = show || edit;
  const handleClick = event => {
    const targetTagName = event.target.tagName.toLowerCase();
    if (action && targetTagName !== 'a' && targetTagName !== 'button' && targetTagName !== 'svg') {
      (0, _interfaces.buildActionClickHandler)({
        action,
        params: {
          resourceId: resource.id,
          recordId: record.id
        },
        actionResponseHandler,
        navigate
      })(event);
    }
  };
  const actionParams = {
    resourceId: resource.id,
    recordId: record.id
  };
  const handleActionClick = (event, sourceAction) => (0, _interfaces.buildActionClickHandler)({
    action: sourceAction,
    params: actionParams,
    actionResponseHandler,
    navigate
  })(event);
  const buttons = [{
    icon: 'OverflowMenuHorizontal',
    variant: 'light',
    label: undefined,
    'data-testid': 'actions-dropdown',
    buttons: (0, _actionsToButtonGroup.actionsToButtonGroup)({
      actions: recordActions,
      params: actionParams,
      handleClick: handleActionClick
    })
  }];
  const contentTag = (0, _utils.getResourceElementCss)(resource.id, 'table-row');
  return /*#__PURE__*/_react.default.createElement(_designSystem.TableRow, {
    onClick: handleClick,
    "data-id": record.id,
    "data-css": contentTag
  }, /*#__PURE__*/_react.default.createElement(_designSystem.TableCell, {
    className: isSelected ? 'selected' : 'not-selected'
  }, onSelect && record.bulkActions.length ? /*#__PURE__*/_react.default.createElement(_designSystem.CheckBox, {
    onChange: () => onSelect(record),
    checked: isSelected
  }) : null), resource.listProperties.map(property => {
    const cellTag = `${resource.id}-${property.name}-table-cell`;
    return /*#__PURE__*/_react.default.createElement(_designSystem.TableCell, {
      style: {
        cursor: 'pointer'
      },
      key: property.propertyPath,
      "data-property-name": property.propertyPath,
      display: (0, _display.display)(property.isTitle),
      "data-css": cellTag
    }, isLoading ? /*#__PURE__*/_react.default.createElement(_designSystem.Placeholder, {
      style: {
        height: 14
      }
    }) : /*#__PURE__*/_react.default.createElement(_propertyType.default, {
      key: property.propertyPath,
      where: "list",
      property: property,
      resource: resource,
      record: record
    }));
  }), /*#__PURE__*/_react.default.createElement(_designSystem.TableCell, {
    key: "options"
  }, recordActions.length ? /*#__PURE__*/_react.default.createElement(_designSystem.ButtonGroup, {
    buttons: buttons
  }) : ''));
};
const OverridableRecordInList = exports.RecordInList = exports.default = (0, _allowOverride.default)(RecordInList, 'RecordInList');