import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import Pagination from "@/components/Pagination";
import TypeNav from "@/components/TypeNav";
import "@/mock/mockServer"; // Load the mock server 一定要在这里引入，因为这样才能保证mockServer.js中的代码先执行，从而拦截请求
import {MessageBox,Message} from "element-ui";
Vue.config.productionTip = false; // Disabling the production tip

// Registering the global component
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);
Vue.component(Message.name,Message);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: (h) => h(App),
  router, // Add the router to the Vue instance
  store, // Add the store to the Vue instance
  beforeCreate() {
    Vue.prototype.$bus = this; // Adding a global event bus
  },
}).$mount("#app");
