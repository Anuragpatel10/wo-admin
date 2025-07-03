import React from 'react';
import BooleanPropertyValue from './boolean-property-value';
import allowOverride from '../../../hoc/allow-override';
const List = props => /*#__PURE__*/React.createElement(BooleanPropertyValue, props);
export default allowOverride(List, 'DefaultBooleanListProperty');