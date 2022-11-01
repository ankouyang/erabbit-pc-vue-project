<template>
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
        <div ref="target" style="position: relative;height: 406px;">
            <Transition name="fade">
              <ul ref="pannel" class="goods-list" v-if="goods.length">
                <li v-for="item in goods" :key="item.id">
                  <RouterLink to="/">
                    <img :src="item.picture" alt="">
                    <p class="name">{{item.title}}</p>
                    <p class="desc">{{item.alt}}</p>
                  </RouterLink>
                </li>
               </ul>
               <HomeSkeleton  v-else/>
            </Transition>
        </div>
    </HomePanel>
  </template>

<script>
import { ref } from 'vue'
import HomePanel from './HomePanel'
import HomeSkeleton from './HomeSkeleton'
import { findHot } from '@/api/home'
import { useLayData } from '@/hooks/index'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
    // 通过ref属性来获取DOM对象
    const target = ref(null)
    //  懒加载素具
    const result = useLayData(target, findHot)// 懒加载数据

    return { goods: result, target }
  }
}
</script>

  <style scoped lang='scss'>
  .goods-list {
    display: flex;
    justify-content: space-between;
    height: 426px;
    li {
      width: 306px;
      height: 406px;
      @include hoverShadow;
      img {
        width: 306px;
        height: 306px;
      }
      p {
        font-size: 22px;
        padding-top: 12px;
        text-align: center;
      }
      .desc {
        color: #999;
        font-size: 18px;
      }
    }
  }
  </style>
