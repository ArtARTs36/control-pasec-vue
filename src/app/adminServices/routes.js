export default [
  {
    path: '/admin-services/redirect/:serviceName',
    name: 'AdminServiceRedirect',
    component: () => import('./components/redirect'),
    meta: { requiresAuth: true },
  },
];
