import { Box, Text, ValueGroup } from '@adminjs/design-system';
import React from 'react';
import xss from 'xss';
import allowOverride from '../../../hoc/allow-override';
const Show = props => {
  const {
    property,
    record
  } = props;
  const value = record.params[property.path] || '';
  const createMarkup = html => ({
    __html: xss(html)
  });
  return /*#__PURE__*/React.createElement(ValueGroup, {
    label: property.label
  }, /*#__PURE__*/React.createElement(Box, {
    py: "xl",
    px: ['0', 'xl'],
    border: "default"
  }, /*#__PURE__*/React.createElement(Text, {
    dangerouslySetInnerHTML: createMarkup(value)
  })));
};
export default allowOverride(Show, 'DefaultRichtextShowProperty');