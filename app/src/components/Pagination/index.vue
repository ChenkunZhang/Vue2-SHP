<template>
  <div class="pagination">
    <!-- 上一页 -->
    <button :disabled="currentPage == 1" @click="currentpageHandler('-1')">
      上一页
    </button>
    <!-- 页码 -->
    <button
      :class="{ active: currentPage == 1 }"
      v-if="pageRange[0] > 1"
      @click="currentpageHandler(1)"
    >
      1
    </button>
    <button v-if="pageRange[0] > 2">...</button>
    <button
      v-for="page in pageRange"
      :key="page"
      @click="currentpageHandler(page)"
      :class="{ active: currentPage == page }"
    >
      {{ page }}
    </button>
    <button v-if="pageRange[pageRange.length - 1] < totalPages - 1">...</button>
    <button
      :class="{ active: currentPage == totalPages }"
      v-if="pageRange[pageRange.length - 1] < totalPages"
      @click="currentpageHandler(totalPages)"
    >
      {{ totalPages }}
    </button>
    <!-- 下一页 -->
    <button
      :disabled="currentPage == totalPages"
      @click="currentpageHandler('+1')"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共{{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      continues: 5,
    };
  },
  props: {
    pageSize: {
      type: Number,
    },
    total: {
      type: Number,
    },
    currentPage: {
      type: Number,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续的页码的起始数字与结束数字[连续页码的数字:至少5个]
    pageRange() {
      const { currentPage, continues, totalPages } = this;
      let start,
        end = 0;
      if (totalPages <= continues) {
        start = 1;
        end = totalPages;
      } else {
        start = currentPage - parseInt(continues / 2);
        end = currentPage + parseInt(continues / 2);
        if (start <= 1) {
          start = 1;
          end = continues;
        }
        if (end >= totalPages) {
          start = totalPages - continues + 1;
          end = totalPages;
        }
      }
      return Array.from({ length: end - start + 1 }, (v, k) => k + start);
      //return { start, end };
    },
  },
  methods: {
    currentpageHandler(type) {
      if (type === "-1" && this.currentPage > 1) {
        this.$emit("changeCurrentpage", this.currentPage - 1);
      }
      if (type === "+1" && this.currentPage < this.totalPages) {
        this.$emit("changeCurrentpage", this.currentPage + 1);
      }
      if (typeof type === "number") {
        this.$emit("changeCurrentpage", type);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
