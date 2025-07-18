"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ = require("..");
var _utils = require("../../utils");
var _decorators = require("../../decorators");
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint class-methods-use-this: 0 no-unused-vars: 0 */
/* eslint no-useless-constructor: 0 */

/**
 * Representation of a ORM Resource in AdminJS. Visually resource is a list item in the sidebar.
 * Each resource has many records and many properties.
 *
 * Analogy is REST resource.
 *
 * It is an __abstract class__ and all database adapters should implement extend it implement
 * following methods:
 *
 * - (static) {@link BaseResource.isAdapterFor isAdapterFor()}
 * - {@link BaseResource#databaseName databaseName()}
 * - {@link BaseResource#name name()}
 * - {@link BaseResource#id id()}
 * - {@link BaseResource#properties properties()}
 * - {@link BaseResource#property property()}
 * - {@link BaseResource#count count()}
 * - {@link BaseResource#find find()}
 * - {@link BaseResource#findOne findOne()}
 * - {@link BaseResource#findMany findMany()}
 * - {@link BaseResource#create create()}
 * - {@link BaseResource#update update()}
 * - {@link BaseResource#delete delete()}
 * @category Base
 * @abstract
 * @hideconstructor
 */
class BaseResource {
  /**
   * Checks if given adapter supports resource provided by the user.
   * This function has to be implemented only if you want to create your custom
   * database adapter.
   *
   * For one time Admin Resource creation - it is not needed.
   *
   * @param  {any}  rawResource resource provided in AdminJSOptions#resources array
   * @return {Boolean}          if given adapter supports this resource - returns true
   * @abstract
   */
  static isAdapterFor(rawResource) {
    throw new _utils.NotImplementedError('BaseResource.isAdapterFor');
  }

  /**
   * Creates given resource based on the raw resource object
   *
   * @param   {Object}  [resource]
   */
  constructor(resource) {
    this._decorated = null;
  }

  /**
   * The name of the database to which resource belongs. When resource is
   * a mongoose model it should be database name of the mongo database.
   *
   * Visually, by default, all resources are nested in sidebar under their database names.
   * @return {String}         database name
   * @abstract
   */
  databaseName() {
    throw new _utils.NotImplementedError('BaseResource#databaseName');
  }

  /**
   * Returns type of the database. It is used to compute sidebar icon for
   * given resource. Default: 'database'
   * @return {String}
   */
  databaseType() {
    return 'other';
  }

  /**
   * Each resource has to have uniq id which will be put to an URL of AdminJS routes.
   * For instance in {@link Router} path for the `new` form is `/resources/{resourceId}/new`
   * @return {String} uniq resource id
   * @abstract
   */
  id() {
    throw new _utils.NotImplementedError('BaseResource#id');
  }

  /**
   * returns array of all properties which belongs to resource
   * @return {BaseProperty[]}
   * @abstract
   */
  properties() {
    throw new _utils.NotImplementedError('BaseResource#properties');
  }

  /**
   * returns property object for given field
   * @param {String} path           path/name of the property. Take a look at
   *                                {@link BaseProperty} to learn more about
   *                                property paths.
   * @return {BaseProperty | null}
   * @abstract
   */
  property(path) {
    throw new _utils.NotImplementedError('BaseResource#property');
  }

  /**
   * Returns number of elements for given resource by including filters
   * @param  {Filter} filter        represents what data should be included
   * @param  {ActionContext}           [context]
   * @return {Promise<Number>}
   * @abstract
   */
  async count(filter, context) {
    throw new _utils.NotImplementedError('BaseResource#count');
  }

  /**
   * Returns actual records for given resource
   *
   * @param  {Filter} filter                        what data should be included
   * @param  {Object} options
   * @param  {Number} [options.limit]                  how many records should be taken
   * @param  {Number} [options.offset]                 offset
   * @param  {Object} [options.sort]                   sort
   * @param  {Number} [options.sort.sortBy]            sortable field
   * @param  {Number} [options.sort.direction]         either asc or desc
   * @param  {ActionContext}           [context]
   * @return {Promise<BaseRecord[]>}                          list of records
   * @abstract
   * @example
   * // filters example
   * {
   *    name: 'Tom',
   *    createdAt: { from: '2019-01-01', to: '2019-01-18' }
   * }
   */
  async find(filter, options, context) {
    throw new _utils.NotImplementedError('BaseResource#find');
  }

  /**
   * Finds one Record in the Resource by its id
   *
   * @param  {String} id      uniq id of the Resource Record
   * @param  {ActionContext}           [context]
   * @return {Promise<BaseRecord> | null}   record
   * @abstract
   */
  async findOne(id, context) {
    throw new _utils.NotImplementedError('BaseResource#findOne');
  }

  /**
   * Finds many records based on the resource ids
   *
   * @param   {Array<string>}          ids list of ids to find
   * @param  {ActionContext}           [context]
   *
   * @return  {Promise<Array<BaseRecord>>} records
   */
  async findMany(ids, context) {
    throw new _utils.NotImplementedError('BaseResource#findMany');
  }

  /**
   * Builds new Record of given Resource.
   *
   * Each Record is an representation of the resource item. Before it can be saved,
   * it has to be instantiated.
   *
   * This function has to be implemented if you want to create new records.
   *
   * @param  {Record<string, any>} params
   * @return {BaseRecord}
   */
  build(params) {
    return new _.BaseRecord(params, this);
  }

  /**
   * Creates new record
   *
   * @param  {Record<string, any>}     params
   * @param  {ActionContext}           [context]
   * @return {Promise<Object>}         created record converted to raw Object which
   *                                   can be used to initiate new {@link BaseRecord} instance
   * @throws {ValidationError}         If there are validation errors it should be thrown
   * @abstract
   */
  async create(params, context) {
    throw new _utils.NotImplementedError('BaseResource#create');
  }

  /**
   * Updates the record.
   *
   * @param  {String} id               uniq id of the Resource Record
   * @param  {Record<string, any>}     params
   * @param  {ActionContext}           [context]
   * @return {Promise<Object>}         created record converted to raw Object which
   *                                   can be used to initiate new {@link BaseRecord} instance
   * @throws {ValidationError}         If there are validation errors it should be thrown
   * @abstract
   */
  async update(id, params, context) {
    throw new _utils.NotImplementedError('BaseResource#update');
  }

  /**
   * Delete given record by id
   *
   * @param  {String | Number}           id id of the Record
   * @param  {ActionContext}           [context]
   * @throws {ValidationError}           If there are validation errors it should be thrown
   * @abstract
   */
  async delete(id, context) {
    throw new _utils.NotImplementedError('BaseResource#delete');
  }

  /**
   * Assigns given decorator to the Resource. Than it will be available under
   * resource.decorate() method
   *
   * @param  {BaseDecorator}  Decorator
   * @param  {AdminJS}       admin         current instance of AdminJS
   * @param  {ResourceOptions} [options]
   * @private
   */
  assignDecorator(admin, options = {}) {
    this._decorated = new _decorators.ResourceDecorator({
      resource: this,
      admin,
      options
    });
  }

  /**
   * Gets decorator object for given resource
   * @return {BaseDecorator | null}
   */
  decorate() {
    if (!this._decorated) {
      throw new Error('resource does not have any assigned decorator yet');
    }
    return this._decorated;
  }
}
var _default = exports.default = BaseResource;