import { reqBaseCategoryList } from "@/api/api";

export default {
  state: {
    navData: [],
  },
  mutations: {
    setNavData(state, navData) {
      state.navData = navData;
    },
  },
  actions: {
    // 获取导航数据
    async getNavData({ commit }) {
      // 发送请求获取导航数据
      let res = await reqBaseCategoryList();
      console.log(res);
      // 判断请求是否成功
      if (res.status == 200) {
        commit("setNavData", res.data.data); // 提交给mutations{
        console.log("OK");
      }
    },
  },
  getters: {},
};
