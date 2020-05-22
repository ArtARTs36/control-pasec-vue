import { isArray } from 'lodash';
import vsDialog from "@bit/lusaxweb.vuesax.functions.vs-dialog";

export default (http, store, router, Vue) => {
    Vue.use(vsDialog);
    // https://github.com/mzabriskie/axios#interceptors
    http.interceptors.response.use(
    response => response,
    error => {
      const { response } = error;
      if ([401, 400].indexOf(response.status) > -1) {
        router.push({ name: 'AuthForm' });
      } else if (response.status === 403) {
          if (response.data.permission !== undefined) {
              openAlert('У Вас нет доступа к "' + response.data.permission + '"', null, null, router)
          }
      } else if (response.status === 409) {
          openAlert(response.message ? response.message : response.data.message);
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

function openAlert(text, title, color, router){
    color = color ? color : 'red';
    title = title ? title : 'Ошибка';

    vsDialog.vsfunction({
        color, title, text,
        'accept-text': 'Закрыть',
        'cancel-text': 'Закрыть',
        'accept': function () {
            router.back();
        }
    })
}
