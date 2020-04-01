export default [
  {
    path: '/vocab/words',
    name: 'VocabWordsList',
    component: () => import('./components/words'),
    meta: { requiresAuth: true },
  },
  {
    path: '/vocab/words/:id/edit',
    name: 'VocabWordEdit',
    component: () => import('./components/word-edit'),
    meta: { requiresAuth: true },
  },
  {
    path: '/vocab/words/add',
    name: 'VocabWordAdd',
    component: () => import('./components/word-edit'),
    meta: { requiresAuth: true },
  },
];
