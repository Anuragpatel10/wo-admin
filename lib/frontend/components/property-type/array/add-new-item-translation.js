import React from 'react';
import { Icon, Box } from '@adminjs/design-system';
import { useTranslation } from '../../../hooks';
const AddNewItemButton = props => {
  const {
    resource,
    property
  } = props;
  const {
    translateProperty,
    translateButton
  } = useTranslation();
  const label = translateProperty(`${property.path}.addNewItem`, resource.id, {
    defaultValue: translateButton('addNewItem', resource.id)
  });
  return /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Icon, {
    icon: "Add"
  }), label);
};
export default AddNewItemButton;