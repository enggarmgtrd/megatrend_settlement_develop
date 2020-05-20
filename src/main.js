import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import routes from './routes';
import axios from 'axios'
import VueCurrencyInput from 'vue-currency-input'
import VueCurrencyFilter from 'vue-currency-filter'
import './validation.js'
import VueSweetalert2 from 'vue-sweetalert2';
 
//  SweetAlert2
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
//  End SweetAlert2

// Vee-Validate---------
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize 
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("en", en);

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

// End Vee-Validate-----------

//VueCurrencyFilter
Vue.use(VueCurrencyFilter,{
  symbol : 'Rp',
  thousandsSeparator: '.',
  fractionCount: 0,
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
