"use strict";

var _chai = _interopRequireWildcard(require("chai"));
var _chaiAsPromised = _interopRequireDefault(require("chai-as-promised"));
var _sinon = _interopRequireDefault(require("sinon"));
var _bulkDeleteAction = _interopRequireDefault(require("./bulk-delete-action"));
var _baseRecord = _interopRequireDefault(require("../../adapters/record/base-record"));
var _adminjs = _interopRequireDefault(require("../../../adminjs"));
var _viewHelpers = _interopRequireDefault(require("../../utils/view-helpers/view-helpers"));
var _baseResource = _interopRequireDefault(require("../../adapters/resource/base-resource"));
var _actionDecorator = _interopRequireDefault(require("../../decorators/action/action-decorator"));
var _notFoundError = _interopRequireDefault(require("../../utils/errors/not-found-error"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
_chai.default.use(_chaiAsPromised.default);
describe('BulkDeleteAction', function () {
  let data;
  const request = {};
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
      await (0, _chai.expect)(_bulkDeleteAction.default.handler(request, response, data)).to.rejectedWith(_notFoundError.default);
    });
    context('2 records were selected', function () {
      let record;
      let recordJSON;
      beforeEach(function () {
        recordJSON = {
          id: 'someId'
        };
        record = _sinon.default.createStubInstance(_baseRecord.default, {
          toJSON: _sinon.default.stub().returns(recordJSON)
        });
        data.records = [record];
      });
      it('returns all records for get request', async function () {
        request.method = 'get';
        await (0, _chai.expect)(_bulkDeleteAction.default.handler(request, response, data)).to.eventually.deep.equal({
          records: [recordJSON]
        });
      });
      it('deletes all records for post request', async function () {
        request.method = 'post';
        await _bulkDeleteAction.default.handler(request, response, data);
        (0, _chai.expect)(data.resource.delete).to.have.been.calledOnce;
      });
      it('returns deleted records, notice and redirectUrl for post request', async function () {
        request.method = 'post';
        const actionResponse = await _bulkDeleteAction.default.handler(request, response, data);
        (0, _chai.expect)(actionResponse).to.have.property('notice');
        (0, _chai.expect)(actionResponse).to.have.property('redirectUrl');
        (0, _chai.expect)(actionResponse).to.have.property('records');
      });
    });
  });
});