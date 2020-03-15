// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http';
import { getData } from '@/utils/get';

// send login data and retrive a new token
export const postLogin = ({ email, password }) =>
  http
    .post('/api/auth/token/issue', { email, password })

    .then(getData); // .then(response => getData(response))

// get current user's data
export const loadUserData = () => http.get('/api/me')
  .then(getData);

// revoke current token
export const revokeToken = () => http.post('/auth/token/revoke')
  .then(getData);
