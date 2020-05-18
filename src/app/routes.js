import { routes as supplies } from './supplies';
import { routes as textDataParsers } from './textDataParsers';
import { routes as variableDefinitions } from './variableDefinitions';
import { routes as contracts } from './contracts';
import { routes as users } from './users';
import { routes as dialogs } from './dialogs';
import { routes as profiles } from './profiles';
import { routes as vocabWords } from './vocabWords';
import { routes as externalNews } from './externalNews';
import { routes as employees } from './employees';
import { routes as controlTime } from './controlTime';

export default [
  ...supplies,
  ...textDataParsers,
  ...variableDefinitions,
  ...contracts,
  ...users,
  ...dialogs,
  ...profiles,
  ...vocabWords,
  ...externalNews,
  ...employees,
  ...controlTime,
];
