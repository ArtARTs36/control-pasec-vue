export default [
  {
    path: '/external-news',
    name: 'ExternalNewsList',
    component: () => import('./components/news'),
    meta: { requiresAuth: true },
  },
  {
    path: '/external-news/:id/edit',
    name: 'ExternalNewsEdit',
    component: () => import('./components/news-edit'),
    meta: { requiresAuth: true },
  },
];
