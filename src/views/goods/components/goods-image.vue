<template>
    <div class="goods-image">

      <!-- 图片放大镜 -->
      <div class="large" v-show="showBigImage" :style="[{backgroundImage:`url(${images[currIndex]})`}]"></div>
      <!-- 1.首先准备大图容器和遮罩容器 -->
      <!-- 2.然后使用@vueuse/core的useMouseInElement方法获取基于元素的偏移量 -->
      <!-- 3.计算出 遮罩容器定位与大容器背景定位 暴露出数据给模板使用 -->

      <!-- 中图展示 -->
      <div class="middle">
        <img :src="images[currIndex]" alt="" @mouseenter="showBigImage = true"  @mouseleave="showBigImage = false">
        <div class="layer"></div>
      </div>
      <!-- 小图展示 -->
      <ul class="small">
        <li v-for="(img,i) in images" :key="img" :class="{active:i===currIndex}">
          <img @mouseenter="currIndex=i" :src="img" alt="">
        </li>
      </ul>
    </div>
  </template>
<script>
import { ref } from 'vue'
// import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const currIndex = ref(0)
    const showBigImage = ref(false)
    return { currIndex, showBigImage }
  }
}
</script>
  <style scoped lang="scss">
  .goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;
    z-index: 500;
    .large {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        background-repeat: no-repeat;
        background-size: 800px  800px; //这里background-size设置为宽高的2倍 达到放大的效果
        background-color: #f8f8f8;
     }
    .middle {
      width: 400px;
      height: 400px;
      background: #f5f5f5;
      position: relative;
      cursor: move;
      .layer {
      width: 200px;
      height: 200px;
      background: rgba(0,0,0,.2);
      left: 0;
      top: 0;
      position: absolute;
     }
   }
    .small {
      width: 80px;
      li {
        width: 68px;
        height: 68px;
        margin-left: 12px;
        margin-bottom: 15px;
        cursor: pointer;
        &:hover,&.active {
          border: 2px solid $xtxColor;
        }
      }
    }
  }
  </style>
