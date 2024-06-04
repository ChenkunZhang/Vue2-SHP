<template>
  <div id="app">
    <!-- 头部 -->
    <Header></Header>
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 底部 -->
    <Footer v-show='$route.meta.show'></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
</style>
