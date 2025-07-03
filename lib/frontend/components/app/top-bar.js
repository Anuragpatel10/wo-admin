import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { cssClass, Box, Icon, themeGet } from '@adminjs/design-system';
import allowOverride from '../../hoc/allow-override';
import LoggedIn from './logged-in';
import Version from './version';
const NavBar = styled(Box)`
  height: ${({
  theme
}) => theme.sizes.navbarHeight};
  border-bottom: ${themeGet('borders', 'default')};
  background: ${({
  theme
}) => theme.colors.white};
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
`;
NavBar.defaultProps = {
  className: cssClass('NavBar')
};
const TopBar = props => {
  const {
    toggleSidebar
  } = props;
  const [session, paths, versions] = useSelector(state => [state.session, state.paths, state.versions]);
  return /*#__PURE__*/React.createElement(NavBar, {
    "data-css": "topbar"
  }, /*#__PURE__*/React.createElement(Box, {
    py: "lg",
    px: ['default', 'lg'],
    onClick: toggleSidebar,
    display: ['block', 'block', 'block', 'block', 'none'],
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: "Menu",
    size: 32,
    color: "grey100"
  })), /*#__PURE__*/React.createElement(Version, {
    versions: versions
  }), session && session.email ? /*#__PURE__*/React.createElement(LoggedIn, {
    session: session,
    paths: paths
  }) : '');
};
const OverridableTopbar = allowOverride(TopBar, 'TopBar');
export { OverridableTopbar as default, OverridableTopbar as TopBar };