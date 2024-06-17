import { reqShopCartList, reqCheckCart, reqDeleteCart } from "@/api/api";

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
      if (result.status === 200) {
        commit("RECEIVE_SHOPCARTLIST", result.data.data);
      } else {
        console.log("获取购物车数据失败");
      }
    },
    async updateCheckCart({ commit }, { skuId, isChecked }) {
      const result = await reqCheckCart(skuId, isChecked);
      if (result.status === 200) {
        console.log("切换选中状态成功");
      } else {
        console.log("切换选中状态失败");
      }
    },
    // 全选或全不选
    updateCheckCartAll({ dispatch, state }, { isChecked }) {
      const promises = state.shopCartList[0].cartInfoList.map((item) => {
        return dispatch("updateCheckCart", {
          skuId: item.skuId,
          isChecked,
        });
      });
      Promise.all(promises);
    },
    // 删除购物车商品
    async deleteCart({ commit }, { skuId }) {
      const result = await reqDeleteCart(skuId);
      if (result.status === 200) {
        console.log("删除购物车商品成功");
      } else {
        console.log("删除购物车商品失败");
      }
    },
    // 删除选中的购物车商品
    async deleteAllCheckedCart({ dispatch, getters }) {
      const promises = getters.shopcartInfoList
        .filter((item) => item.isChecked === 1)
        .map((item) => {
          return dispatch("deleteCart", {
            skuId: item.skuId,
          });
        });
      // Promise.all() 方法返回一个 Promise 实例，此实例在所有给定的promise已被解析后解析，或者在任何给定的promise被拒绝后立即以拒绝的原因解析。
      Promise.all(promises);
    }
  },
  getters: {
    shopcartInfoList(state) {
      return state.shopCartList[0].cartInfoList || {};
    },
  },
};
