import { reqTrade,reqOrderList} from "@/api/api";

export default {
  state: {
    trade: {}, // 订单交易页信息
    orderList: {}, // 订单列表
  },
  mutations: {
    // 获取订单交易页信息
    GET_TRADE(state, trade) {
      state.trade = trade;
    },
    GET_ORDER_LIST(state, orderList) {
      state.orderList = orderList;
    }
  },
  actions: {
    // 获取订单交易页信息
    async getTrade({commit}) {
      const result = await reqTrade();
      if (result.data.code === 200) {
        commit("GET_TRADE", result.data.data);
      } else {
        Promise.reject(new Error("failed"));
      }
    },
    async getOrderList({commit}, {page, limit}) {
      const result = await reqOrderList(page, limit);
      console.log(result)
      if (result.data.code === 200) {
        commit("GET_ORDER_LIST", result.data.data);
      } else {
        Promise.reject(new Error("failed"));
      }
    }
  },
  getters: {
    // 用户地址列表
    userAddressList(state) {
      return state.trade.userAddressList || [];
    },
    detailArrayList(state) {
      return state.trade.detailArrayList || [];
    }
  },
};
