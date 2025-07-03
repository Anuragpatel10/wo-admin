"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _designSystem = require("@adminjs/design-system");
var _reactRouter = require("react-router");
var _apiClient = _interopRequireDefault(require("../../utils/api-client"));
var _getBulkActionsFromRecords = _interopRequireDefault(require("../app/records-table/utils/get-bulk-actions-from-records"));
var _wrapper = _interopRequireDefault(require("./utils/wrapper"));
var _app = require("../app");
var _hooks = require("../../hooks");
var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const api = new _apiClient.default();
const BulkAction = () => {
  const params = (0, _reactRouter.useParams)();
  const [records, setRecords] = (0, _react.useState)([]);
  const [loading, setLoading] = (0, _react.useState)(false);
  const {
    translateMessage
  } = (0, _hooks.useTranslation)();
  const addNotice = (0, _hooks.useNotice)();
  const location = (0, _reactRouter.useLocation)();
  const {
    resourceId,
    actionName
  } = params;
  const resource = (0, _hooks.useResource)(resourceId);
  const fetchRecords = () => {
    const recordIdsString = new URLSearchParams(location.search).get('recordIds');
    const recordIds = recordIdsString ? recordIdsString.split(',') : [];
    setLoading(true);
    return api.bulkAction({
      resourceId: resourceId,
      recordIds,
      actionName: actionName
    }).then(response => {
      setLoading(false);
      setRecords(response.data.records);
    }).catch(error => {
      setLoading(false);
      addNotice({
        message: translateMessage('errorFetchingRecords', resourceId),
        type: 'error'
      });
      throw error;
    });
  };
  (0, _react.useEffect)(() => {
    fetchRecords();
  }, [params.resourceId, params.actionName]);
  if (!resource) {
    return /*#__PURE__*/_react.default.createElement(_app.NoResourceError, {
      resourceId: resourceId
    });
  }
  if (!records && !loading) {
    return /*#__PURE__*/_react.default.createElement(_app.ErrorMessageBox, {
      title: "No records"
    }, /*#__PURE__*/_react.default.createElement("p", null, translateMessage('noRecordsSelected', resourceId)));
  }
  const action = (0, _getBulkActionsFromRecords.default)(records || []).find(r => r.name === actionName);
  if (loading) {
    const actionFromResource = resource.actions.find(r => r.name === actionName);
    return actionFromResource !== null && actionFromResource !== void 0 && actionFromResource.showInDrawer ? /*#__PURE__*/_react.default.createElement(_app.DrawerPortal, null, /*#__PURE__*/_react.default.createElement(_designSystem.Loader, null)) : /*#__PURE__*/_react.default.createElement(_designSystem.Loader, null);
  }
  if (!action) {
    return /*#__PURE__*/_react.default.createElement(_app.NoActionError, {
      resourceId: resourceId,
      actionName: actionName
    });
  }
  if (action.showInDrawer) {
    return /*#__PURE__*/_react.default.createElement(_app.DrawerPortal, {
      width: action.containerWidth
    }, /*#__PURE__*/_react.default.createElement(_app.BaseActionComponent, {
      action: action,
      resource: resource,
      records: records
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_wrapper.default, {
    width: action.containerWidth
  }, !(action !== null && action !== void 0 && action.showInDrawer) ? /*#__PURE__*/_react.default.createElement(_app.ActionHeader, {
    resource: resource,
    action: action
  }) : '', /*#__PURE__*/_react.default.createElement(_app.BaseActionComponent, {
    action: action,
    resource: resource,
    records: records
  }));
};
var _default = exports.default = (0, _allowOverride.default)(BulkAction, 'BulkActionRoute');