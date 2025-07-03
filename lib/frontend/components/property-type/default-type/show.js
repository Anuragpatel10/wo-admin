import React from 'react';
import { ValueGroup } from '@adminjs/design-system';
import allowOverride from '../../../hoc/allow-override';
import DefaultPropertyValue from './default-property-value';
const Show = props => {
  const {
    property
  } = props;
  return /*#__PURE__*/React.createElement(ValueGroup, {
    label: property.label
  }, /*#__PURE__*/React.createElement(DefaultPropertyValue, props));
};
export default allowOverride(Show, 'DefaultShowProperty');