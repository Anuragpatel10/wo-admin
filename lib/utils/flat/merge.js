import { flatten } from 'flat';
import { set } from './set';

/**
 * Merges params together and returns flatten result
 *
 * @param {any} params
 * @param {Array<any>} ...mergeParams
 * @returns {FlattenParams}
 * @memberof module:flat
 */
const merge = (params = {}, ...mergeParams) => {
  const flattenParams = flatten(params);

  // reverse because we merge from right
  return mergeParams.reverse().reduce((globalMemo, mergeParam) => Object.keys(mergeParam).reduce((memo, key) => set(memo, key, mergeParam[key]), globalMemo), flattenParams);
};
export { merge };