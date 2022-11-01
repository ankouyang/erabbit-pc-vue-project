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
                  <img :src="item.picture" alt="">
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
import { ref } from 'vue'
import HomePanel from './HomePanel'
import HomeSkeleton from './HomeSkeleton'
import { findNew } from '@/api/home'
import { useLayData } from '@/hooks/index'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
    // 通过ref属性来获取DOM对象
    const target = ref(null)
    //  懒加载素具
    const result = useLayData(target, findNew)// 懒加载数据

    return { goods: result, target }
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
