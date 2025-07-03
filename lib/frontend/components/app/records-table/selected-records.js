import React from 'react';
import { TableCaption, Title, ButtonGroup, Box } from '@adminjs/design-system';
import { useNavigate } from 'react-router';
import { buildActionClickHandler } from '../../../interfaces';
import getBulkActionsFromRecords from './utils/get-bulk-actions-from-records';
import { useActionResponseHandler, useTranslation } from '../../../hooks';
import { actionsToButtonGroup } from '../action-header/actions-to-button-group';
import allowOverride from '../../../hoc/allow-override';
import { getResourceElementCss } from '../../../utils';
const SelectedRecords = props => {
  const {
    resource,
    selectedRecords
  } = props;
  const {
    translateLabel
  } = useTranslation();
  const navigate = useNavigate();
  const actionResponseHandler = useActionResponseHandler();
  if (!selectedRecords || !selectedRecords.length) {
    return null;
  }
  const params = {
    resourceId: resource.id,
    recordIds: selectedRecords.map(records => records.id)
  };
  const handleActionClick = (event, sourceAction) => buildActionClickHandler({
    action: sourceAction,
    params,
    actionResponseHandler,
    navigate
  })(event);
  const bulkButtons = actionsToButtonGroup({
    actions: getBulkActionsFromRecords(selectedRecords),
    params,
    handleClick: handleActionClick
  });
  const contentTag = getResourceElementCss(resource.id, 'table-caption');
  return /*#__PURE__*/React.createElement(TableCaption, {
    "data-css": contentTag
  }, /*#__PURE__*/React.createElement(Box, {
    flex: true,
    py: "sm",
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(Title, {
    mr: "lg"
  }, translateLabel('selectedRecords', resource.id, {
    selected: selectedRecords.length
  })), /*#__PURE__*/React.createElement(ButtonGroup, {
    size: "sm",
    rounded: true,
    buttons: bulkButtons
  })));
};
const OverridableSelectedRecords = allowOverride(SelectedRecords, 'SelectedRecords');
export { OverridableSelectedRecords as default, OverridableSelectedRecords as SelectedRecords };