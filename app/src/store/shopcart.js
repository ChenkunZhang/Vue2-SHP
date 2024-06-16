import { reqShopCartList } from "@/api/api";

export default {
  state: {
    shopCartList: [],
  },
  mutations: {
    RECEIVE_SHOPCARTLIST(state, shopCartList) {
      state.shopCartList = shopCartList;
    },
  },
  actions: {
    async getShopCartList({ commit }) {
      const result = await reqShopCartList();
      if (result.code === 200) {
        commit("RECEIVE_SHOPCARTLIST", result.data.data);
      }
    },
  },
  getters: {

  },
};
