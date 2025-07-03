"use strict";

var _chai = _interopRequireWildcard(require("chai"));
var _chaiAsPromised = _interopRequireDefault(require("chai-as-promised"));
var _sinon = _interopRequireDefault(require("sinon"));
var _deleteAction = _interopRequireDefault(require("./delete-action"));
var _baseRecord = _interopRequireDefault(require("../../adapters/record/base-record"));
var _adminjs = _interopRequireDefault(require("../../../adminjs"));
var _viewHelpers = _interopRequireDefault(require("../../utils/view-helpers/view-helpers"));
var _baseResource = _interopRequireDefault(require("../../adapters/resource/base-resource"));
var _actionDecorator = _interopRequireDefault(require("../../decorators/action/action-decorator"));
var _notFoundError = _interopRequireDefault(require("../../utils/errors/not-found-error"));
var _validationError = require("../../utils/errors/validation-error");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
_chai.default.use(_chaiAsPromised.default);
describe('DeleteAction', function () {
  let data;
  const request = {
    params: {},
    method: 'post'
  };
  let response;
  describe('.handler', function () {
    afterEach(function () {
      _sinon.default.restore();
    });
    beforeEach(async function () {
      data = {
        _admin: _sinon.default.createStubInstance(_adminjs.default),
        translateMessage: _sinon.default.stub().returns('translatedMessage'),
        h: _sinon.default.createStubInstance(_viewHelpers.default),
        resource: _sinon.default.createStubInstance(_baseResource.default),
        action: _sinon.default.createStubInstance(_actionDecorator.default)
      };
    });
    it('throws error when no records are given', async function () {
      await (0, _chai.expect)(_deleteAction.default.handler(request, response, data)).to.rejectedWith(_notFoundError.default);
    });
    context('A record has been selected', function () {
      let record;
      let recordJSON;
      beforeEach(function () {
        recordJSON = {
          id: 'someId'
        };
        record = _sinon.default.createStubInstance(_baseRecord.default, {
          toJSON: _sinon.default.stub().returns(recordJSON)
        });
        request.params.recordId = recordJSON.id;
        data.record = record;
      });
      it('returns deleted record, notice and redirectUrl', async function () {
        const actionResponse = await _deleteAction.default.handler(request, response, data);
        (0, _chai.expect)(actionResponse).to.have.property('notice');
        (0, _chai.expect)(actionResponse).to.have.property('redirectUrl');
        (0, _chai.expect)(actionResponse).to.have.property('record');
      });
      context('ValidationError is thrown by Resource.delete', function () {
        it('returns error notice', async function () {
          const errorMessage = 'test validation error';
          data.resource = _sinon.default.createStubInstance(_baseResource.default, {
            delete: _sinon.default.stub().rejects(new _validationError.ValidationError({}, {
              message: errorMessage
            }))
          });
          const actionResponse = await _deleteAction.default.handler(request, response, data);
          (0, _chai.expect)(actionResponse).to.have.property('notice');
          (0, _chai.expect)(actionResponse.notice).to.deep.equal({
            message: errorMessage,
            type: 'error'
          });
          (0, _chai.expect)(actionResponse).to.have.property('record');
        });
        it('returns error notice with default message when ValidationError has no baseError', async function () {
          data.resource = _sinon.default.createStubInstance(_baseResource.default, {
            delete: _sinon.default.stub().rejects(new _validationError.ValidationError({}))
          });
          const actionResponse = await _deleteAction.default.handler(request, response, data);
          (0, _chai.expect)(actionResponse).to.have.property('notice');
          (0, _chai.expect)(actionResponse.notice).to.deep.equal({
            message: 'translatedMessage',
            type: 'error'
          });
          (0, _chai.expect)(actionResponse).to.have.property('record');
        });
      });
    });
  });
});