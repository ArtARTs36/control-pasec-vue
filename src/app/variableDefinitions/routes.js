export default [
  {
    name: 'VariableDefinitionList',
    path: '/settings/variable-definitions',
    component: () => import(/* webpackChunkName: "variableDefinitions" */ './components/definitions'),
    meta: { requiresAuth: true },
  }
];
