<template>
  <!-- 防止报错，加载完成goods再显示所有内容 -->
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="'/category/'+goods.categories[1].id">{{goods.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem :to="'/category/sub/'+goods.categories[0].id">{{goods.categories[0].name}}</XtxBreadItem>
        <XtxBreadItem>{{goods.name}}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 图片放大镜左边 -->
        <div class="media">
          <GoodsImage  :images="goods.mainPictures"/>
          <GoodsSales />
        </div>
        <!-- 相关商品 sku spu相关参数 选购 -->
        <div class="spec">
          <!--选择地址区域-->
          <GoodsName :goods="goods" />
          <!-- sku组件 -->
          <GoodsSku  :goods="goods" skuId="300355116" />
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant/>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsSales />
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/GoodsRelevant'
import GoodsImage from './components/GoodsImage'
import GoodsSales from './components/GoodsSales'
import GoodsName from './components/GoodsName'
import GoodsSku from './components/GoodsSku'
import { findGoods } from '@/api/product'
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
// 为了防止setup里面写入大量的代码，大大降低了可读性，可以将一些方法写在script内,或者提取一个自定义hooks文件
// 获取商品详情
const useGoods = () => {
  // 出现路由地址商品ID发生变化，但是不会重新初始化组件
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, async (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      const data = await findGoods(route.params.id)
      if (data) {
        // 让商品数据为null让后使用v-if的组件可以重新销毁和创建,同时各个组件全部重新加载
        goods.value = null
        nextTick(() => {
          goods.value = data.result
        })
      }
    }
  }, { immediate: true })
  return goods
}

export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku
  },
  // 为了防止setup里面写入大量的代码，可以将一些方法写在script 内
  setup () {
    // 1. 获取商品详情,
    const goods = useGoods()
    return { goods }
  }
}

</script>

<style scoped lang='scss'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
    background-color: #fff;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
