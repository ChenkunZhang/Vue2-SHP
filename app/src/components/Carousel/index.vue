<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="slide in bannerList" :key="slide.id">
        <img :src="slide.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要前进后退按钮 -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "Carousel",
  props: {
    bannerList: Array, // 从父组件传递的轮播图数据
  },
  methods: {
    initCarousel() {
      new Swiper(".swiper-container", {
        // Optional parameters
        direction: "horizontal",
        loop: true,
        // If we need pagination
        pagination: {
          el: ".swiper-pagination",
          click: true, // 点击分页器的指示点分页器会跳转到对应的图片
        },
        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // And if we need scrollbar
        /*
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            */
      });
    },
  },
  /*
    mounted() {
      //console.log(this.bannerList);
      // 要求: 创建swiper对象必须要在轮播列表页面显示之后执行才可以  ==> 否则轮播效果有问题
      initCarousel();
    },
    */
  watch: {
    bannerList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // 等待轮播图数据渲染完成之后再创建swiper对象
          this.initCarousel();
        });
      },
    },
  },
};
</script>

<style scoped lang="less">
</style>