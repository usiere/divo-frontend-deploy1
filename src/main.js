import Vue from 'vue'
import App from './app'
import router from '@src/router'
import store from '@src/state/store'
import '@src/components/_globals'

import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'
import vco from 'v-click-outside'
import VueRouter from 'vue-router'
import VueFeather from 'vue-feather'
import flatPickr from 'vue-flatpickr-component'
import "font-awesome/css/font-awesome.min.css"
import Notifications from 'vue-notification'
import Toasted from 'vue-toasted';



// Import the plugin here
import { Auth0Plugin } from "./auth";

Vue.use(VueFeather)
Vue.use(flatPickr)

Vue.use(VueRouter)
Vue.use(vco)
Vue.use(Notifications)
Vue.use(Toasted)


// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueMask)

Vue.component('apexchart', VueApexCharts)
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);

// Uncomment this if you are having api served through other url or do not want to use fake backend
Vue.prototype.$http = require('axios')
Vue.prototype.$http.defaults.baseURL  = 'http://127.0.0.1:3000/'


// .. other imports

// NEW - import the audience
import { domain, clientId, audience } from "../auth_config.json";

// ..

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,   // NEW - configure the plugin with the audience value
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

// .. more Vue configuration ..

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
