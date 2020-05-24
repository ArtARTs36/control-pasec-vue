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
  {
    path: '/external-news-sources',
    name: 'ExternalNewsSourcesList',
    component: () => import('./components/sources'),
    meta: { requiresAuth: true },
  },
  {
    path: '/external-news-sources/:id/edit',
    name: 'ExternalNewsSourceEdit',
    component: () => import('./components/source-edit'),
    meta: { requiresAuth: true },
  },
  {
    path: '/external-news-sources/add',
    name: 'ExternalNewsSourceAdd',
    component: () => import('./components/source-edit'),
    meta: { requiresAuth: true },
  },
];
