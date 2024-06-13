// Import the pages
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import detail from "@/store/detail";

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
    component: detail,
    meta: {
      show: true,
    },
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
