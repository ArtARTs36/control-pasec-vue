// https://vuex.vuejs.org/en/mutations.html
import cloneDeep from 'lodash/cloneDeep';
import * as TYPES from './mutations-types';

/* eslint-disable no-param-reassign */
export default {
  [TYPES.SET_TOKEN](state, value) {
    state.token = value;
  },
  [TYPES.SET_USER](state, value) {
    state.user = value;
  },
  [TYPES.SET_USER_ROLES](state, values) {
    const roles = values.map(value => value.name);
    state.roles = roles;
  },
  [TYPES.SET_USER_PERMISSIONS](state, values) {
    const permissions = values.map(value => value.name);
    state.permissions = permissions;
  },
  [TYPES.SET_SETTINGS](state, settings) {
    const data = {};
    settings.forEach(v => {
      data[v.key] = v.value;
    });
    state.settings = Object.assign(state.settings, data);
  },
  [TYPES.SOCKET_CONNECT](state) {
    state.connect = true;
  },
  [TYPES.SOCKET_DISCONNECT](state) {
    state.connect = false;
  },
  [TYPES.SOCKET_SETTINGS](state, data) {
    const settings = JSON.parse(data);
    const key = Object.keys(settings)
      .shift();
    const storeSettings = cloneDeep(state.settings);
    storeSettings[key] = settings[key];
    state.settings = storeSettings;
  },
};
