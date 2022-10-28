<template>
    <div class="app-header-sticky" :class="{show:y>78}">
      <div class="container" v-show="y>78">
        <RouterLink class="logo" to="/" />
        <AppHeaderNav />
        <div class="right">
          <RouterLink to="/" >品牌</RouterLink>
          <RouterLink to="/" >专题</RouterLink>
        </div>
      </div>
    </div>
  </template>

<script>
// import { onMounted, onUnmounted, ref } from 'vue'
import AppHeaderNav from './AppHeaderNav.vue'
import { useWindowScroll } from '@vueuse/core' // 这个只能在组合API中使用，不能在选项API中使用
export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
  setup () {
    // 1.传统的方式
    // const y = ref(0)
    // onMounted(() => {
    //   // 传统的滚动监听
    //   window.addEventListener('scroll', getScrollTop)
    // })
    // onUnmounted(() => {
    //   // 传统的滚动监听
    //   window.removeEventListener('scroll', getScrollTop)
    // })
    // const getScrollTop = () => {
    //   const scrollTop = document.documentElement.scrollTop
    //   y.value = scrollTop
    // }

    // 2.组合API的方式 自定义hooks的方式,我们需要引入  @vueuse/core库  y已经是响应式的数据了
    const { y } = useWindowScroll()

    return { y }
  }
}
</script>

  <style scoped lang='scss'>
  .app-header-sticky {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;
    transform: translateY(-100%);
    opacity: 0;
    &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
    }
    .container {
      display: flex;
      align-items: center;
    }
    .logo {
      width: 200px;
      height: 80px;
      background: url(~@/assets/images/logo.png) no-repeat  right 2px;
      background-size: 160px auto;
    }
    .right {
      width: 220px;
      display: flex;
      text-align: center;
      padding-left: 40px;
      border-left: 2px solid $xtxColor;
      a {
        width: 38px;
        margin-right: 40px;
        font-size: 16px;
        line-height: 1;
        &:hover {
          color: $xtxColor;
        }
      }
    }
  }
  </style>
