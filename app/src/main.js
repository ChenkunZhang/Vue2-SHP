import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import TypeNav from "@/components/TypeNav";


Vue.config.productionTip = false; // Disabling the production tip

// Registering the global component
Vue.component(TypeNav.name, TypeNav);

new Vue({
  render: (h) => h(App),
  router, // Add the router to the Vue instance
  store, // Add the store to the Vue instance
}).$mount("#app");
