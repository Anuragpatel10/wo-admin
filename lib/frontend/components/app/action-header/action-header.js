/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Box, ButtonGroup, cssClass, H2, H3 } from '@adminjs/design-system';
import React from 'react';
import { useNavigate } from 'react-router';
import allowOverride from '../../../hoc/allow-override';
import { useActionResponseHandler, useTranslation } from '../../../hooks';
import { buildActionClickHandler } from '../../../interfaces/action';
import { getActionElementCss, getResourceElementCss } from '../../../utils';
import Breadcrumbs from '../breadcrumbs';
import { actionsToButtonGroup } from './actions-to-button-group';
import { StyledBackButton } from './styled-back-button';

/**
 * Header of an action. It renders Action name with buttons for all the actions.
 *
 * ### Usage
 *
 * ```
 * import { ActionHeader } from 'adminjs'
 * ```
 *
 * @component
 * @subcategory Application
 */
const ActionHeader = props => {
  const {
    resource,
    toggleFilter,
    actionPerformed,
    record,
    action,
    tag,
    omitActions
  } = props;
  const {
    translateButton
  } = useTranslation();
  const navigate = useNavigate();
  const actionResponseHandler = useActionResponseHandler(actionPerformed);
  if (action.hideActionHeader) {
    return null;
  }
  const resourceId = resource.id;
  const params = {
    resourceId,
    recordId: record?.id
  };
  const handleActionClick = (event, sourceAction) => buildActionClickHandler({
    action: sourceAction,
    params,
    actionResponseHandler,
    navigate
  })(event);
  const actionButtons = actionsToButtonGroup({
    actions: record ? record.recordActions.filter(ra => !action || action.name !== ra.name)
    // only new action should be seen in regular "Big" actions place
    : resource.resourceActions.filter(ra => ra.name === 'new' && (!action || action.name !== ra.name)),
    params,
    handleClick: handleActionClick
  });
  if (toggleFilter) {
    actionButtons.push({
      label: translateButton('filter', resource.id),
      onClick: toggleFilter,
      icon: 'SettingsAdjust',
      'data-css': getResourceElementCss(resource.id, 'filter-button')
    });
  }

  // list and new actions are special and are are always
  const customResourceButtons = actionsToButtonGroup({
    actions: action.showResourceActions ? resource.resourceActions.filter(ra => !['list', 'new'].includes(ra.name)) : [],
    params: {
      resourceId
    },
    handleClick: handleActionClick
  });
  const title = action ? action.label : resource.name;

  // styled which differs if action header is in the drawer or not
  const cssIsRootFlex = !action.showInDrawer;
  const cssHeaderMT = action.showInDrawer ? '' : 'lg';
  const cssActionsMB = action.showInDrawer ? 'xl' : 'default';
  const CssHComponent = action.showInDrawer ? H3 : H2;
  const contentTag = getActionElementCss(resourceId, action.name, 'action-header');
  return /*#__PURE__*/React.createElement(Box, {
    className: cssClass('ActionHeader'),
    "data-css": contentTag
  }, action.showInDrawer ? '' : /*#__PURE__*/React.createElement(Box, {
    flex: true,
    flexDirection: "row",
    px: ['default', 0]
  }, /*#__PURE__*/React.createElement(Breadcrumbs, {
    resource: resource,
    actionName: action.name,
    record: record
  }), /*#__PURE__*/React.createElement(Box, {
    flexShrink: 0
  }, /*#__PURE__*/React.createElement(ButtonGroup, {
    size: "sm",
    rounded: true,
    buttons: customResourceButtons
  }))), /*#__PURE__*/React.createElement(Box, {
    display: ['block', cssIsRootFlex ? 'flex' : 'block']
  }, /*#__PURE__*/React.createElement(Box, {
    mt: cssHeaderMT,
    flexGrow: 1,
    px: ['default', 0]
  }, /*#__PURE__*/React.createElement(CssHComponent, {
    mb: "lg"
  }, action.showInDrawer ? /*#__PURE__*/React.createElement(StyledBackButton, {
    showInDrawer: action.showInDrawer
  }) : '', title, tag ? /*#__PURE__*/React.createElement(Badge, {
    variant: "primary",
    ml: "default"
  }, tag) : '')), omitActions ? '' : /*#__PURE__*/React.createElement(Box, {
    mt: "xl",
    mb: cssActionsMB,
    flexShrink: 0
  }, /*#__PURE__*/React.createElement(ButtonGroup, {
    buttons: actionButtons
  }))));
};
const OverridableActionHeader = allowOverride(ActionHeader, 'ActionHeader');
export { OverridableActionHeader as default, OverridableActionHeader as ActionHeader };