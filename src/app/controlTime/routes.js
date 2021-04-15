export default [
  {
    path: '/times/',
    name: 'TimesList',
    component: () => import('./components/times'),
    meta: { requiresAuth: true },
  },
  {
    path: '/times/add/user-:employee_id',
    name: 'TimeAddByUser',
    component: () => import('./components/times-add'),
    meta: { requiresAuth: true },
  },
  {
    path: '/times/add/from-excel',
    name: 'TimeAddFromExcel',
    component: () => import('./components/times-add-from-excel'),
    meta: { requiresAuth: true },
  },
  {
    path: '/times/add/',
    name: 'TimeAdd',
    component: () => import('./components/times-add'),
    meta: { requiresAuth: true },
  },
  {
    path: '/times/reports/',
    name: 'TimeReports',
    component: () => import('./components/times-reports'),
    meta: { requiresAuth: true },
  },
];
