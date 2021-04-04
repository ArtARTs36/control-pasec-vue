export default [
  {
    path: '/plants',
    name: 'Plants',
    component: () => import('./components/Plants'),
    meta: { requiresAuth: true },
  },
  {
    path: '/plants/create',
    name: 'PlantCreate',
    component: () => import('./components/PlantCreate'),
    meta: { requiresAuth: true },
  },
  {
    path: '/plants/:id/edit',
    name: 'PlantEdit',
    component: () => import('./components/PlantCreate'),
    meta: { requiresAuth: true },
  },
];
