import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

// Tell Vue to use the router
Vue.use(VueRouter);

// Import the pages
import routes from "./routes";

//需要重写VueRouter.prototype原型对象身上的push|replace方法
let originPush = VueRouter.prototype.push; //保存原始的push方法
let originReplace = VueRouter.prototype.replace; //保存原始的replace方法

//重写VueRouter.prototype的push方法
VueRouter.prototype.push = function (location, resolve, reject) {
  //push方法有三个参数
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有传递第二个参数|第三个参数（箭头函数）
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype的replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// Create a new router instance
let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // 返回y=0，代表滚动条在最上方
    return { y: 0 };
  },
});
// 使用 beforeEach 钩子
router.beforeEach(async (to,from,next)=>{
  let token = store.state.user.token;
  let username = store.state.user.userInfo.name;
  if(token){
    // 如果用户已经登录，但是访问的是登录页面或者注册页面，直接跳转到首页
    if(to.path === "/login"||to.path === "/register"){
      next("/");
    }else{
      if(username){
        // 登陆了且有用户信息，放行
        next();
      }else{
        try {
        // 登陆了且没有用户信息
        //在路由跳转之前获取用户信息且放行
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // 获取用户信息失败，清空token，跳转到登录页
          await store.dispatch('logout');
          next("/login");
        }
      }
      }
    }else{
      // 用户没有登录
      if(to.path === "/login"||to.path === "/register"||to.path === "/home"||to.path==="/search"||to.path=="shopcart"){
        //访问的是登录页或者注册页，直接放行
        next();
      }else{
        //访问的不是上述页面，跳转到主页
        next("/home");
    }
  }
}
)

export default  router;


