export default [
  {
    path: '/dialogs',
    name: 'DialogsList',
    component: () => import('./components/dialogs'),
    meta: { requiresAuth: true },
  },
];
