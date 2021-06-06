export default [
    {
        name: 'SupplyList',
        path: '/supplies',
        component: () => import(/* webpackChunkName: "supplies" */ './components/supplies'),
        meta: { requiresAuth: true },
    },
    {
        path: '/supplies/create',
        name: 'SupplyCreate',
        component: () => import('./components/supply-edit'),
        meta: { requiresAuth: true },
    },
    {
        path: '/supplies/:id/edit',
        name: 'SupplyEdit',
        component: () => import('./components/supply-edit'),
        meta: { requiresAuth: true },
    },
    {
        path: '/supplies/create-many',
        name: 'CreateMany',
        component: () => import('./components/CreateManySelectCustomers'),
        meta: { requiresAuth: true },
    },
    {
        path: '/supplies/workflow',
        name: 'SupplyWorkflow',
        component: () => import('./components/workflow'),
        meta: { requiresAuth: true },
    },
    {
        path: '/supplies/:id/history',
        name: 'SupplyWorkflowHistory',
        component: () => import('./components/workflow-history'),
        meta: { requiresAuth: true },
    },
];
