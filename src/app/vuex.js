import { isFunction } from 'lodash';
import { vuex as Auth } from './auth';

const vuex = {
  Auth,
};

const keys = Object.keys(vuex);

const modules = keys.reduce(
  (acc, key) => ({ ...acc, [key]: vuex[key].module }),
  {},
);
const plugins = keys
  .reduce((acc, key) => [...acc, vuex[key].plugin], [])
  .filter(isFunction);

/**
 * semi-functional version
 * const modules = keys.reduce((acc, key) => {
 *   acc[key] = vuex[key].module
 *   return acc // without immutability
 *   return { ...acc } // with immutability
 * }, {})
 *
 * const plugins = keys.reduce((acc, key) => {
 *   acc.push(vuex[key].plugins)
 *   return acc // without immutability
 *   return [...acc] // with immutability
 * }).filter(plugin => isFunction(plugin))
 */
// end of extraction

// Shorthand for ‘modules: modules’
export default { modules, plugins };
