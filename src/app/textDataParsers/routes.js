export default [
    {
        name: 'TextDataParserList',
        path: '/text-data-parsers',
        component: () => import(/* webpackChunkName: "parsers" */ './components/parsers'),
        meta: { requiresAuth: true },
    }
];
