import { reqBannerList, reqBaseCategoryList, reqFloorList } from "@/api/api";

export default {
  state: {
    navData: [],
    bannerList:[],
    floorList:[],
  },
  mutations: {
    setNavData(state, navData) {
      state.navData = navData;
    },
    setBannerList(state, bannerList) {
      state.bannerList = bannerList;
    },
    setFloorList(state, floorList) {
      state.floorList = floorList;
    },
  },
  actions: {
    // 获取导航数据
    async getNavData({ commit }) {
      // 发送请求获取导航数据
      let res = await reqBaseCategoryList();
      // 判断请求是否成功
      if (res.status == 200) {
        commit("setNavData", res.data.data); // 提交给mutations{
      }
    },

    // 获取轮播图数据
    async getBannerList({ commit }) {
      // 发送请求获取轮播图数据
      let res = await reqBannerList();
      // 判断请求是否成功
      if (res.status == 200) {
        commit("setBannerList", res.data.data); // 提交给mutations
      }
    },

    // 获取楼层数据
    async getFloorList({ commit }) {
      // 发送请求获取楼层数据
      let res = await reqFloorList();
      // 判断请求是否成功
      if (res.status == 200) {
        commit("setFloorList", res.data.data); // 提交给mutations
      }
    },
  },

  getters: {},
};
