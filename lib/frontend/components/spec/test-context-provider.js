import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { ThemeProvider } from 'styled-components';
import { combineStyles } from '@adminjs/design-system';
const theme = combineStyles({});
const TestContextProvider = props => {
  const {
    children,
    location
  } = props;
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(StaticRouter, {
    location: location || '/'
  }, children));
};
export default TestContextProvider;