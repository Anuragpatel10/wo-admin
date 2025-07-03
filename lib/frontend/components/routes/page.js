import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ErrorBoundary from '../app/error-boundary';
import ErrorMessageBox from '../app/error-message';
import allowOverride from '../../hoc/allow-override';
const Page = () => {
  const [pages] = useSelector(state => [state.pages]);
  const params = useParams();
  const {
    pageName
  } = params;
  const [isClient, setIsClient] = useState(false);
  const currentPage = pages.find(page => page.name === pageName);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!currentPage) {
    return /*#__PURE__*/React.createElement(ErrorMessageBox, {
      title: "There is no page of given name"
    }, /*#__PURE__*/React.createElement("p", null, "Page:", /*#__PURE__*/React.createElement("b", null, ` "${pageName}" `), "does not exist."));
  }
  const Component = AdminJS.UserComponents[currentPage.component];
  if (!Component || !isClient) {
    return /*#__PURE__*/React.createElement(ErrorMessageBox, {
      title: "No component specified"
    }, /*#__PURE__*/React.createElement("p", null, "You have to specify component which will render this Page"));
  }
  return /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(Component, null));
};
export default allowOverride(Page, 'PageRoute');