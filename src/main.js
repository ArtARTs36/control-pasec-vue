import Vue from 'vue'
import Vuesax from 'vuesax'
import Axios from 'axios';
import RootApp from './Root.vue'

import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
// Vuex Store
import store from './store/store'

import 'prismjs'
import 'prismjs/themes/prism.css'
import VsPrism from './components/prism/VsPrism.vue';
Vue.component(VsPrism.name, VsPrism);

Vue.prototype.$axios = Axios;

Vue.use(Vuesax);

// Vue Router
import index from './router/index'
Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  store,
  router: index,
  render: h => h(RootApp),
}).$mount('#app');

import '@/assets/scss/style.scss'
import {apiPath} from "./config";

window.API_URL = apiPath;
window.API_VARIABLE_DEFINITION_INDEX = API_URL + '/variable-definitions/';
window.API_VOCAB_URL = API_URL + '/vocab';
window.API_VOCAB_GOS_STANDARDS_INDEX = API_VOCAB_URL + '-gos-standards/';
window.API_VOCAB_BANKS_INDEX = API_VOCAB_URL + '-banks/';
window.API_VOCAB_QUANTITIES_INDEX = API_VOCAB_URL + '-quantity-units/';
window.API_VOCAB_CURRENCIES_INDEX = API_VOCAB_URL + '-currencies/';
window.API_EXTERNAL_NEWS_INDEX = API_URL + '/external-news/';
window.API_PRODUCTS_INDEX = API_URL + '/products';
window.API_STAT_INDEX = API_URL + '/stat';
window.API_STAT_GENERAL = API_URL + '/stat/general';
window.API_SUPPLY_INDEX = API_URL + '/supplies/';

Vue.prototype.$openModalResult = function (text) {
  this['isOpenModalResult'] = true;
  this['resultAction'] = text;
};

Vue.prototype.$closeModalResult = function () {
  this['isOpenModalResult'] = false;
  this['resultAction'] = 'empty';
};

Vue.filter('cutText', function (text, symbolsCount) {
  return text.length > symbolsCount
      ? text.slice(0, symbolsCount - 3) + '...'
      : text;
});

Vue.prototype.$openNotifyToDocCreate = function () {
  this.$vs.notify({
    title: 'Документ готовится',
    text: 'Подождите некоторое время',
    color: 'dark',
    icon: 'access_time'
  })
};

Vue.prototype.$openNotifyToDocCreated = function (document) {
  this.$vs.notify({
    title: 'Документ '+ document.title +' готов',
    text: 'Что бы скачать нажмите на это сообщение',
    color: 'primary',
    icon:'check_box',
    fixed: true,
    click: () => {
      window.open(document.download_url);
    }
  })
};

Vue.filter('decOfNum', function (number, titles) {
  return declOfNum(number, titles);
});

window.duplicate = function (object) {
  return Object.assign({}, object);
};

window.downloadDocument = function (id) {
  return API_URL + '/documents/' + id + '/download';
};

function declOfNum(number, titles)
{
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

