export default [
  {
    path: '/security/logs/',
    name: 'SecurityLogs',
    component: () => import('./components/logs'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/app-history/',
    name: 'AdminAppHistory',
    component: () => import('./components/app-history'),
    meta: { requiresAuth: true },
  },
];
