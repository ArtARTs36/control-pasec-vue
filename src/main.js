import Vue from 'vue'
import Vuesax from 'vuesax'
import Axios from 'axios';


import App from './App.vue'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
// Vuex Store
import store from './store/store'


// Theme Configurations
import 'prismjs'
import 'prismjs/themes/prism.css'
import VsPrism from './components/prism/VsPrism.vue';
Vue.component(VsPrism.name, VsPrism);

Vue.prototype.$axios = Axios;

// Vue Router
import router from './router'
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(Vuesax)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
import '@/assets/scss/style.scss'

window.API_URL = 'http://localhost:8000';
window.API_VOCAB_URL = API_URL + '/vocab';
window.API_VOCAB_GOS_STANDARDS_INDEX = API_VOCAB_URL + '-gos-standards/';
window.API_VOCAB_BANKS_INDEX = API_VOCAB_URL + '-banks/';
window.API_VOCAB_QUANTITIES_INDEX = API_VOCAB_URL + '-quantity-units/';
window.API_VOCAB_CURRENCIES_INDEX = API_VOCAB_URL + '-currencies/';
window.API_EXTERNAL_NEWS_INDEX = API_URL + '/external-news/';
window.API_PRODUCTS_INDEX = API_URL + '/products';

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

window.duplicate = function (object) {
  return Object.assign({}, object);
};

window.downloadDocument = function (id) {
  return API_URL + '/documents/' + id + '/download';
};

