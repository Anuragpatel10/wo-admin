import React from 'react';
import formatValue from './format-value';
import allowOverride from '../../../hoc/allow-override';
const List = props => {
  const {
    property,
    record
  } = props;
  const value = formatValue(record.params[property.path], property.props);
  return /*#__PURE__*/React.createElement("span", null, value);
};
export default allowOverride(List, 'DefaultCurrencyListProperty');