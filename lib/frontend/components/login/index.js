import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { Box, H2, H5, Label, MadeWithLove, MessageBox, Text, themeGet } from '@adminjs/design-system';
import { useTranslation } from '../../hooks';
const GlobalStyle = createGlobalStyle`
    html, body, #app {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
`;
const Wrapper = styled(Box)`
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`;
const StyledLogo = styled.img`
    max-width: 200px;
    margin: ${themeGet('space', 'md')} 0;
`;
export const Login = props => {
  const {
    action,
    message
  } = props;
  const {
    translateLabel,
    translateButton,
    translateProperty,
    translateMessage
  } = useTranslation();
  const branding = useSelector(state => state.branding);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GlobalStyle, null), /*#__PURE__*/React.createElement(Wrapper, {
    flex: true,
    variant: "grey"
  }, /*#__PURE__*/React.createElement(Box, {
    bg: "white",
    height: "440px",
    flex: true,
    boxShadow: "login",
    width: [1, 2 / 3, 'auto']
  }, /*#__PURE__*/React.createElement(Box, {
    bg: "primary100",
    color: "white",
    p: "x3",
    width: "380px",
    flexGrow: 0,
    display: ['none', 'none', 'block'],
    position: "relative"
  }, /*#__PURE__*/React.createElement(H2, {
    fontWeight: "lighter"
  }, translateLabel('loginWelcome')), /*#__PURE__*/React.createElement(Text, {
    fontWeight: "lighter",
    mt: "default"
  }, translateMessage('loginWelcome'))), /*#__PURE__*/React.createElement(Box, {
    as: "form",
    action: action,
    method: "POST",
    p: "x3",
    flexGrow: 1,
    width: ['100%', '100%', '480px']
  }, /*#__PURE__*/React.createElement(H5, {
    marginBottom: "xxl"
  }, branding.logo ? /*#__PURE__*/React.createElement(StyledLogo, {
    src: branding.logo,
    alt: branding.companyName
  }) : branding.companyName), message && /*#__PURE__*/React.createElement(MessageBox, {
    my: "lg",
    message: message.split(' ').length > 1 ? message : translateMessage(message),
    variant: "danger"
  }), /*#__PURE__*/React.createElement(Label, null, "Please Login Via Partner Portal"))), branding.withMadeWithLove ? /*#__PURE__*/React.createElement(Box, {
    mt: "xxl"
  }, /*#__PURE__*/React.createElement(MadeWithLove, null)) : null));
};
export default Login;