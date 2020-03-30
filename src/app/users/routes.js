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
  {
    path: '/roles/',
    name: 'RolesList',
    component: () => import('./components/roles'),
    meta: { requiresAuth: true },
  },
  {
    path: '/permissions/',
    name: 'PermissionsList',
    component: () => import('./components/permissions'),
    meta: { requiresAuth: true },
  },
];
