import localforage from 'localforage';
import { userTokenStorageKey } from '@/config.js';
import { setToken as httpSetToken } from '@/plugins/http';
import * as TYPES from './mutations-types';

const subscribe = store => {
  store.subscribe((mutation, { Auth }) => {
    if (TYPES.SET_TOKEN === mutation.type) {
      /**
       * Set the Axios Authorization header with the token
       */
      httpSetToken(Auth.token);

      /**
       * Sets the token to the local storage
       * for auto-login purpose
       */
      localforage.setItem(userTokenStorageKey, Auth.token);
    }
  });
};

export default store => {
  subscribe(store);
};
