export default [
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('./components/profile'),
    meta: { requiresAuth: true },
  },
];
