import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonCSS, Icon } from '@adminjs/design-system';
import { useSelector } from 'react-redux';
import allowOverride from '../../../hoc/allow-override';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledLink = styled(({
  rounded,
  ...rest
}) => /*#__PURE__*/React.createElement(RouterLink, rest))`${ButtonCSS}`;
const StyledBackButton = props => {
  const {
    showInDrawer
  } = props;
  const {
    previousRoute
  } = useSelector(state => state.drawer);
  const {
    from = {}
  } = useSelector(state => state.router);
  const cssCloseIcon = showInDrawer ? 'ChevronRight' : 'ChevronLeft';
  const backLink = useMemo(() => {
    if (!showInDrawer) {
      return from?.pathname;
    }
    if (previousRoute?.pathname) {
      return previousRoute?.pathname;
    }
    return from?.pathname;
  }, [previousRoute, from]);
  return /*#__PURE__*/React.createElement(StyledLink, {
    size: "icon",
    to: backLink,
    rounded: true,
    mr: "lg",
    type: "button"
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: cssCloseIcon
  }));
};
const OverridableStyledBackButton = allowOverride(StyledBackButton, 'StyledBackButton');
export { OverridableStyledBackButton as default, OverridableStyledBackButton as StyledBackButton };