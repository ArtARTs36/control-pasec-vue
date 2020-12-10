import { routes as supplies } from './supplies';
import { routes as variableDefinitions } from './variableDefinitions';
import { routes as contracts } from './contracts';
import { routes as users } from './users';
import { routes as dialogs } from './dialogs';
import { routes as profiles } from './profiles';
import { routes as vocabWords } from './vocabWords';
import { routes as externalNews } from './externalNews';
import { routes as employees } from './employees';
import { routes as controlTime } from './controlTime';
import { routes as techSupport } from './techSupport';
import { routes as documents } from './documents';
import { routes as adminServices } from './adminServices';
import { routes as security } from './security';
import { routes as contragents } from './contragents';
import { routes as landing } from './landing';
import { routes as calendar } from './calendar';

export default [
  ...supplies,
  ...variableDefinitions,
  ...contracts,
  ...users,
  ...dialogs,
  ...profiles,
  ...vocabWords,
  ...externalNews,
  ...employees,
  ...controlTime,
  ...techSupport,
  ...documents,
  ...adminServices,
  ...security,
  ...contragents,
  ...landing,
  ...calendar,
];
