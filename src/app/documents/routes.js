export default [
  {
    path: '/documents/:id',
    name: 'DocumentView',
    component: () => import('./components/document'),
    meta: { requiresAuth: true },
  },
];
