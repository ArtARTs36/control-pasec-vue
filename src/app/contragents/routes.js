export default [
  {
    path: '/contragent-groups',
    name: 'ContragentGroups',
    component: () => import('./components/Groups'),
    meta: { requiresAuth: true },
  },
  {
    path: '/contragent-groups/create',
    name: 'ContragentGroupsCreate',
    component: () => import('./components/GroupCreate'),
    meta: { requiresAuth: true },
  },
  {
    path: '/contragent-groups/:id/edit',
    name: 'ContragentGroupsEdit',
    component: () => import('./components/GroupCreate'),
    meta: { requiresAuth: true },
  },
];
