<template>
  <div id="app">
    <!-- 头部 -->
    <Header></Header>
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 底部 -->
    <Footer v-show='$route.meta.show'></Footer>
    <!-- 在Home与Search可见的，但是Login|Register不可见 -->
    <!-- 利用路由元信息解决当前问题好处：一行代码就可以解决 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
//引入Header与Footer非路由组件
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  name: "App",
  components: {
    Header,
    Footer
    Footer,
  },
  mounted(){
    //异步获取所有分类列表数据.在App组件中执行, 减少请求的次数.
    this.$store.dispatch("getNavData");
  }
}
};
</script>

<style>
</style>
