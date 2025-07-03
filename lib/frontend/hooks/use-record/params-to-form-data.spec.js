"use strict";

var _factoryGirl = _interopRequireDefault(require("factory-girl"));
var _chai = require("chai");
var _paramsToFormData = _interopRequireWildcard(require("./params-to-form-data"));
require("../../components/spec/record-json.factory");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe('recordToFormData', function () {
  const propertyKey = 'someProperty';
  it('converts objects to const', async function () {
    const record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [propertyKey]: {}
      }
    });
    (0, _chai.expect)((0, _paramsToFormData.default)(record.params).get(propertyKey)).to.equal(_paramsToFormData.FORM_VALUE_EMPTY_OBJECT);
  });
  it('converts nulls to const', async function () {
    const record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [propertyKey]: null
      }
    });
    (0, _chai.expect)((0, _paramsToFormData.default)(record.params).get(propertyKey)).to.equal(_paramsToFormData.FORM_VALUE_NULL);
  });
  it('converts empty array to const', async function () {
    const record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [propertyKey]: []
      }
    });
    (0, _chai.expect)((0, _paramsToFormData.default)(record.params).get(propertyKey)).to.equal(_paramsToFormData.FORM_VALUE_EMPTY_ARRAY);
  });
  it('does not convert date to empty object', async () => {
    const date = new Date();
    const record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [propertyKey]: date
      }
    });
    (0, _chai.expect)((0, _paramsToFormData.default)(record.params).get(propertyKey)).to.equal(date.toISOString());
  });
});