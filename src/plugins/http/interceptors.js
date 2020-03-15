import { isArray } from 'lodash';

export default (http, store, router) => {
  // https://github.com/mzabriskie/axios#interceptors
  http.interceptors.response.use(
    response => response,
    error => {
      const { response } = error;
      if ([401, 400].indexOf(response.status) > -1) {
        router.push({ name: 'auth' });
      } else if (response.status === 403) {
        // swal({
        //   title: 'Доступ запрещен',
        //   text: 'У вас нет прав на это действие.',
        //   icon: 'error',
        // });
      } else if (response.status === 500) {
        // swal({
        //   title: 'Что-то пошло не так',
        //   text: 'Попробуйте позже',
        //   icon: 'error',
        // });
      } else if (response.status === 409) {
        swal({
          title: 'Ошибка',
          text: response.data,
          icon: 'error',
        });
      }
      if (isArray(response.data)) {
        store.dispatch('setMessage', {
          type: 'error',
          message: response.data.messages,
        });
      } else {
        store.dispatch('setMessage', {
          type: 'validation',
          message: response.data,
        });
      }
      store.dispatch('setFetching', { fetching: false });

      return Promise.reject(error);
    },
  );
};
