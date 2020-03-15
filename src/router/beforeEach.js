import localforage from 'localforage';
import store from '../store/store';
import { redirectAfterOAuth, appTestVar } from '../config';

const needAuth = auth => auth === true;

const beforeEach = (to, from, next) => {
  const auth = to.meta.requiresAuth;
  /**
   * Clears all global feedback message
   * that might be visible
   */
  store.dispatch('resetMessages');

  /**
   * If route doesn't require authentication be normally accessed.
   */
  if (!needAuth(auth)) {
    next();
    return; // return to prevent the code from continuing in its flow
    // With this flow `else` or `else if` is not necessary
  }

  /**
   * Otherwise  if authentication is required login.
   */
  store
    .dispatch('checkUserToken')
    .then(() => {
      next(); // can access the route
    })
    .catch(async () => {
      if (appTestVar !== undefined && parseInt(appTestVar, 10) === 1) {
        next({ name: 'AuthForm', query: { redirect: to } });
      } else {
        const param = new URLSearchParams(window.location.search);
        const token = param.get('access_token');
        if (token) {
          const { query } = to;
          delete query.access_token;
          delete query.access_token_ttl;

          await store.dispatch('setToken', token);
          await store.dispatch('loadUser');

          const savedNext = await localforage
            .getItem(redirectAfterOAuth)
            .catch(() => {
              return next({ ...to, query });
            });

          return savedNext
            ? Promise.resolve(next(JSON.parse(savedNext)))
            : Promise.reject(next({ ...to, query }));
        } else {
          await localforage.setItem(redirectAfterOAuth, JSON.stringify(to));

          next({ name: 'AuthForm', query: { redirect: to.name } });
        }
      }
      return null;
    });
};

export default beforeEach;
