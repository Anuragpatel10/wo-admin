"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.populator = populator;
var _populateProperty = require("./populate-property");
/**
 * @load ./populator.doc.md
 * @param {Array<BaseRecord>} records
 * @param context
 * @new In version 3.3
 */
async function populator(records, context) {
  if (!records || !records.length) {
    return records;
  }
  const resourceDecorator = records[0].resource.decorate();
  const allProperties = Object.values(resourceDecorator.getFlattenProperties());
  const references = allProperties.filter(p => !!p.reference());
  await Promise.all(references.map(async propertyDecorator => {
    await (0, _populateProperty.populateProperty)(records, propertyDecorator, context);
  }));
  return records;
}
var _default = exports.default = populator;