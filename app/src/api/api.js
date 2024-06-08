import request from "./request";

// API接口统一管理 TypeNav 三级菜单接口 /api/product/getBaseCategoryList GET
export function reqBaseCategoryList() {
  return request({ url: "/product/getBaseCategoryList", method: "get" });
}
