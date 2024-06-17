import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store"; // 引入store

// 二次封装axios 创建axios实例
const service = axios.create({
  baseURL: "/api", // api的base_url
  timeout: 5000, // 请求超时时间5s
});

// request拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 从vuex中获取token
    if(store.state.detail.uuid_token){
      // userTempId添加到请求头中，传递给服务器（和后台商量好的数据名）
      config.headers.userTempId = store.state.detail.uuid_token;
    }
    NProgress.start();
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// response拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    NProgress.done();
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 对外暴露service
export default service;
