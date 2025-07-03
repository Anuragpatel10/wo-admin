function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import styled from 'styled-components';
import { Box, DrawerContent, DrawerFooter } from '@adminjs/design-system';
import allowOverride from '../../../hoc/allow-override';
const StyledWrapperWithFilter = styled(Box)`
  & > ${DrawerContent} {
    background: ${({
  theme
}) => theme.colors.white};
    padding: ${({
  theme
}) => theme.space.xxl};
    overflow: visible;
  }

  & > ${DrawerFooter} {
    background: ${({
  theme
}) => theme.colors.white};
    padding: 0 ${({
  theme
}) => theme.space.xxl} ${({
  theme
}) => theme.space.xxl};
  }
`;
const StyledWrapper = styled(Box)`
  & ${DrawerContent} {
    background: ${({
  theme
}) => theme.colors.white};
    padding: ${({
  theme
}) => theme.space.xxl};
    overflow: visible;
  }

  & ${DrawerFooter} {
    background: ${({
  theme
}) => theme.colors.white};
    padding: 0 ${({
  theme
}) => theme.space.xxl} ${({
  theme
}) => theme.space.xxl};
  }
`;
const Wrapper = props => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    children,
    variant,
    color,
    showFilter = false,
    ...rest
  } = props;
  const Component = showFilter ? StyledWrapperWithFilter : StyledWrapper;
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    variant: "grey",
    mx: "auto",
    "data-css": "styled-wrapper"
  }), children);
};
export default allowOverride(Wrapper, 'RouteWrapper');