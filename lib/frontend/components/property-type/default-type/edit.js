function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, memo, useEffect } from 'react';
import { Input, FormMessage, FormGroup, Select } from '@adminjs/design-system';
import { recordPropertyIsEqual } from '../record-property-is-equal';
import { PropertyLabel } from '../utils/property-label';
import allowOverride from '../../../hoc/allow-override';
const Edit = props => {
  const {
    property,
    record
  } = props;
  const error = record.errors?.[property.path];
  return /*#__PURE__*/React.createElement(FormGroup, {
    error: Boolean(error)
  }, /*#__PURE__*/React.createElement(PropertyLabel, {
    property: property
  }), property.availableValues ? /*#__PURE__*/React.createElement(SelectEdit, props) : /*#__PURE__*/React.createElement(TextEdit, props), /*#__PURE__*/React.createElement(FormMessage, null, error && error.message));
};
const SelectEdit = props => {
  const {
    record,
    property,
    onChange
  } = props;
  if (!property.availableValues) {
    return null;
  }
  const propValue = record.params?.[property.path] ?? '';
  const selected = property.availableValues.find(av => av.value === propValue);
  return /*#__PURE__*/React.createElement(Select, _extends({
    value: selected,
    options: property.availableValues,
    onChange: s => onChange(property.path, s?.value ?? ''),
    isDisabled: property.isDisabled
  }, property.props));
};
const TextEdit = props => {
  const {
    property,
    record,
    onChange
  } = props;
  const propValue = record.params?.[property.path] ?? '';
  const [value, setValue] = useState(propValue);
  useEffect(() => {
    if (value !== propValue) {
      setValue(propValue);
    }
  }, [propValue]);
  return /*#__PURE__*/React.createElement(Input, _extends({
    id: property.path,
    name: property.path,
    required: property.isRequired,
    onChange: e => setValue(e.target.value),
    onBlur: () => onChange(property.path, value)
    // handle clicking ENTER
    ,
    onKeyDown: e => e.keyCode === 13 && onChange(property.path, value),
    value: value,
    disabled: property.isDisabled
  }, property.props));
};
export default allowOverride(/*#__PURE__*/memo(Edit, recordPropertyIsEqual), 'DefaultEditProperty');