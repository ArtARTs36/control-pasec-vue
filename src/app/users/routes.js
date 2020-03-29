export default [
  {
    path: '/users',
    name: 'UsersList',
    component: () => import('./components/users'),
    meta: { requiresAuth: true },
  },
  {
    path: '/users/:id/edit',
    name: 'UserEdit',
    component: () => import('./components/user-edit'),
    meta: { requiresAuth: true },
  },
  {
    path: '/users/create',
    name: 'UserCreate',
    component: () => import('./components/user-edit'),
    meta: { requiresAuth: true },
  },
];
