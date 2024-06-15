<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    imgUrl() {
      return this.skuImageList[this.currentIndex].imgUrl || "";
    },
  },
  methods: {
    //修改当前响应式数据
    changeCurrentIndex(index) {
      this.currentIndex = index;
    },
    //鼠标移动事件处理函数
    handler(event) {
      //放大镜的放大倍数
      let zoomRatio = 2;
      //获取事件源
      let mask = this.$refs.mask; //放在div mask标签上
      let big = this.$refs.big; // ref="big" 放在img标签上
      //获取鼠标在事件源中的坐标
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      //边界检测
      if (left <= 0) {
        left = 0;
      }
      if (top <= 0) {
        top = 0;
      }
      if (left >= mask.offsetWidth) {
        left = mask.offsetWidth;
      }
      if (top >= mask.offsetHeight) {
        top = mask.offsetHeight;
      }
      //设置mask的位置
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      //设置big的位置
      big.style.left = left * -zoomRatio + "px";
      big.style.top = top * -zoomRatio + "px";
    },
  },
  mounted() {
    //监听事件
    this.$bus.$on("getCurrentIndex", (index) => {
      //修改当前响应式数据
      this.changeCurrentIndex(index);
    });
  },
  beforeDestroy() {
    //解绑事件
    this.$bus.$off("getCurrrentIndex");
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>