import { ValueGroup } from '@adminjs/design-system';
import React from 'react';
import formatValue from './format-value';
import allowOverride from '../../../hoc/allow-override';
const Show = props => {
  const {
    property,
    record
  } = props;
  const value = `${record.params[property.path]}`;
  return /*#__PURE__*/React.createElement(ValueGroup, {
    label: property.label
  }, formatValue(value, property.props));
};
export default allowOverride(Show, 'DefaultCurrencyShowProperty');