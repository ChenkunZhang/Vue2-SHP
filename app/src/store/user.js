import { reqRegister, reqSendCode,reqLogin} from "@/api/api";

export default {
  state: {
    // 验证码
    code: "",
    token: "",
  },
  mutations: {
    // 获取验证码
    RECIEVE_CODE(state, code) {
      state.code= code;
    },
    // 获取用户信息
    RECIEVE_USERINFO(state, token) {
      state.token= token;
    },
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
      if (result.data.code === 200) {
        commit("RECIEVE_TOKEN", result.data.data.token);
      } else {
        return Promise.reject(new Error("failed"));
      }
    }
  },
  getters: {},
};
