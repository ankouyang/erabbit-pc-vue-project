<template>
    <div class="home-new">
      <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
        <!-- 右边插槽 -->
        <template #right><XtxMore path="/" /></template>
        <!-- 面板内容 -->
        <div  ref="target" style="position: relative;height: 406px;">
            <Transition name="fade">
            <ul class="goods-list" v-if="goods.length">
              <li v-for="item in goods" :key="item.id">
                <RouterLink :to="`/product/${item.id}`">
                  <img v-lazyload="item.picture" alt="">
                  <p class="name ellipsis">{{item.name}}</p>
                  <p class="price">&yen;{{item.price}}</p>
                </RouterLink>
              </li>
            </ul>
            <HomeSkeleton  bg="#f0f9f4" v-else/>
            </Transition>
        </div>
        </HomePanel>

    </div>
  </template>
<script>
import HomePanel from './HomePanel'
import HomeSkeleton from './HomeSkeleton'
import { findNew } from '@/api/home'
import { useLazyData } from '@/hooks/index'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
    //  懒加载数据
    const { resultData, target } = useLazyData(findNew)

    return { goods: resultData, target }
  }
}
</script>
  <style scoped lang="scss">
  .goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;
    li {
      width: 306px;
      height: 406px;
      background: #f0f9f4;
      @include hoverShadow;
      img {
        width: 306px;
        height: 306px;
      }
      p {
        font-size: 22px;
        padding: 12px 30px 0 30px;
        text-align: center;
      }
      .price {
        color: $priceColor;
      }
    }
  }
  </style>
