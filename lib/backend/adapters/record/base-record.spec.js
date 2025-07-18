"use strict";

var _chai = _interopRequireWildcard(require("chai"));
var _chaiChange = _interopRequireDefault(require("chai-change"));
var _sinon = _interopRequireDefault(require("sinon"));
var _sinonChai = _interopRequireDefault(require("sinon-chai"));
var _chaiAsPromised = _interopRequireDefault(require("chai-as-promised"));
var _baseRecord = _interopRequireDefault(require("./base-record"));
var _baseResource = _interopRequireDefault(require("../resource/base-resource"));
var _baseProperty = _interopRequireDefault(require("../property/base-property"));
var _validationError = _interopRequireDefault(require("../../utils/errors/validation-error"));
var _decorators = require("../../decorators");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
_chai.default.use(_chaiAsPromised.default);
_chai.default.use(_chaiChange.default);
_chai.default.use(_sinonChai.default);
describe('Record', function () {
  let record;
  let params = {
    param1: 'john'
  };
  afterEach(function () {
    _sinon.default.restore();
  });
  describe('#get', function () {
    context('record with nested parameters', function () {
      const nested3level = 'value';
      beforeEach(function () {
        params = {
          nested1level: {
            nested2level: {
              nested3level
            }
          }
        };
        record = new _baseRecord.default(params, {});
      });
      it('returns deepest field when all up-level keys are given', function () {
        (0, _chai.expect)(record.get('nested1level.nested2level.nested3level')).to.equal(nested3level);
      });
      it('returns object when all up-level keys are given except one', function () {
        (0, _chai.expect)(record.get('nested1level.nested2level')).to.deep.equal({
          nested3level
        });
      });
      it('returns object when only first level key is given', function () {
        (0, _chai.expect)(record.get('nested1level')).to.deep.equal({
          nested2level: {
            nested3level
          }
        });
      });
      it('returns undefined when passing unknown param', function () {
        (0, _chai.expect)(record.get('nested1level.nested2')).to.be.undefined;
      });
    });
  });
  describe('#constructor', function () {
    it('returns empty object if params are not passed to the constructor', function () {
      record = new _baseRecord.default({}, {});
      (0, _chai.expect)(record.params).to.deep.equal({});
    });
    it('stores flatten object params', function () {
      record = new _baseRecord.default({
        auth: {
          login: 'login'
        }
      }, {});
      (0, _chai.expect)(record.params).to.deep.equal({
        'auth.login': 'login'
      });
    });
  });
  describe('#save', function () {
    const newParams = {
      param2: 'doe'
    };
    const properties = [new _baseProperty.default({
      path: '_id',
      isId: true
    })];
    let resource;
    beforeEach(function () {
      resource = _sinon.default.createStubInstance(_baseResource.default, {
        properties: _sinon.default.stub().returns(properties),
        create: _sinon.default.stub().resolves(newParams),
        update: _sinon.default.stub().resolves(newParams)
      });
    });
    it('uses BaseResource#create method when there is no id property', async function () {
      record = new _baseRecord.default(newParams, resource);
      record.save();
      (0, _chai.expect)(resource.create).to.have.been.calledWith(newParams);
    });
    it('uses BaseResource#update method when there is a id property', function () {
      const _id = '1231231313';
      record = new _baseRecord.default({
        ...newParams,
        _id
      }, resource);
      record.save();
      (0, _chai.expect)(resource.update).to.have.been.calledWith(_id, {
        ...newParams,
        _id
      });
    });
    it('stores validation error when they happen', async function () {
      const baseError = {
        message: 'test base error'
      };
      const propertyErrors = {
        param2: {
          type: 'required',
          message: 'Field is required'
        }
      };
      resource.create = _sinon.default.stub().rejects(new _validationError.default(propertyErrors, baseError));
      record = new _baseRecord.default(newParams, resource);
      await record.save();
      (0, _chai.expect)(record.error('param2')).to.deep.equal(propertyErrors.param2);
      (0, _chai.expect)(record.baseError).to.deep.equal(baseError);
    });
    it('stores validation error when they happen (even when there is no baseError specified)', async function () {
      const propertyErrors = {
        param2: {
          type: 'required',
          message: 'Field is required'
        }
      };
      resource.create = _sinon.default.stub().rejects(new _validationError.default(propertyErrors));
      record = new _baseRecord.default(newParams, resource);
      await record.save();
      (0, _chai.expect)(record.error('param2')).to.deep.equal(propertyErrors.param2);
      (0, _chai.expect)(record.baseError).to.be.null;
    });
  });
  describe('#update', function () {
    const newParams = {
      param2: 'doe'
    };
    const properties = [new _baseProperty.default({
      path: '_id',
      isId: true
    })];
    params = {
      param1: 'john',
      _id: '1381723981273'
    };
    let resource;
    context('resource stores the value', function () {
      beforeEach(async function () {
        resource = _sinon.default.createStubInstance(_baseResource.default, {
          properties: _sinon.default.stub().returns(properties),
          update: _sinon.default.stub().resolves(newParams)
        });
        record = new _baseRecord.default(params, resource);
        await record.update(newParams);
      });
      it('stores what was returned by BaseResource#update to this.params', function () {
        (0, _chai.expect)(record.get('param2')).to.equal(newParams.param2);
      });
      it('resets the baseError when there is none', function () {
        (0, _chai.expect)(record.baseError).to.deep.equal(null);
      });
      it('resets the errors when there are none', function () {
        (0, _chai.expect)(record.errors).to.deep.equal({});
      });
      it('calls the BaseResource#update function with the id and new params', function () {
        (0, _chai.expect)(resource.update).to.have.been.calledWith(params._id, newParams);
      });
    });
    context('resource throws validation error', function () {
      const baseError = {
        message: 'test base error'
      };
      const propertyErrors = {
        param2: {
          type: 'required',
          message: 'Field is required'
        }
      };
      beforeEach(async function () {
        resource = _sinon.default.createStubInstance(_baseResource.default, {
          properties: _sinon.default.stub().returns(properties),
          update: _sinon.default.stub().rejects(new _validationError.default(propertyErrors, baseError))
        });
        record = new _baseRecord.default(params, resource);
        this.returnedValue = await record.update(newParams);
      });
      it('stores validation baseError', function () {
        (0, _chai.expect)(record.baseError).to.deep.equal(baseError);
      });
      it('stores validation errors', function () {
        (0, _chai.expect)(record.error('param2')).to.deep.equal(propertyErrors.param2);
      });
      it('returns itself', function () {
        (0, _chai.expect)(this.returnedValue).to.equal(record);
      });
    });
  });
  describe('#isValid', function () {
    it('returns true when there are no errors', function () {
      record.errors = {};
      (0, _chai.expect)(record.isValid()).to.equal(true);
    });
    it('returns false when there is at least on error', function () {
      record.errors = {
        pathWithError: {
          type: 'required',
          message: 'I am error'
        }
      };
      (0, _chai.expect)(record.isValid()).to.equal(false);
    });
  });
  describe('#title', function () {
    const properties = [new _baseProperty.default({
      path: 'name'
    })];
    params = {
      name: 'john',
      _id: '1381723981273'
    };
    it('returns value in title property', function () {
      const resource = _sinon.default.createStubInstance(_baseResource.default, {
        properties: _sinon.default.stub().returns(properties)
      });
      record = new _baseRecord.default(params, resource);
      (0, _chai.expect)(record.title()).to.equal(params.name);
    });
  });
  describe('#populate', function () {
    it('sets populated field', function () {
      const populated = {
        value: new _baseRecord.default({}, {})
      };
      record = new _baseRecord.default(params, {});
      record.populate('value', populated.value);
      (0, _chai.expect)(record.populated.value).to.equal(populated.value);
    });
    it('clears populated field when record is null or undefined', () => {
      record = new _baseRecord.default(params, {});
      record.populate('value', 'something');
      (0, _chai.expect)(() => {
        record.populate('value', null);
      }).to.alter(() => record.populated.value, {
        from: 'something',
        to: undefined
      });
    });
  });
  describe('#toJSON', () => {
    const param = 'populatedProperty';
    let resource;
    beforeEach(() => {
      resource = _sinon.default.createStubInstance(_baseResource.default, {
        properties: _sinon.default.stub().returns([]),
        decorate: _sinon.default.stub().returns(_sinon.default.createStubInstance(_decorators.ResourceDecorator, {
          recordActions: _sinon.default.stub().returns([]),
          bulkActions: _sinon.default.stub().returns([])
        }))
      });
      record = new _baseRecord.default(params, resource);
    });
    it('changes populated records to JSON', () => {
      const refRecord = _sinon.default.createStubInstance(_baseRecord.default, {
        toJSON: _sinon.default.stub()
      });
      record.populate(param, refRecord);
      _sinon.default.stub(record, 'id').returns('1');
      record.toJSON();
      (0, _chai.expect)(refRecord.toJSON).to.have.been.calledOnce;
    });
    it('does not changes to JSON when in populated there is something else than BaseRecord', () => {
      record.populate(param, 'something else');
      _sinon.default.stub(record, 'id').returns('1');
      (0, _chai.expect)(() => {
        record.toJSON();
      }).not.to.throw();
    });
  });
});