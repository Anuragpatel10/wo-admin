"use strict";

var _chai = require("chai");
var _populator = _interopRequireDefault(require("./populator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe('populator', () => {
  context('empty array given as params', () => {
    it('returns empty array when no records are given', async () => {
      const records = await (0, _populator.default)([]);
      (0, _chai.expect)(records).to.have.lengthOf(0);
    });
  });
});