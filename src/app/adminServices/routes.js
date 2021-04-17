export default [
  {
    path: '/admin-services/redirect/:serviceName',
    name: 'AdminServiceRedirect',
    component: () => import('./components/redirect'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/system',
    name: 'AdminSystem',
    component: () => import('./components/system'),
    meta: { requiresAuth: true },
  },
];
