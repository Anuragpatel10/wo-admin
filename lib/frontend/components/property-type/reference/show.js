import React from 'react';
import { ValueGroup } from '@adminjs/design-system';
import ReferenceValue from './reference-value';
import allowOverride from '../../../hoc/allow-override';
const Show = props => {
  const {
    property,
    record
  } = props;
  return /*#__PURE__*/React.createElement(ValueGroup, {
    label: property.label
  }, /*#__PURE__*/React.createElement(ReferenceValue, {
    property: property,
    record: record
  }));
};
export default allowOverride(Show, 'DefaultReferenceShowProperty');