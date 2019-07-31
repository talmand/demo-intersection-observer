import Vue from 'vue';
import { plugin } from 'vue-function-api';
import App from './App.vue';

import 'prismjs';
import 'prismjs/themes/prism-twilight.css';

Vue.config.productionTip = false;

Vue.use(plugin);

new Vue({
  render: h => h(App),
}).$mount('#app');
