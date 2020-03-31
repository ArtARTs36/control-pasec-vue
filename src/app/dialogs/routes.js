export default [
  {
    path: '/dialogs',
    name: 'DialogsList',
    component: () => import('./components/dialogs'),
    meta: { requiresAuth: true },
  },
  {
    path: '/dialogs/:id/view',
    name: 'DialogView',
    component: () => import('./components/dialog-view'),
    meta: { requiresAuth: true },
  },
];
