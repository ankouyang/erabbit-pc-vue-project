<template>
    <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
      <template #right>
        <a href="javascript:;" :class="{disabled:index===0}" @click="toggle(-1)" class="iconfont icon-angle-left prev"></a>
        <a href="javascript:;"  :class="{disabled:index===1}" @click="toggle(1)" class="iconfont icon-angle-right next"></a>
      </template>
     <div  ref="target" class="box">
      <Transition name="fade">
        <ul v-if="brands.length" class="list" :style="{transform:`translateX(${-index*1240}px)`}" >
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="">
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px"/>
        </div>
      </Transition>
       </div>
    </HomePanel>
  </template>

<script>
import HomePanel from './HomePanel'
import { findBrand } from '@/api/home'
import { ref } from 'vue'
import { useLazyData } from '@/hooks/index'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup () {
    // const brands = ref([])
    // 获取品牌
    // findBrand(10).then(({ result }) => {
    //   brands.value = result || []
    // })

    // 切换 0-1 来回切
    const index = ref(0)// 默认为0

    const toggle = (step) => {
      const newIndex = index.value + step
      // 这个防止点击多次, 出现异常。只能 0 - 1切换
      if (newIndex < 0 || newIndex > 1) return
      index.value = newIndex
    }

    // 注意：useLazyData需要的是API函数，如果遇到要传参的情况，自己写函数再函数中调用API
    const { target, resultData } = useLazyData(() => findBrand(10))

    return { brands: resultData, target, toggle, index }
  }
}
</script>

  <style scoped lang='scss'>
  .home-panel {
    background:#f5f5f5
  }
  .iconfont {
    width: 20px;
    height: 20px;
    background: #ccc;
    color: #fff;
    display: inline-block;
    text-align: center;
    margin-left: 5px;
    background: $xtxColor;
    &::before {
      font-size: 12px;
      position: relative;
      top: -2px
    }
    &.disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
  .box {
    display: flex;
    width: 100%;
    height: 345px;
    overflow: hidden;
    padding-bottom: 40px;
    .list {
      width: 200%;
      display: flex;
      transition: all 1s;
      li {
        margin-right: 10px;
        width: 240px;
        &:nth-child(5n) {
          margin-right: 0;
        }
        img {
          width: 240px;
          height: 305px;
        }
      }
    }
  }
  .skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
  </style>
