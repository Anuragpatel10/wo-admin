import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Placeholder, TableRow, TableCell, CheckBox, ButtonGroup } from '@adminjs/design-system';
import PropertyType from '../../property-type';
import { buildActionClickHandler } from '../../../interfaces';
import { display } from './utils/display';
import mergeRecordResponse from '../../../hooks/use-record/merge-record-response';
import { useActionResponseHandler } from '../../../hooks';
import { actionsToButtonGroup } from '../action-header/actions-to-button-group';
import allowOverride from '../../../hoc/allow-override';
import { getResourceElementCss } from '../../../utils';
const RecordInList = props => {
  const {
    resource,
    record: recordFromProps,
    actionPerformed,
    isLoading,
    onSelect,
    isSelected
  } = props;
  const [record, setRecord] = useState(recordFromProps);
  const navigate = useNavigate();
  const handleActionCallback = useCallback(actionResponse => {
    if (actionResponse.record && !actionResponse.redirectUrl) {
      setRecord(mergeRecordResponse(record, actionResponse));
    } else if (actionPerformed) {
      actionPerformed(actionResponse);
    }
  }, [actionPerformed, record]);
  const actionResponseHandler = useActionResponseHandler(handleActionCallback);
  useEffect(() => {
    setRecord(recordFromProps);
  }, [recordFromProps]);
  const {
    recordActions
  } = record;
  const show = record.recordActions.find(({
    name
  }) => name === 'show');
  const edit = record.recordActions.find(({
    name
  }) => name === 'edit');
  const action = show || edit;
  const handleClick = event => {
    const targetTagName = event.target.tagName.toLowerCase();
    if (action && targetTagName !== 'a' && targetTagName !== 'button' && targetTagName !== 'svg') {
      buildActionClickHandler({
        action,
        params: {
          resourceId: resource.id,
          recordId: record.id
        },
        actionResponseHandler,
        navigate
      })(event);
    }
  };
  const actionParams = {
    resourceId: resource.id,
    recordId: record.id
  };
  const handleActionClick = (event, sourceAction) => buildActionClickHandler({
    action: sourceAction,
    params: actionParams,
    actionResponseHandler,
    navigate
  })(event);
  const buttons = [{
    icon: 'OverflowMenuHorizontal',
    variant: 'light',
    label: undefined,
    'data-testid': 'actions-dropdown',
    buttons: actionsToButtonGroup({
      actions: recordActions,
      params: actionParams,
      handleClick: handleActionClick
    })
  }];
  const contentTag = getResourceElementCss(resource.id, 'table-row');
  return /*#__PURE__*/React.createElement(TableRow, {
    onClick: handleClick,
    "data-id": record.id,
    "data-css": contentTag
  }, /*#__PURE__*/React.createElement(TableCell, {
    className: isSelected ? 'selected' : 'not-selected'
  }, onSelect && record.bulkActions.length ? /*#__PURE__*/React.createElement(CheckBox, {
    onChange: () => onSelect(record),
    checked: isSelected
  }) : null), resource.listProperties.map(property => {
    const cellTag = `${resource.id}-${property.name}-table-cell`;
    return /*#__PURE__*/React.createElement(TableCell, {
      style: {
        cursor: 'pointer'
      },
      key: property.propertyPath,
      "data-property-name": property.propertyPath,
      display: display(property.isTitle),
      "data-css": cellTag
    }, isLoading ? /*#__PURE__*/React.createElement(Placeholder, {
      style: {
        height: 14
      }
    }) : /*#__PURE__*/React.createElement(PropertyType, {
      key: property.propertyPath,
      where: "list",
      property: property,
      resource: resource,
      record: record
    }));
  }), /*#__PURE__*/React.createElement(TableCell, {
    key: "options"
  }, recordActions.length ? /*#__PURE__*/React.createElement(ButtonGroup, {
    buttons: buttons
  }) : ''));
};
const OverridableRecordInList = allowOverride(RecordInList, 'RecordInList');
export { OverridableRecordInList as default, OverridableRecordInList as RecordInList };