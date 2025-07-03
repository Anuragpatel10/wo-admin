import React from 'react';
import { MessageBox, Text } from '@adminjs/design-system';
import { useTranslation } from '../../hooks';

/**
 * @memberof ErrorMessageBox
 * @alias ErrorMessageBoxProps
 */

/**
 * @class
 * Prints error message
 *
 * @component
 * @private
 * @example
 * return (
 * <ErrorMessageBox title={'Some error'}>
 *   <p>Text below the title</p>
 * </ErrorMessageBox>
 * )
 */
const ErrorMessageBox = props => {
  const {
    children,
    title,
    testId
  } = props;
  return /*#__PURE__*/React.createElement(MessageBox, {
    "data-testid": testId,
    message: title
  }, /*#__PURE__*/React.createElement(Text, null, children));
};
const NoResourceError = props => {
  const {
    resourceId
  } = props;
  const {
    translateMessage
  } = useTranslation();
  return /*#__PURE__*/React.createElement(MessageBox, {
    message: "404 - PAGE NOT FOUND",
    "data-testid": "NoResourceError",
    variant: "info",
    m: "xxl"
  }, /*#__PURE__*/React.createElement(Text, null, translateMessage('error404Resource', resourceId, {
    resourceId
  })));
};
const NoActionError = props => {
  const {
    resourceId,
    actionName
  } = props;
  const {
    translateMessage
  } = useTranslation();
  return /*#__PURE__*/React.createElement(MessageBox, {
    message: "404 - PAGE NOT FOUND",
    "data-testid": "NoActionError",
    variant: "info",
    m: "xxl"
  }, /*#__PURE__*/React.createElement(Text, null, translateMessage('error404Action', resourceId, {
    resourceId,
    actionName
  })));
};
const NoRecordError = props => {
  const {
    resourceId,
    recordId
  } = props;
  const {
    translateMessage
  } = useTranslation();
  return /*#__PURE__*/React.createElement(MessageBox, {
    message: "404 - PAGE NOT FOUND",
    "data-testid": "NoRecordError",
    variant: "info",
    m: "xxl"
  }, /*#__PURE__*/React.createElement(Text, null, translateMessage('error404Record', resourceId, {
    resourceId,
    recordId
  })));
};
export { NoResourceError, NoActionError, NoRecordError, ErrorMessageBox, ErrorMessageBox as default };