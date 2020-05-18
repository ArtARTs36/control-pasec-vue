export default [
  {
    path: '/employees',
    name: 'EmployeesList',
    component: () => import('./components/employees'),
    meta: { requiresAuth: true },
  },
  {
    path: '/employees/:id',
    name: 'EmployeeEdit',
    component: () => import('./components/employee-edit'),
    meta: { requiresAuth: true },
  },
  {
    path: '/employees/add',
    name: 'EmployeeAdd',
    component: () => import('./components/employee-edit'),
    meta: { requiresAuth: true },
  },
];
