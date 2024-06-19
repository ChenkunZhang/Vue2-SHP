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

// API接口统一管理 GoodsInfo 商品详情接口 /api/item/{skuId} GET
export function reqGoodsInfo(skuId) {
  return service({ url: `/item/${skuId}`, method: "get" });
}

//购物车
// API接口统一管理 加入购物车 /api/cart/addToCart/{ skuId }/{ skuNum } POST
export function reqAddToCart(skuId, skuNum) {
  return service({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
}
// API接口统一管理 切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked} GET
export function reqCheckCart(skuId, isChecked) {
  return service({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
}
// API接口统一管理 删除购物车商品 /api/cart/deleteCart/{skuId} DELETE
export function reqDeleteCart(skuId) {
  return service({ url: `/cart/deleteCart/${skuId}`, method: "delete" });
}

// API接口统一管理 获取购物车列表 /api/cart/cartList GET
export function reqShopCartList() {
  return service({ url: "/cart/cartList", method: "get" });
}

//登陆注册
// API接口统一管理 登录 /api/user/passport/register POST
export function reqRegister(data) {
  return service({
    url: "/user/passport/register",
    method: "post",
    data,
  });
}
// API接口统一管理 获取注册验证码 /api/user/passport/sendCode/phone
export function reqSendCode(phone) {
  return service({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });
}
// API接口统一管理 用户登陆 /api/user/passport/login POST
export function reqLogin(data) {
  return service({
    url: `/user/passport/login`,
    method: "post",
    data,
  });
}
// API接口统一管理 获取用户信息 /api/user/passport/auth/getUserInfo GET
export function reqGetUserInfo() {
  return service({
    url: `/user/passport/auth/getUserInfo`,
    method: "get",
  });
}
// API接口统一管理 退出登录 /api/user/passport/logout GET
export function reqLogout() {
  return service({
    url: `/user/passport/logout`,
    method: "get",
  });
}

//订单
// API接口统一管理 获取订单交易页信息 /api/order/auth/trade GET
export function reqTrade() {
  return service({
    url: `order/auth/trade`,
    method: "get",
  });
}
// API接口统一管理 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} POST
export function reqSubmitOrder(tradeNo,orderInfo) {
  return service({
    url: `order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data:orderInfo,
  });
}
// API接口统一管理 获取订单支付信息 /api/payment/weixin/createNative/{orderId} GET
export function reqPayment(orderId) {
  return service({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
}
//支付
// API接口统一管理 获取支付状态 /api/payment/weixin/queryPayStatus/${orderId} GET
export function reqPayStatus(orderId){
  return service({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
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
