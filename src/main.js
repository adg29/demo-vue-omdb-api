import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios'

Vue.config.productionTip = false;

axios.defaults.baseURL = `http://www.omdbapi.com/?apikey=${process.env.VUE_APP_OMDB_API_KEY}&Content-Type=application/json&type=movie&`
new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
