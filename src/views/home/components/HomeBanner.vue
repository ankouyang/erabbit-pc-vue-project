<template>
    <div class="home-banner">
      <XtxCarousel :sliders="banner" :duration="500"  :autoPlay="true"  />
    </div>
  </template>
<script>
import { findBanner } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    const banner = ref([])
    findBanner().then(({ result }) => (
      banner.value = result || []
    ))

    return { banner }
  }
}
</script>
  <style scoped lang="scss">
  .home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;
    .xtx-carousel {
      /deep/ .carousel-btn.prev {
         left: 270px;
      }
       /deep/ .carousel-indicator {
        padding-left: 250px;
     }
    }
  }
  </style>
