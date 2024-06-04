import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router';
import TypeNav from '@/components/TypeNav'

Vue.config.productionTip = false  // Disabling the production tip

Vue.component('TypeNav', TypeNav) // Registering the TypeNav component globally

new Vue({
  render: h => h(App),
  router // Add the router to the Vue instance
}).$mount('#app')
