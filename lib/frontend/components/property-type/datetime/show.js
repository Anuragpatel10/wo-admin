import React from 'react';
import { ValueGroup } from '@adminjs/design-system';
import allowOverride from '../../../hoc/allow-override';
import mapValue from './map-value';
const Show = props => {
  const {
    property,
    record
  } = props;
  const value = mapValue(record.params[property.path], property.type);
  return /*#__PURE__*/React.createElement(ValueGroup, {
    label: property.label
  }, value);
};
export default allowOverride(Show, 'DefaultDatetimeShowProperty');