import Vue from 'vue'
import store from './store'

// vuex-i18n
import vuexI18n from 'vuex-i18n'
import translateJp from './lang/jp.json'
import translateZn from './lang/zh.json'
import translateCn from './lang/cn.json'
Vue.use(vuexI18n.plugin, store);
Vue.i18n.add('jp', translateJp);
Vue.i18n.add('zh', translateZn);
Vue.i18n.add('cn', translateCn);
Vue.i18n.set('jp'); // Set default locale
