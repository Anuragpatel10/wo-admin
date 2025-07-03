import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import BulkDeleteAction from './bulk-delete-action';
import BaseRecord from '../../adapters/record/base-record';
import AdminJS from '../../../adminjs';
import ViewHelpers from '../../utils/view-helpers/view-helpers';
import BaseResource from '../../adapters/resource/base-resource';
import ActionDecorator from '../../decorators/action/action-decorator';
import NotFoundError from '../../utils/errors/not-found-error';
chai.use(chaiAsPromised);
describe('BulkDeleteAction', function () {
  let data;
  const request = {};
  let response;
  describe('.handler', function () {
    afterEach(function () {
      sinon.restore();
    });
    beforeEach(async function () {
      data = {
        _admin: sinon.createStubInstance(AdminJS),
        translateMessage: sinon.stub().returns('translatedMessage'),
        h: sinon.createStubInstance(ViewHelpers),
        resource: sinon.createStubInstance(BaseResource),
        action: sinon.createStubInstance(ActionDecorator)
      };
    });
    it('throws error when no records are given', async function () {
      await expect(BulkDeleteAction.handler(request, response, data)).to.rejectedWith(NotFoundError);
    });
    context('2 records were selected', function () {
      let record;
      let recordJSON;
      beforeEach(function () {
        recordJSON = {
          id: 'someId'
        };
        record = sinon.createStubInstance(BaseRecord, {
          toJSON: sinon.stub().returns(recordJSON)
        });
        data.records = [record];
      });
      it('returns all records for get request', async function () {
        request.method = 'get';
        await expect(BulkDeleteAction.handler(request, response, data)).to.eventually.deep.equal({
          records: [recordJSON]
        });
      });
      it('deletes all records for post request', async function () {
        request.method = 'post';
        await BulkDeleteAction.handler(request, response, data);
        expect(data.resource.delete).to.have.been.calledOnce;
      });
      it('returns deleted records, notice and redirectUrl for post request', async function () {
        request.method = 'post';
        const actionResponse = await BulkDeleteAction.handler(request, response, data);
        expect(actionResponse).to.have.property('notice');
        expect(actionResponse).to.have.property('redirectUrl');
        expect(actionResponse).to.have.property('records');
      });
    });
  });
});