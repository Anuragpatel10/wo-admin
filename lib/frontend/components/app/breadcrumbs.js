import { Box, cssClass, Text } from '@adminjs/design-system';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ViewHelpers from '../../../backend/utils/view-helpers/view-helpers';
import allowOverride from '../../hoc/allow-override';
import { useTranslation } from '../../hooks/use-translation';
import { getActionElementCss } from '../../utils';
export const BreadcrumbLink = styled(Link)`
  color: ${({
  theme
}) => theme.colors.grey40};
  font-family: ${({
  theme
}) => theme.font};
  line-height: ${({
  theme
}) => theme.lineHeights.default};
  font-size: ${({
  theme
}) => theme.fontSizes.default};
  text-decoration: none;

  &:hover {
    color: ${({
  theme
}) => theme.colors.primary100};
  }

  &:after {
    content: '/';
    padding: 0 ${({
  theme
}) => theme.space.default};
  }

  &:last-child {
    &:after {
      content: '';
    }
  }
`;
export const BreadcrumbText = styled(Text)`
  color: ${({
  theme
}) => theme.colors.grey40};
  font-family: ${({
  theme
}) => theme.font};
  font-weight: ${({
  theme
}) => theme.fontWeights.normal.toString()};
  line-height: ${({
  theme
}) => theme.lineHeights.default};
  font-size: ${({
  theme
}) => theme.fontSizes.default};
  cursor: pointer;
  display: inline;

  &:after {
    content: '/';
    padding: 0 ${({
  theme
}) => theme.space.default};
  }

  &:last-child {
    &:after {
      content: '';
    }
  }
`;

/**
 * @memberof Breadcrumbs
 */

/**
 * @component
 * @private
 */
const Breadcrumbs = props => {
  const {
    resource,
    record,
    actionName
  } = props;
  const listAction = resource.resourceActions.find(({
    name
  }) => name === 'list');
  const action = resource.actions.find(a => a.name === actionName);
  const h = new ViewHelpers();
  const {
    translateLabel: tl
  } = useTranslation();
  const contentTag = getActionElementCss(resource.id, actionName, 'breadcrumbs');
  return /*#__PURE__*/React.createElement(Box, {
    flexGrow: 1,
    className: cssClass('Breadcrumbs'),
    "data-css": contentTag
  }, /*#__PURE__*/React.createElement(BreadcrumbLink, {
    to: h.dashboardUrl()
  }, tl('dashboard')), listAction ? /*#__PURE__*/React.createElement(BreadcrumbLink, {
    to: resource.href ? resource.href : '/',
    className: record ? 'is-active' : ''
  }, resource.name) : /*#__PURE__*/React.createElement(BreadcrumbText, null, resource.name), action && action.name !== 'list' && /*#__PURE__*/React.createElement(BreadcrumbLink, {
    to: "#"
  }, action.label));
};
const OverridableBreadcrumbs = allowOverride(Breadcrumbs, 'Breadcrumbs');
export { OverridableBreadcrumbs as default, OverridableBreadcrumbs as Breadcrumbs };