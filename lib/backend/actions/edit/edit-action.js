"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EditAction = void 0;
var _notFoundError = _interopRequireDefault(require("../../utils/errors/not-found-error"));
var _populator = _interopRequireDefault(require("../../utils/populator/populator"));
var _paramConverter = require("../../../utils/param-converter");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * @implements Action
 * @category Actions
 * @module EditAction
 * @description
 * Shows form for updating existing record
 * @private
 *
 * @classdesc
 * Uses {@link EditAction} component to render form
 */
const EditAction = exports.EditAction = {
  name: 'edit',
  isVisible: true,
  actionType: 'record',
  icon: 'Edit',
  showInDrawer: false,
  /**
   * Responsible for updating existing record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @return  {RecordActionResponse}  populated record
   * @implements Action#handler
   * @memberof module:EditAction
   */
  handler: async (request, response, context) => {
    var _populatedRecord$base;
    const {
      record,
      resource,
      currentAdmin,
      h,
      translateMessage
    } = context;
    if (!record) {
      throw new _notFoundError.default([`Record of given id ("${request.params.recordId}") could not be found`].join('\n'), 'Action#handler');
    }
    if (request.method === 'get') {
      return {
        record: record.toJSON(currentAdmin)
      };
    }
    const params = _paramConverter.paramConverter.prepareParams(request.payload ?? {}, resource);
    const newRecord = await record.update(params, context);
    const [populatedRecord] = await (0, _populator.default)([newRecord], context);

    // eslint-disable-next-line no-param-reassign
    context.record = populatedRecord;
    if (record.isValid()) {
      var _resource$_decorated;
      return {
        redirectUrl: h.resourceUrl({
          resourceId: ((_resource$_decorated = resource._decorated) === null || _resource$_decorated === void 0 ? void 0 : _resource$_decorated.id()) || resource.id()
        }),
        notice: {
          message: translateMessage('successfullyUpdated', resource.id()),
          type: 'success'
        },
        record: populatedRecord.toJSON(currentAdmin)
      };
    }
    const baseMessage = ((_populatedRecord$base = populatedRecord.baseError) === null || _populatedRecord$base === void 0 ? void 0 : _populatedRecord$base.message) || translateMessage('thereWereValidationErrors', resource.id());
    return {
      record: populatedRecord.toJSON(currentAdmin),
      notice: {
        message: baseMessage,
        type: 'error'
      }
    };
  }
};
var _default = exports.default = EditAction;