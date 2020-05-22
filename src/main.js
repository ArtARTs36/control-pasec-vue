import Vue from 'vue'
import Vuesax from 'vuesax'
import RootApp from './Root.vue'
import httpPlugin from './plugins/http';
import documentPlugin from './plugins/document';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
import '@/assets/scss/style.scss'
import {apiPath} from "./config";
// Vuex Store
import store from './store/store'

import 'prismjs'
import 'prismjs/themes/prism.css'
import VsPrism from './components/prism/VsPrism.vue';
Vue.component(VsPrism.name, VsPrism);

Vue.use(Vuesax);

// Vue Router
import router from './router/index'
Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(httpPlugin, { store, router });
Vue.use(documentPlugin);

new Vue({
  store,
  router: router,
  render: h => h(RootApp),
}).$mount('#app');

window.API_URL = apiPath;
window.API_VARIABLE_DEFINITION_INDEX = window.API_URL + '/variable-definitions/';
window.API_VOCAB_URL = window.API_URL + '/vocab';
window.API_VOCAB_GOS_STANDARDS_INDEX = window.API_VOCAB_URL + '-gos-standards/';
window.API_VOCAB_BANKS_INDEX = window.API_VOCAB_URL + '-banks/';
window.API_VOCAB_QUANTITIES_INDEX = window.API_VOCAB_URL + '-quantity-units/';
window.API_VOCAB_CURRENCIES_INDEX = window.API_VOCAB_URL + '-currencies/';
window.API_EXTERNAL_NEWS_INDEX = window.API_URL + '/external-news/';
window.API_PRODUCTS_INDEX = window.API_URL + '/products';
window.API_STAT_INDEX = window.API_URL + '/stat';
window.API_STAT_GENERAL = window.API_URL + '/stat/general';
window.API_SUPPLY_INDEX = window.API_URL + '/supplies/';
window.API_CONTROLTIME_INDEX = window.API_URL + '/controltime/times';
window.API_EMPLOYEES_INDEX = window.API_URL + '/employees';
window.API_TECH_SUPPORT_REPORTS_INDEX = window.API_URL + '/tech-support-reports/';

window.PERMISSION_SUPPLIES_EDIT = 'supplies_edit';
window.PERMISSION_SUPPLIES_VIEW = 'supplies_view';
window.PERMISSION_SUPPLIES_CREATE = 'supplies_create';
window.PERMISSION_SUPPLIES_DELETE = 'supplies_delete';

window.PERMISSION_USERS_LIST_VIEW = 'users_list_view';
window.PERMISSION_USER_CREATE = 'users_create';

window.PERMISSION_ROLE_LIST_VIEW = 'role_list_view';

window.PERMISSION_PERMISSIONS_LIST_VIEW = 'permissions_list_view';

window.PERMISSION_TECH_SUPPORT_REPORT_SHOW_LIST = 'tech_support_report_show_list';

window.CONTRAGENTS_LIST_VIEW = 'contragents_list_view';
window.CONTRAGENTS_FIND_EXTERNAL_SYSTEM = 'contragents_find_external_system';
window.VARIABLE_DEFINITIONS_LIST_VIEW = 'variable_definitions_list_view';
window.SETTINGS_VIEW = 'settings_view';

window.VOCABS_VIEW = 'vocabs_view';

window.VOCAB_GOS_STANDARD_LIST_VIEW = 'vocab_gos_standard_list_view';

window.VOCAB_BANKS_LIST_VIEW = 'vocab_banks_list_view';

window.VOCAB_PACKAGE_TYPES_LIST_VIEW = 'vocab_package_types_list_view';

window.VOCAB_QUANTITY_UNITS_LIST_VIEW = 'vocab_package_quantity_units_list_view';

window.VOCAB_CURRENCIES_LIST_VIEW = 'vocab_currencies_list_view';

window.VOCAB_WORDS_LIST_VIEW = 'vocab_words_list_view';

window.VOCAB_SIZE_OF_UNIT_LIST_VIEW = 'vocab_size_of_unit_list_view';

window.ROLE_ADMIN = 'admin';

window.USER_GENDER_MALE = 1;
window.USER_GENDER_FEMALE = 2;

window.USER_NOTIFICATION_TYPE_USER_REGISTERED = 'user_registered';
window.USER_NOTIFICATION_TECH_SUPPORT_REPORT_CREATED = 'tech_support_report_created';

window.DOCUMENT_TYPE_SCORE_FOR_PAYMENT_ID = 1;
window.DOCUMENT_TYPE_TORG_12_ID = 3;
window.DOCUMENT_TYPE_ONE_T_FORM_ID = 6;
window.DOCUMENT_TYPE_QUALITY_CERTIFICATE_ID = 4;
window.DOCUMENT_TYPE_ROLE_SYSTEM_ID = 7;

window.CONTRACTS_LIST_VIEW = 'contracts_list_view';
window.CONTRACTS_VIEW = 'contracts_view';
window.CONTRACTS_CREATE = 'contracts_create';
window.CONTRACTS_EDIT = 'contracts_edit';
window.CONTRACTS_DELETE = 'contracts_delete';

window.PRODUCTS_LIST_VIEW = 'products_list_view';
window.PRODUCTS_VIEW = 'products_view';
window.PRODUCTS_CREATE = 'products_create';
window.PRODUCTS_EDIT = 'products_edit';
window.PRODUCTS_DELETE = 'products_delete';

window.EXTERNAL_NEWS_LIST_VIEW = 'external_news_list_view';
window.EXTERNAL_NEWS_VIEW = 'external_news_view';
window.EXTERNAL_NEWS_CREATE = 'external_news_create';
window.EXTERNAL_NEWS_EDIT = 'external_news_edit';
window.EXTERNAL_NEWS_DELETE = 'external_news_delete';

window.SCORE_FOR_PAYMENTS_LIST_VIEW = 'score_for_payments_list_view';
window.SCORE_FOR_PAYMENTS_VIEW = 'score_for_payments_view';
window.SCORE_FOR_PAYMENTS_CREATE = 'score_for_payments_create';
window.SCORE_FOR_PAYMENTS_EDIT = 'score_for_payments_edit';
window.SCORE_FOR_PAYMENTS_DELETE = 'score_for_payments_delete';

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

Vue.prototype.$messageSendNotify = function () {
  this.$vs.notify({
    title: 'Успех',
    text: 'Сообщение успешно отправлено',
    color: 'success',
    icon:'check_box',
  })
};


Vue.prototype.$goodNotify = function (message) {
  this.$vs.notify({
    title: 'Успех',
    text: message,
    color: 'success',
    icon:'check_box',
  })
};

Vue.prototype.$dataUpdateNotify = function () {
  this.$goodNotify('Данные успешно обновлены');
};

Vue.filter('decOfNum', function (number, titles) {
  return declOfNum(number, titles);
});

window.duplicate = function (object) {
  return Object.assign({}, object);
};

function declOfNum(number, titles) {
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

