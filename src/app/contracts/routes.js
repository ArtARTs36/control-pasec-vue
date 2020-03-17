export default [
  {
    path: '/contracts',
    name: 'ContractList',
    component: () => import('./components/contracts'),
    meta: { requiresAuth: true },
  },
  {
    path: '/contracts/:id/edit',
    name: 'ContractEdit',
    component: () => import('./components/contract-edit'),
    meta: { requiresAuth: true },
  },
  {
    path: '/contracts/create',
    name: 'ContractCreate',
    component: () => import('./components/contract-edit'),
    meta: { requiresAuth: true },
  },
];
