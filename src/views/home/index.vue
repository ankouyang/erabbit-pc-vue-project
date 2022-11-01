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
      </div>

    </div>
</template>

<script>
import HomeCateGory from './components/HomeCateGory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
export default {
  name: 'HomePage',
  components: {
    HomeCateGory,
    HomeBanner,
    HomeNew,
    HomeHot
  }
}
</script>
<style  lang="scss" scoped>
.home{
  @include hoverShadow;
  color: $xtxColor;
 }
</style>
