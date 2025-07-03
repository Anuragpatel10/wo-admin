import React from 'react';
import DefaultPropertyValue from './default-property-value';
import allowOverride from '../../../hoc/allow-override';
const List = props => /*#__PURE__*/React.createElement(DefaultPropertyValue, props);
export default allowOverride(List, 'DefaultListProperty');