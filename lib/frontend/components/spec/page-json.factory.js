"use strict";

var _factoryGirl = _interopRequireDefault(require("factory-girl"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_factoryGirl.default.define('PageJSON', Object, {
  name: _factoryGirl.default.sequence('PageJSON.name', n => `page${n}`),
  component: _factoryGirl.default.sequence('PageJSON.component', n => `Component${n}`)
});