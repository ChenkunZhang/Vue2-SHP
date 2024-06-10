import request from "./request";
import mockRequest from "./mockRequest";

// API接口统一管理 TypeNav 三级菜单接口 /api/product/getBaseCategoryList GET
export function reqBaseCategoryList() {
  return request({ url: "/product/getBaseCategoryList", method: "get" });
}

// API接口统一管理 mock数据
// 获取banner（Home首页轮播图接口）
export function reqBannerList() {
  return mockRequest({ url: "/banner", method: "get" });
}
// 获取floor数据
export function reqFloorList() {
  return mockRequest({ url: "/floor", method: "get" });
}
