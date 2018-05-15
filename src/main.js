import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import VuexI18n from 'vuex-i18n'

import store from './store'
import translate from './translate'

import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VueMaterial);
Vue.use(VuexI18n.plugin, store);

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
