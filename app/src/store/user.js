import { reqRegister, reqSendCode, reqLogin,reqGetUserInfo, reqLogout} from "@/api/api";
import { setToken, getToken, removeToken } from "@/utils/token";

export default {
  state: {
    code: "", // 验证码
    token: getToken(), //用户token
    userInfo: {}, // 用户信息
  },
  mutations: {
    // 获取验证码
    RECIEVE_CODE(state, code) {
      state.code = code;
    },
    // 获取用户信息
    RECIEVE_TOKEN(state, token) {
      state.token = token;
    },
    // 获取用户信息
    RECIEVE_USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state){
        state.userInfo = {};
        state.token = "";
        removeToken();
    }
  },
  actions: {
    // 注册
    async register({ commit }, userData) {
      const result = await reqRegister(userData);
      // console.log(result)
      if (result.data.code === 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 获取验证码
    async sendCode({ commit }, phone) {
      const result = await reqSendCode(phone);
      if (result.data.code === 200) {
        commit("RECIEVE_CODE", result.data.data);
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 登录
    async login({ commit }, data) {
      const result = await reqLogin(data);
      // console.log(result)
      //服务器下发token,用户唯一标识符，存储在本地
      let token = result.data.data.token;
      setToken(token);
      if (result.data.code === 200) {
        commit("RECIEVE_TOKEN", token);
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      const result = await reqGetUserInfo();
      //console.log(result)
      if (result.data.code === 200) {
        commit("RECIEVE_USERINFO", result.data.data);
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 退出登录
    async logout({ commit }) {
      const result = await reqLogout();
      if (result.data.code === 200) {
        commit("CLEAR");
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
  },
  getters: {},
};
