import { routes as supplies } from './supplies';
import { routes as textDataParsers } from './textDataParsers';
import { routes as variableDefinitions } from './variableDefinitions';

export default [
  ...supplies,
  ...textDataParsers,
  ...variableDefinitions,
];
