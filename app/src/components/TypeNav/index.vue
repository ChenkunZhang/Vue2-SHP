<template>
  <!--商品导航-->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveHidden" @mouseenter="enterDisplay">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort" >
        <!--三级联动-->
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in navData"
              :key="c1.categoryId"
            >
              <h3
                @mouseenter="changeCurrentIndex(index)"
                :class="{ cur: currentIndex == index }"
              >
                <a
                  :category1Id="c1.categoryId"
                  :categoryName="c1.categoryName"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!--二,三级分类-->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        :category2Id="c2.categoryId"
                        :categoryName="c2.categoryName"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :category3Id="c3.categoryId"
                          :categoryName="c3.categoryName"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template> 

<script>
import { mapState } from "vuex"; //引入vuex
import { throttle } from "lodash"; //引入节流函数

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  mounted() {
    // 如果不是首页，不显示
    if(this.$route.path != "/home")
      this.show = false;
    // 异步获取所有分类列表数据
    //this.$store.dispatch("getNavData"); //在App组件中执行, 减少请求的次数
  },
  computed: {
    // 获取vuex中的数据
    ...mapState({
      navData: (state) => state.home.navData,
    }),
  },
  methods: {
    // 改变当前索引
    // 节流
    changeCurrentIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 200),
    // 跳转到搜索页
    goSearch(e) { 
      if (e.target.tagName == "A") {
        this.$router.push({
          name: "search",
          params: this.$router.params||{},
          query: {
            category1Id: e.target.getAttribute("category1Id"),
            category2Id: e.target.getAttribute("category2Id"),
            category3Id: e.target.getAttribute("category3Id"),
            categoryName: e.target.getAttribute("categoryName"),
          },
        });
      }
    },
    // 鼠标移入显示
    enterDisplay() {
      //if (this.$route.path == "/home") {
        this.show = true;
      //}
    },
    // 鼠标移出隐藏
    leaveHidden() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .cur {
            background: skyblue;
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    //过渡动画
    .sort-enter, .sort-leave-to{
      height: 0px;
    } 
    .sort-leave,.sort-enter-to{
      height: 461px;
    }
    .sort-enter-active, .sort-leave-active {
      transition: all 0.5 linear;
    }
  }
}
</style>









