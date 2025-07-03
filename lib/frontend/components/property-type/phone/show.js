import React from 'react';
import { ValueGroup } from '@adminjs/design-system';
import DefaultPropertyValue from '../default-type/default-property-value';
import allowOverride from '../../../hoc/allow-override';
const Show = props => {
  const {
    property
  } = props;
  return /*#__PURE__*/React.createElement(ValueGroup, {
    label: property.label
  }, /*#__PURE__*/React.createElement(DefaultPropertyValue, props));
};
export default allowOverride(Show, 'DefaultPhoneShowProperty');