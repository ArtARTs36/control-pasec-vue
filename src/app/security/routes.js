export default [
  {
    path: '/security/logs/',
    name: 'SecurityLogs',
    component: () => import('./components/logs'),
    meta: { requiresAuth: true },
  },
];
