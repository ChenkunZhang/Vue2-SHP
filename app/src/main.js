import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router';

Vue.config.productionTip = false  // Disabling the production tip

new Vue({
  render: h => h(App),
  router // Add the router to the Vue instance
}).$mount('#app')
