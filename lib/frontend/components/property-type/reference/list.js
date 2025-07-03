import React from 'react';
import ReferenceValue from './reference-value';
import allowOverride from '../../../hoc/allow-override';
const List = props => /*#__PURE__*/React.createElement(ReferenceValue, props);
export default allowOverride(List, 'DefaultReferenceListProperty');