import { reqProductList } from "@/api/api";

export default {
  state: {
    // 商品列表数据
    productList: {},
  },
  mutations: {
    // 设置商品列表数据
    setProductList(state, productList) {
      state.productList = productList;
    },
  },
  actions: {
    // 获取商品列表数据
    async getProductList({ commit }, searchParams={}) {
      // 发送请求获取商品列表数据
      let res = await reqProductList(searchParams);
      // 判断请求是否成功
      if (res.status == 200) {
        commit("setProductList", res.data.data); // 提交给mutations
        console.log("商品列表数据请求成功", res.data.data);
      }
    },
  },
  getters: {
    // 在 Vuex 3.x 中，推荐使用带有参数的 getter，因为这是 Vue 2.x 和 Vue 3.x 的共同实践，并且有助于保持代码的一致性和可读性
    trademarkList(state) {
      // console.log("state.productList.trademarkList", state.productList.trademarkList);
      return state.productList.trademarkList || []; // 确保即使在网络请求未完成或失败的情况下，应用也能优雅地处理 state.searchList.goodsList 可能为 undefined 的情况(返回默认值)。
    },
    goodsList(state) {
      return state.productList.goodsList || [];
    },
    attrsList(state) {
      return state.productList.attrsList || [];
    },
  },
};
