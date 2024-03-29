import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import './Vee-validate'
import VueClipboard from 'vue-clipboard2';


Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
new Vue({
  router,
  store,
  vuetify,
  axios,

  render: h => h(App)
}).$mount('#app')
