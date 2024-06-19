import { reqSubmitOrder, reqPayment, reqPayStatus } from "@/api/api";

export default {
  state: {
    orderId: "", // 订单id
    payment: {}, // 支付信息
    payStatus: "", // 支付状态
  },
  mutations: {
    GET_ORDERID(state, orderId) {
      state.orderId = orderId;
    },
    GET_PAYMENT(state, payment) {
      state.payment = payment;
    },
    GET_PAYSTATUS(state, payStatus) {
      state.payStatus = payStatus;
    },
  },
  actions: {
    // 提交订单
    async submitOrder({ commit }, { orderInfo, tradeNo }) {
      const result = await reqSubmitOrder(tradeNo, orderInfo);
      // console.log(result);
      if (result.data.code === 200) {
        commit("GET_ORDERID", result.data.data);
        return "success";
      } else {
        Promise.reject(new Error("failed"));
      }
    },
    // 获取支付信息
    async payment({ commit }, orderId) {
      const result = await reqPayment(orderId);
      // console.log(result);
      if (result.data.code === 200) {
        commit("GET_PAYMENT", result.data.data);
        return "success";
      } else {
        Promise.reject(new Error("failed"));
      }
    },
    async payStatus({ commit }, orderId) {
      const result = await reqPayStatus(orderId);
      console.log(result);
      commit("GET_PAYSTATUS", result.data.code);
    },
  },
  getters: {},
};
