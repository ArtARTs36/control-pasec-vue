import store from '../../store/store';

export default [
  {
    name: 'AuthForm',
    path: '/auth',
    component: () => import(/* webpackPrefetch: true */ './components/main'),
    meta: { requiresAuth: false },
  },
  {
    path: '/authenticate', // dirty hack remove after old portal is dead
    beforeEnter: (to, from, next) => {
      const { token } = to.query;
      store.dispatch('setToken', token);
      store.dispatch('loadUser');
      next({ name: 'dashboard' });
    },
    meta: { requiresAuth: false },
  },
];
