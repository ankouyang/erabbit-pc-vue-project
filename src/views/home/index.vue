<template>
    <div class="container">
      <!-- 首页入口 -->
      <div class="home-entry">
        <!-- 左侧分类 -->
        <HomeCateGory />
        <!-- 轮播图 -->
        <HomeBanner />
        <!-- 新鲜好物 -->
        <HomeNew />
        <!-- 热门推荐 -->
        <HomeHot />
        <!-- 热门品牌 -->
        <HomeBrand />
         <!--商品区块 -->
         <HomeProduct />
      </div>

    </div>
</template>

<script>
import HomeCateGory from './components/HomeCateGory'
import HomeBanner from './components/HomeBanner'
import HomeNew from './components/HomeNew'
import HomeHot from './components/HomeHot'
import HomeBrand from './components/HomeBrand'
import HomeProduct from './components/HomeProduct'
export default {
  name: 'HomePage',
  components: {
    HomeCateGory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct
  }
}
</script>
<style  lang="scss" scoped>
.home{
  @include hoverShadow;
  color: $xtxColor;
 }
</style>
