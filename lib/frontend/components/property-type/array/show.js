function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Section, ValueGroup } from '@adminjs/design-system';
import { flat } from '../../../../utils';
import { convertToSubProperty } from './convert-to-sub-property';
import allowOverride from '../../../hoc/allow-override';
const Show = props => {
  const {
    property,
    record,
    ItemComponent
  } = props;
  const items = flat.get(record.params, property.path) || [];
  return /*#__PURE__*/React.createElement(ValueGroup, {
    label: property.label
  }, /*#__PURE__*/React.createElement(Section, null, (items || []).map((item, i) => {
    const itemProperty = convertToSubProperty(property, i);
    return /*#__PURE__*/React.createElement(ItemComponent, _extends({}, props, {
      key: itemProperty.path,
      property: itemProperty
    }));
  })));
};
export default allowOverride(Show, 'DefaultArrayShowProperty');