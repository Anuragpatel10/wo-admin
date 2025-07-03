function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { memo } from 'react';
import { DatePicker, FormGroup, FormMessage } from '@adminjs/design-system';
import { recordPropertyIsEqual } from '../record-property-is-equal';
import { PropertyLabel } from '../utils/property-label';
import allowOverride from '../../../hoc/allow-override';
const Edit = props => {
  const {
    property,
    onChange,
    record
  } = props;
  const value = record.params && record.params[property.path] || '';
  const error = record.errors && record.errors[property.path];
  return /*#__PURE__*/React.createElement(FormGroup, {
    error: !!error
  }, /*#__PURE__*/React.createElement(PropertyLabel, {
    property: property
  }), /*#__PURE__*/React.createElement(DatePicker, _extends({
    value: value,
    disabled: property.isDisabled,
    onChange: date => onChange(property.path, date),
    propertyType: property.type
  }, property.props)), /*#__PURE__*/React.createElement(FormMessage, null, error && error.message));
};
export default allowOverride(/*#__PURE__*/memo(Edit, recordPropertyIsEqual), 'DefaultDatetimeEditProperty');