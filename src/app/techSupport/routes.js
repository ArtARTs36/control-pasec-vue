export default [
  {
    path: '/tech-support/reports/:id',
    name: 'TechSupportReport',
    component: () => import('./components/report'),
    meta: { requiresAuth: true },
  },
  {
    path: '/tech-support/reports',
    name: 'TechSupportReportList',
    component: () => import('./components/reports'),
    meta: { requiresAuth: true },
  },
];
