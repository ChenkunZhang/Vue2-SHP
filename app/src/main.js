import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false  // Disabling the production tip

// Defining the routes
new Vue({
  render: h => h(App),
}).$mount('#app')
