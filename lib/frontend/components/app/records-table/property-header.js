import React from 'react';
import { TableCell } from '@adminjs/design-system';
import SortLink from '../sort-link';
import allowOverride from '../../../hoc/allow-override';
const PropertyHeader = props => {
  const {
    property,
    titleProperty,
    display
  } = props;
  const isMain = property.propertyPath === titleProperty.propertyPath;
  return /*#__PURE__*/React.createElement(TableCell, {
    className: isMain ? 'main' : undefined,
    display: display
  }, property.isSortable ? /*#__PURE__*/React.createElement(SortLink, props) : property.label);
};
const OverridablePropertyHeader = allowOverride(PropertyHeader, 'PropertyHeader');
export { OverridablePropertyHeader as default, OverridablePropertyHeader as PropertyHeader };