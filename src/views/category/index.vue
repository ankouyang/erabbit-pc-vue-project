<template>
  <div class="top-category">
    <div class="container">
     <!-- 面包屑 -->
     <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem v-if="topCategory" :key="topCategory.id">{{topCategory.name}}</XtxBreadItem>
        </transition>
     </XtxBread>
     <!-- 轮播图 -->
     <XtxCarousel :sliders="sliders" style="height:500px" />
     <!-- 全部分类 -->
     <div class="sub-list">
        <h3>全部分类</h3>
        <ul v-if="topCategory&&topCategory.children">
          <li v-for="item in topCategory.children||[]" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" >
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
     <!-- 各个分类推荐商品 -->

     <!-- 分类关联商品 -->
     <div class="ref-goods" v-for="item in subList" :goods="item" :key="item.id">
        <div class="head">
          <h3>- {{item.name}} -</h3>
          <p class="tag">{{item.desc}}</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem  v-for="good in item.goods" :key="good.id"  :goods="good" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { findTopCategory } from '@/api/category'
import GoodsItem from './components/GoodsItem'
export default {
  name: 'TopCategory',
  components: { GoodsItem },
  setup () {
    // 轮播图
    const sliders = ref([])
    findBanner().then(({ result }) => {
      sliders.value = result
    })
    // 面包屑+所有子分类 ===》vuex
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      const item = store.state.category.list.find(item => item.id === route.params.id)
      return item || {}
    })

    // 推荐商品(这里是公用一个页面,在setup只是执行一次，所以需要监听route.params.id,route.params.id每次变动都需要重新请求)
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then(({ result }) => {
        subList.value = result.children || []
      })
    }
    // 监听具体的对象的属性，用函数，并返回对象
    watch(() => route.params.id, (newVal) => {
      // 切换到二级类目路由的时候也有ID，但是也触发了watch导致发送了请求，需要处理，所以这里需要当前路由要严格匹配和一级相同。
      (newVal && `/category/${newVal}` === route.path) && getSubList()
    }, { immediate: true })

    return { sliders, topCategory, subList }
  }
}
</script>

<style lang="scss" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
  .goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  @include hoverShadow;
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: $priceColor;
    font-size: 20px;
  }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
