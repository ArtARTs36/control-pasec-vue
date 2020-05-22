export default [
  {
    path: '/tech-support/reports/:id',
    name: 'TechSupportReport',
    component: () => import('./components/report'),
    meta: { requiresAuth: true },
  },
];
