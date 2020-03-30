import localforage from 'localforage';
// src is a alias. see client/build/webpack.base.conf.js
import { userTokenStorageKey } from '@/config';
import { isEmpty } from 'lodash';
import * as TYPES from './mutations-types';
import * as services from '../services';
import { http } from '@/plugins/http';
import { getData } from '@/utils/get';

export const attemptLogin = ({ dispatch }, payload) => {
  dispatch('setFetching', { fetching: true });
  return services
    .postLogin(payload)
    .then(({ token, data }) => {
      dispatch('setUser', data);
      dispatch('setToken', token);
      dispatch('setFetching', { fetching: false });

      return data; // keep promise chain
    });
};

export const logout = ({ dispatch }) => {
  services.revokeToken();
  // call actions
  return Promise.all([dispatch('setToken', null), dispatch('setUser', {})])
      .then(() => {window.location.reload()});
};

export const loginAs = ({ dispatch }, id) =>
  http
    .post(`/auth/login-as/${id}`)
    .then(getData)
    .then(({ token, data }) => {
      dispatch('setUser', data);
      dispatch('setToken', token);
    })
    .then(settings => dispatch('setSettings', settings.data));

// eslint-disable-next-line no-unused-vars
export const setUser = ({ dispatch, commit }, user) => {
  commit(TYPES.SET_USER, user);
  dispatch('setUserRoles', user.roles ? user.roles : []);
  dispatch('setUserPermissions', user.permissions ? user.permissions : []);
  Promise.resolve(user); // keep promise chain
};

export const setUserRoles = ({ commit }, roles) => {
  commit(TYPES.SET_USER_ROLES, roles);
  Promise.resolve(roles);
};

export const setUserPermissions = ({ commit }, permissions) => {
  commit(TYPES.SET_USER_PERMISSIONS, permissions);
  Promise.resolve(permissions);
};

export const setSettings = ({ commit }, settings) => {
  commit(TYPES.SET_SETTINGS, settings);
  Promise.resolve(settings); // keep promise chain
};

export const socketSettings = ({ commit }, settings) => {
  commit(TYPES.SOCKET_SETTINGS, settings);
  Promise.resolve(settings); // keep promise chain
};

export const setToken = ({ commit }, payload) => {
  const token = isEmpty(payload) ? null : payload.token || payload;
  commit(TYPES.SET_TOKEN, token);
  return Promise.resolve(token); // keep promise chain
};

export const checkUserToken = ({ dispatch, state }) => {
  if (!isEmpty(state.token)) {
    return Promise.resolve(state.token);
  }

  /**
   * Token does not exist yet
   * - Recover it from localstorage
   * - Recover also the user, validating the token also
   */

  return (
    localforage
      .getItem(userTokenStorageKey)
      .then(token => {
        if (isEmpty(token)) {
          // Token is not saved in localstorage
          return Promise.reject('NO_TOKEN'); // Reject promise
        }
        // Put the token in the vuex store
        return dispatch('setToken', token); // keep promise chain
      })
      // With the token in hand, retrieves the user's data, validating the token
      .then(() => dispatch('loadUser'))
  );
};

/**
 * Retrieves updated user information
 * If something goes wrong, the user's token is probably invalid
 */
export const loadUser = ({ dispatch }) =>
  services
    .loadUserData()
    // store user's data
    .then(user => dispatch('setUser', user.data))
    .catch(() => {
      // Process failure, delete the token
      dispatch('setToken', '');
      return Promise.reject('FAIL_IN_LOAD_USER'); // keep promise chain
    });
