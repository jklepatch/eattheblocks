import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';

import drizzleVuePlugin from '@drizzle/vue-plugin';
import drizzleOptions from './drizzleOptions';

Vue.use(Vuex);
const store = new Vuex.Store({ state: {} });

Vue.use(drizzleVuePlugin, { store, drizzleOptions });

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');

