<template>
    <div class="xtx-infinite-loading" ref="container">
      <div class="loading" v-if="loading">
        <span class="img"></span>
        <span class="text">正在加载...</span>
      </div>
      <div class="none" v-if="finished">
        <span class="img"></span>
        <span class="text">亲，没有更多了</span>
      </div>
    </div>
  </template>

<script>
import { ref } from 'vue'
//  useIntersectionObserver 判断是否进去浏览器可视区的hooks
import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'XtxInfiniteLoading',
  props: {
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 数据是否全部获取完毕
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const container = ref(null) // 监听的目标元素
    useIntersectionObserver(
      container,
      ([{ isIntersecting }], dom) => {
        if (isIntersecting) {
          console.log('进入可视区了')
          // 当前状态不是加载中状态,且加载未完成
          if (props.loading === false && props.finished === false) {
            // 获取数据
            emit('infinite')
          }
        }
      },
      // 设置交叉比例
      {
        threshold: 0
      }
    )
    return { container }
  }
}
</script>

  <style scoped lang='scss'>
  .xtx-infinite-loading {
    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      .img {
        width: 50px;
        height: 50px;
        background: url(~@/assets/images/loading.gif) no-repeat center / contain;
      }
      .text {
        color: #999;
        font-size: 16px;
      }
    }
    .none {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      .img {
        width: 200px;
        height: 134px;
        background: url(~@/assets/images/none.png) no-repeat center / contain;
      }
      .text {
        color: #999;
        font-size: 16px;
      }
    }
  }
  </style>
