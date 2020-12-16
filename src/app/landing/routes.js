export default [
  {
    path: '/landing/feedbacks',
    name: 'LandingFeedBacksList',
    component: () => import('./components/feedbacks'),
    meta: { requiresAuth: true },
  },
  {
    path: '/landing/feedbacks/:id',
    name: 'LandingFeedBackShow',
    component: () => import('./components/feedback'),
    meta: { requiresAuth: true },
  },
];
