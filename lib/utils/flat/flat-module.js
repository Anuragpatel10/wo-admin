import { flatten, unflatten } from 'flat';
import { DELIMITER } from './constants';
import { selectParams } from './select-params';
import { filterOutParams } from './filter-out-params';
import { set } from './set';
import { get } from './get';
import { merge } from './merge';
import { pathToParts } from './path-to-parts';
import { removePath } from './remove-path';
/**
 * @module flat
 * @name flat
 * @new in version 3.3
 * @load ./flat.doc.md
 */
export const flat = {
  /**
   * Raw `flatten` function exported from original {@link https://www.npmjs.com/package/flat flat}
   * package.
   */
  flatten,
  /**
   * Raw `unflatten` function exported from original {@link https://www.npmjs.com/package/flat flat}
   * package.
   */
  unflatten,
  set,
  get,
  selectParams,
  filterOutParams,
  removePath,
  DELIMITER,
  pathToParts,
  merge
};