export default [
  {
    path: '/contragent-groups',
    name: 'ContractList',
    component: () => import('./components/ContragentGroups'),
    meta: { requiresAuth: true },
  },
];
