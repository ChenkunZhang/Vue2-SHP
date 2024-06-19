// Import the pages
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";
import { before } from "lodash";

export default [
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      show: true,
    },
  },
  {
    path: "/search/:keyword?",
    name: "search",
    component: Search,
    meta: {
      show: true,
    },
  },
  {
    path: "/detail/:skuId",
    name: "detail",
    component: Detail,
    meta: {
      show: true,
    },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    meta: {
      show: true,
    },
    // beforeEnter (to, from, next) {
    //   // 得到当前路由信息对象
    //   // const route = router.currentRoute  // route就是from

    //   // 得到要跳转到目路由的query参数
    //   const skuNum = to.query.skuNum
    //   // 读取保存的数据
    //   const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
    //   console.log('---', skuNum, skuInfo)
    //   // 只有都存在, 才放行
    //   if (skuNum && skuInfo) {
    //     next()
    //   } else { // 在组件对象创建前强制跳转到首页
    //     next('/')
    //   }
    // }
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: ShopCart,
    meta: {
      show: true,
    },
  },
  {
    path: "/trade",
    name: "trade",
    component: Trade,
    meta: {
      show: true,
    },

    beforeEnter(to, from, next) {
      if (from.path == "/shopcart") {
        next();
      } else {
        next(false); // Prevent the user from accessing the page directly
      }
    },
  },
  {
    path: "/pay",
    name: "pay",
    component: Pay,
    meta: {
      show: true,
    },

    props: (route) => ({ orderId: route.query.orderId }),
    beforeEnter(to, from, next) {
      if (from.path == "/trade") {
        next();
      } else {
        next(false); // Prevent the user from accessing the page directly
      }
    }
  },
  {
    path: "/paysuccess",
    name: "paysuccess",
    component: PaySuccess,
    meta: {
      show: true,
    },
    beforeEnter(to, from, next) {
      if (from.path == "/pay") {
        next();
      } else {
        next(false); // Prevent the user from accessing the page directly
      }
    }
  },
  {
    path: "/center",
    name: "center",
    component: Center,
    children: [
      {
        path: "myorder",
        name: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        name: "grouporder",
        component: GroupOrder,
      },
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      show: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      show: false,
    },
  },
  {
    path: "*",
    name: "",
    redirect: "/home",
    meta: {
      show: true,
    },
  }, // Redirect to the home page if the route doesn't exist
];
