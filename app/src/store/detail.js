import { reqGoodsInfo,reqAddToCart } from "@/api/api";

export default {
  state: {
    goodsInfo: {},
  },
  mutations: {
    // 接收商品详情信息
    RECEIVE_GOODSINFO(state, goodsInfo) {
      state.goodsInfo = goodsInfo;
    },
  },
  actions: {
    // 获取商品详情信息
    async getGoodsInfo({ commit }, skuId) {
      const result = await reqGoodsInfo(skuId);
      if (result.status === 200) {
        commit("RECEIVE_GOODSINFO", result.data.data);
      }
    },
    async addToCart({ commit }, { skuId, skuNum }) {
      const result = await reqAddToCart(skuId, skuNum);
      if (result.status === 200) {
        return "添加购物车成功";
      } else {
        return "添加购物车失败";
      }
    }
  },
  getters: {
    categoryView(state) {
      return state.goodsInfo.categoryView || {};
    },
    skuInfo(state) {
      return state.goodsInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
      return state.goodsInfo.spuSaleAttrList || [];
    },
  },
};
