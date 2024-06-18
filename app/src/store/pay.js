import { reqSubmitOrder } from "@/api/api";

export default {
  state: {
    orderId: "", // 订单id
  },
  mutations: {
    GET_ORDERID(state, orderId) {
      state.orderId = orderId;
    },
  },
  actions: {
    // 提交订单
    async submitOrder({ commit }, { orderInfo, tradeNo }) {
      const result = await reqSubmitOrder(tradeNo,orderInfo);
      console.log(result);
      if (result.data.code === 200) {
        commit("GET_ORDERID", result.data.data);
        return "success";
      } else {
        Promise.reject(new Error("failed"));
      }
    },
  },
  getters: {},
};
