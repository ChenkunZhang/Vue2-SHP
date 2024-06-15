<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(image, index) in skuImageList"
        :key="image.id"
      >
        <img
          :src="image.imgUrl"
          :class="{ active: currentIndex == index }"
          @click="changeCurrentIndex(index)"
        />
      </div>
    </div>
    <!-- 如果需要前进后退按钮 -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import Vue from "vue";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    initSwiper() {
      new Swiper(".swiper-container", {
            // Optional parameters
            direction: "horizontal",
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            //显示几个图片设置
            slidesPerView: 3,
            //每一次切换图片个数
            slidesPerGroup: 1,
          });
    },
    changeCurrentIndex(index) {
      this.currentIndex = index;
      this.$bus.$emit('getCurrentIndex',this.currentIndex);
    },
  },
  watch: {
    skuImageList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.initSwiper();
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>