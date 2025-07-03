import React from 'react';
import { ValueGroup } from '@adminjs/design-system';
import BooleanPropertyValue from './boolean-property-value';
import allowOverride from '../../../hoc/allow-override';
const Show = props => {
  const {
    property
  } = props;
  return /*#__PURE__*/React.createElement(ValueGroup, {
    label: property.label
  }, /*#__PURE__*/React.createElement(BooleanPropertyValue, props));
};
export default allowOverride(Show, 'DefaultBooleanShowProperty');