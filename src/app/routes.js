import { routes as supplies } from './supplies';
import { routes as textDataParsers } from './textDataParsers';
import { routes as variableDefinitions } from './variableDefinitions';
import { routes as contracts } from './contracts';
import { routes as users } from './users';

export default [
  ...supplies,
  ...textDataParsers,
  ...variableDefinitions,
  ...contracts,
  ...users,
];
