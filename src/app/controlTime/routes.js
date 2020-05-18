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
    path: '/times/add/',
    name: 'TimeAdd',
    component: () => import('./components/times-add'),
    meta: { requiresAuth: true },
  },
];
