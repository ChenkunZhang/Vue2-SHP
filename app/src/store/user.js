import { reqRegister, reqSendCode } from "@/api/api";

export default {
  state: {
    // 验证码
    code: "",
  },
  mutations: {
    // 获取验证码
    RECIEVE_CODE(state, code) {
      state.code= code;
    },
  },
  actions: {
    // 注册  
    async register({ commit }, userData) {
      const result = await reqRegister(userData);
      if (result.status === 200) {
        return "ok"; 
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 获取验证码
    async sendCode({ commit }, phone) {
      const result = await reqSendCode(phone);
      if (result.status === 200) {
        commit("RECIEVE_CODE", result.data.data);
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
  },
  getters: {},
};
