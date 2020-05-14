import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import routes from './routes';
import axios from 'axios'
import VueCurrencyInput from 'vue-currency-input'
import VueCurrencyFilter from 'vue-currency-filter'


//VueCurrencyFilter
Vue.use(VueCurrencyFilter,{
  symbol : 'Rp',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})
//---------------------------

// VueCurrencyInput
const pluginOptions = {
  /* see config reference */
  globalOptions: { currency: 'USD'}
}
Vue.use(VueCurrencyInput, pluginOptions)
// --------------------------------------

Vue.prototype.$http = axios

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// VueRouter
Vue.use(VueRouter)
const router = new VueRouter({mode: 'history', routes});
//-------------------------------------------------------

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
