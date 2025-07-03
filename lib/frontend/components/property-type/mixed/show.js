function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Section, ValueGroup } from '@adminjs/design-system';
import { convertToSubProperty } from './convert-to-sub-property';
import allowOverride from '../../../hoc/allow-override';
const Show = props => {
  const {
    property,
    ItemComponent
  } = props;
  return /*#__PURE__*/React.createElement(ValueGroup, {
    label: property.label
  }, /*#__PURE__*/React.createElement(Section, null, property.subProperties.filter(subProperty => !subProperty.isId).map(subProperty => {
    const subPropertyWithPath = convertToSubProperty(property, subProperty);
    return /*#__PURE__*/React.createElement(ItemComponent, _extends({}, props, {
      key: subPropertyWithPath.path,
      property: subPropertyWithPath
    }));
  })));
};
export default allowOverride(Show, 'DefaultMixedShowProperty');