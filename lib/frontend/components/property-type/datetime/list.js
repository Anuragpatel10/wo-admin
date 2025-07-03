import React from 'react';
import mapValue from './map-value';
import allowOverride from '../../../hoc/allow-override';
const List = props => {
  const {
    property,
    record
  } = props;
  const value = mapValue(record.params[property.path], property.type);
  return /*#__PURE__*/React.createElement("span", null, value);
};
export default allowOverride(List, 'DefaultDatetimeListProperty');