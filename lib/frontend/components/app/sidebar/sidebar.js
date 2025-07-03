import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Box, cssClass, themeGet } from '@adminjs/design-system';
import SidebarBranding from './sidebar-branding';
import SidebarPages from './sidebar-pages';
import SidebarFooter from './sidebar-footer';
import SidebarResourceSection from './sidebar-resource-section';
import allowOverride from '../../../hoc/allow-override';
const StyledSidebar = styled(Box)`
  transition: left 0.3s;
  top: 0;
  bottom: 0;
  flex-shrink: 0;
  overflow-y: auto;

  &.hidden {
    left: -${themeGet('sizes', 'sidebarWidth')};
  }
  &.visible {
    left: 0;
  }
`;
StyledSidebar.defaultProps = {
  position: ['absolute', 'absolute', 'absolute', 'absolute', 'inherit'],
  width: 'sidebarWidth',
  borderRight: 'default',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 50,
  bg: 'white'
};
const SidebarOriginal = props => {
  const {
    isVisible
  } = props;
  const [branding, resources, pages] = useSelector(state => [state.branding, state.resources, state.pages]);
  return /*#__PURE__*/React.createElement(StyledSidebar, {
    className: isVisible ? 'visible' : 'hidden',
    "data-css": "sidebar"
  }, /*#__PURE__*/React.createElement(SidebarBranding, {
    branding: branding
  }), /*#__PURE__*/React.createElement(Box, {
    flexGrow: 1,
    className: cssClass('Resources'),
    "data-css": "sidebar-resources"
  }, /*#__PURE__*/React.createElement(SidebarResourceSection, {
    resources: resources
  })), /*#__PURE__*/React.createElement(SidebarPages, {
    pages: pages
  }), /*#__PURE__*/React.createElement(SidebarFooter, null));
};
const Sidebar = allowOverride(SidebarOriginal, 'Sidebar');
export { Sidebar };
export default Sidebar;