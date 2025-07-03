import React from 'react';
import { Text, Button, Icon, InfoBox } from '@adminjs/design-system';
import { useTranslation } from '../../../hooks';
import allowOverride from '../../../hoc/allow-override';
import ActionButton from '../action-button/action-button';
const NoRecordsOriginal = props => {
  const {
    resource
  } = props;
  const {
    translateButton,
    translateMessage
  } = useTranslation();
  const canCreate = resource.resourceActions.find(a => a.name === 'new');
  return /*#__PURE__*/React.createElement(InfoBox, {
    title: translateMessage('noRecords', resource.id)
  }, /*#__PURE__*/React.createElement(Text, {
    mb: "xxl"
  }, translateMessage('noRecordsInResource', resource.id)), canCreate ? /*#__PURE__*/React.createElement(ActionButton, {
    action: canCreate,
    resourceId: resource.id
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: "Add"
  }), translateButton('createFirstRecord', resource.id))) : '');
};

// This hack prevents rollup from throwing an error
const NoRecords = allowOverride(NoRecordsOriginal, 'NoRecords');
export { NoRecords };
export default NoRecords;