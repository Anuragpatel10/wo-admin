import React from 'react';
import { render } from '@testing-library/react';
import factory from 'factory-girl';
import { expect } from 'chai';
import TestContextProvider from '../../spec/test-context-provider';
import RecordsTableHeader from './records-table-header';
require('../../spec/property-json.factory');
describe('<RecordsTableHeader />', function () {
  it('renders columns for selected properties and actions', async function () {
    const property = await factory.build('PropertyJSON', {
      isSortable: true
    });
    const {
      container
    } = render(/*#__PURE__*/React.createElement(TestContextProvider, null, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement(RecordsTableHeader, {
      properties: [property],
      titleProperty: property,
      sortBy: this.sortBy,
      direction: this.direction
    }))));
    expect(container.getElementsByTagName('td')).to.have.lengthOf(3);
  });
});