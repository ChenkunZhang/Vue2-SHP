import service from "./request";
import mockService from "./mockRequest";

// API接口统一管理 TypeNav 三级菜单接口 /api/product/getBaseCategoryList GET
export function reqBaseCategoryList() {
  return service({ url: "/product/getBaseCategoryList", method: "get" });
}

// API接口统一管理 ProductList 商品列表接口 /api/product/list POST
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export function reqProductList(searchParams) {
  return service({ url: "/list", method: "post", data: searchParams });
}

// API接口统一管理 mock数据
// 获取banner（Home首页轮播图接口）
export function reqBannerList() {
  return mockService({ url: "/banner", method: "get" });
}
// 获取floor数据
export function reqFloorList() {
  return mockService({ url: "/floor", method: "get" });
}
