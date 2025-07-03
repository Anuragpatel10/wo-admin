function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { Box, Button, DrawerContent, DrawerFooter, Icon } from '@adminjs/design-system';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import allowOverride from '../../hoc/allow-override';
import useRecord from '../../hooks/use-record/use-record';
import { useTranslation } from '../../hooks/use-translation';
import { getActionElementCss } from '../../utils';
import ActionHeader from '../app/action-header/action-header';
import PropertyType from '../property-type';
import { appendForceRefresh } from './utils/append-force-refresh';
import LayoutElementRenderer from './utils/layout-element-renderer';
const New = props => {
  const {
    record: initialRecord,
    resource,
    action
  } = props;
  const {
    record,
    handleChange,
    submit: handleSubmit,
    loading,
    setRecord
  } = useRecord(initialRecord, resource.id);
  const {
    translateButton
  } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    if (initialRecord) {
      setRecord(initialRecord);
    }
  }, [initialRecord]);
  const submit = event => {
    event.preventDefault();
    handleSubmit().then(response => {
      if (response.data.redirectUrl) {
        navigate(appendForceRefresh(response.data.redirectUrl));
      }
      // if record has id === has been created
      if (response.data.record.id && !Object.keys(response.data.record.errors).length) {
        handleChange({
          params: {},
          populated: {},
          errors: {}
        });
      }
    });
    return false;
  };
  const contentTag = getActionElementCss(resource.id, action.name, 'drawer-content');
  const formTag = getActionElementCss(resource.id, action.name, 'form');
  const footerTag = getActionElementCss(resource.id, action.name, 'drawer-footer');
  const buttonTag = getActionElementCss(resource.id, action.name, 'drawer-submit');
  return /*#__PURE__*/React.createElement(Box, {
    as: "form",
    onSubmit: submit,
    flex: true,
    flexGrow: 1,
    flexDirection: "column",
    "data-css": formTag
  }, /*#__PURE__*/React.createElement(DrawerContent, {
    "data-css": contentTag
  }, action?.showInDrawer ? /*#__PURE__*/React.createElement(ActionHeader, props) : null, action.layout ? action.layout.map((layoutElement, i) => /*#__PURE__*/React.createElement(LayoutElementRenderer
  // eslint-disable-next-line react/no-array-index-key
  , _extends({
    key: i,
    layoutElement: layoutElement
  }, props, {
    where: "edit",
    onChange: handleChange,
    record: record
  }))) : resource.editProperties.map(property => /*#__PURE__*/React.createElement(PropertyType, {
    key: property.propertyPath,
    where: "edit",
    onChange: handleChange,
    property: property,
    resource: resource,
    record: record
  }))), /*#__PURE__*/React.createElement(DrawerFooter, {
    "data-css": footerTag
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    type: "submit",
    "data-css": buttonTag,
    "data-testid": "button-save",
    disabled: loading
  }, loading ? /*#__PURE__*/React.createElement(Icon, {
    icon: "Fade",
    spin: true
  }) : null, translateButton('save', resource.id))));
};
const OverridableNew = allowOverride(New, 'DefaultNewAction');
export { OverridableNew as default, OverridableNew as New };