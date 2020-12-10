export default [
    {
        name: 'Calendar',
        path: '/calendar',
        component: () => import(/* webpackChunkName: "supplies" */ './components/calendar'),
        meta: { requiresAuth: true },
    },
];
