import React from 'react';
import factory from 'factory-girl';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import Show from './show';
import TestContextProvider from '../../spec/test-context-provider';
import '../../spec/resource-json.factory';
import '../../spec/record-json.factory';
const renderTestSubject = (property, record, resource) => render(/*#__PURE__*/React.createElement(TestContextProvider, null, /*#__PURE__*/React.createElement(Show, {
  property: property,
  record: record,
  resource: resource
})));
describe('<PropertyType.Default.Show />', function () {
  let resource;
  let property;
  let record;
  beforeEach(async function () {
    property = await factory.build('PropertyJSON');
    resource = await factory.build('ResourceJSON');
  });
  it('renders regular value when it is just a string', async function () {
    record = await factory.build('RecordJSON', {
      params: {
        [property.path]: 'some Value'
      }
    });
    const {
      findByText
    } = await renderTestSubject(property, record, resource);
    const value = await findByText(record.params[property.path]);
    expect(value).not.to.be.null;
  });
  it('renders 0 when value is a 0', async function () {
    record = await factory.build('RecordJSON', {
      params: {
        [property.path]: 0
      }
    });
    const {
      findByText
    } = await renderTestSubject(property, record, resource);
    const value = await findByText(record.params[property.path].toString());
    expect(value).not.to.be.null;
  });
});