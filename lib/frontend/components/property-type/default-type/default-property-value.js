import React from 'react';
import { Badge } from '@adminjs/design-system';
import allowOverride from '../../../hoc/allow-override';
const DefaultPropertyValue = props => {
  const {
    property,
    record
  } = props;
  const rawValue = record?.params[property.path];
  if (typeof rawValue === 'undefined') {
    return null;
  }
  if (property.availableValues) {
    const option = property.availableValues.find(opt => opt.value === rawValue);
    if (!option) {
      return rawValue;
    }
    return /*#__PURE__*/React.createElement(Badge, null, option?.label || rawValue);
  }
  return rawValue;
};
export default allowOverride(DefaultPropertyValue, 'DefaultPropertyValue');