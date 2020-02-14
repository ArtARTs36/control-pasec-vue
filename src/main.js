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
window.duplicate = function (object) {
  return Object.assign({}, object);
};

window.downloadDocument = function (id) {
  return API_URL + '/documents/' + id + '/download';
};

