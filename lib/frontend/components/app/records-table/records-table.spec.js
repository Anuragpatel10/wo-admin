"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _sinon = _interopRequireDefault(require("sinon"));
var _chai = require("chai");
var _factoryGirl = _interopRequireDefault(require("factory-girl"));
var _reactRedux = require("react-redux");
var _recordsTable = require("./records-table");
var _testContextProvider = _interopRequireDefault(require("../../spec/test-context-provider"));
var _store = _interopRequireDefault(require("../../../store/store"));
require("../../spec/resource-json.factory");
require("../../spec/record-json.factory");
require("../../spec/property-json.factory");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const renderSubject = props => {
  const onSelect = _sinon.default.stub();
  const onSelectAll = _sinon.default.stub();
  const renderResult = (0, _react2.render)(/*#__PURE__*/_react.default.createElement(_testContextProvider.default, null, /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: (0, _store.default)({})
  }, /*#__PURE__*/_react.default.createElement(_recordsTable.RecordsTable, _extends({}, props, {
    onSelect: onSelect,
    onSelectAll: onSelectAll
  })))));
  return {
    ...renderResult,
    onSelect,
    onSelectAll
  };
};
describe('<RecordsTable />', function () {
  let properties;
  let resource;
  let records;
  let container;
  beforeEach(async function () {
    const name = await _factoryGirl.default.build('PropertyJSON', {
      path: 'path',
      isTitle: true
    });
    properties = [await _factoryGirl.default.build('PropertyJSON', {
      path: 'id',
      isId: true
    }), name, await _factoryGirl.default.build('PropertyJSON', {
      path: 'surname'
    })];
    resource = await _factoryGirl.default.build('ResourceJSON', {
      listProperties: properties,
      titleProperty: name
    });
  });
  afterEach(function () {
    _sinon.default.restore();
  });
  context('10 records are given without bulk and list actions', function () {
    beforeEach(async function () {
      records = await _factoryGirl.default.buildMany('RecordJSON', 10, {
        params: {
          id: _factoryGirl.default.sequence('record.id'),
          name: _factoryGirl.default.sequence('record.name', n => `name ${n}`),
          surname: _factoryGirl.default.sequence('record.surname', n => `surname ${n}`)
        }
      });
      ({
        container
      } = renderSubject({
        resource,
        records,
        selectedRecords: []
      }));
    });
    it('renders each record as a separate <tr> tag', function () {
      (0, _chai.expect)(container.querySelectorAll('tbody > tr')).to.have.lengthOf(10);
    });
    it('does not render any link in the record rows', function () {
      (0, _chai.expect)(container.querySelectorAll('tbody > tr a')).to.have.lengthOf(0);
    });
    it('does not render checkbox for selecting particular record', function () {
      (0, _chai.expect)(container.querySelectorAll('tbody > tr input')).to.have.lengthOf(0);
    });
  });
  context('10 records are given with bulk delete and show actions', function () {
    beforeEach(async function () {
      records = await _factoryGirl.default.buildMany('RecordJSON', 10, {
        params: {
          id: _factoryGirl.default.sequence('record.id'),
          name: _factoryGirl.default.sequence('record.name', n => `name ${n}`),
          surname: _factoryGirl.default.sequence('record.surname', n => `surname ${n}`)
        },
        recordActions: [await _factoryGirl.default.build('ActionJSON', {
          name: 'show',
          actionType: 'record'
        })],
        bulkActions: [await _factoryGirl.default.build('ActionJSON', {
          name: 'bulkDelete',
          actionType: 'bulk'
        })]
      });
      ({
        container
      } = renderSubject({
        resource,
        records,
        selectedRecords: []
      }));
    });
    it('renders input checkbox for selecting many records', function () {
      (0, _chai.expect)(container.querySelectorAll('tbody td:first-child input')).to.have.lengthOf(10);
    });
  });
});