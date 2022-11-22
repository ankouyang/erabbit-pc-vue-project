<template>
    <div class="goods-image">

      <!-- 图片放大镜 -->
      <div class="large" v-show="showBigImage" :style="[{backgroundImage:`url(${images[currIndex]})`},backgroundPostion]"></div>
      <!-- 1.首先准备大图容器和遮罩容器 -->
      <!-- 2.然后使用@vueuse/core的useMouseInElement方法获取基于元素的偏移量 -->
      <!-- 3.计算出 遮罩容器定位与大容器背景定位 暴露出数据给模板使用 -->

      <!-- 中图展示 -->
      <div class="middle" ref="target">
        <img :src="images[currIndex]" alt="">
        <div class="layer"  v-show="showBigImage" :style="position"></div>
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
import { ref, reactive, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
const usePreviewImg = () => {
  // 1.是否显示遮罩和大图
  const showBigImage = ref(false)
  // 2. 遮罩的坐标(样式)
  const position = reactive({
    left: 0,
    top: 0
  })
  // 3. 大背景定位(样式)
  const backgroundPostion = reactive({ backgroundPositionX: 0, backgroundPositionY: 0 })
  // 4.使用useMouseInElement得到基于元素左上角的坐标和是否离开元素数据
  const target = ref(null)
  const { elementX, elementY, isOutside } = useMouseInElement(target)
  watch([elementX, elementY, isOutside], (arr) => {
    // 5.根据得到的数据设置样式 数据和是否显示数据。因为遮罩的宽度为200.中图的宽度为400，所以移动的范围只能是0-200
    // 在容器内才显示
    showBigImage.value = !arr[2]
    console.log(elementX.value)
    // 控制X轴方向的定位 0-200 之间
    // layer的宽度为200，当鼠标横向坐标小于layer宽度的一半的时候，遮罩不移动，Y轴同理
    if (elementX.value < 100) position.left = 0
    // 鼠标X位置移动到300的时候，elementX.value+ layer的宽度已经超过400了，所以layer的X轴的移动位置默认为最大值200.Y轴同理
    else if (elementX.value > 300) position.left = 200
    // 其他场景x坐标都在100-300之间，因为elementX小于100的时候，layer移动都为0，所以移动距离是  elementX.value - 100 ，Y轴同理
    else position.left = elementX.value - 100

    // 控制Y轴方向的定位 0-200 之间
    if (elementY.value < 100) position.top = 0
    else if (elementY.value > 300) position.top = 200
    else position.top = elementY.value - 100

    // 设置大背景的定位(因为大背景是放大2倍的，所以这个背景也要要放大2倍)
    backgroundPostion.backgroundPositionX = -position.left * 2 + 'px'
    backgroundPostion.backgroundPositionY = -position.top * 2 + 'px'
    // 设置遮罩容器的定位
    position.left = position.left + 'px'
    position.top = position.top + 'px'
  })
  return { showBigImage, position, backgroundPostion, target }
}
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
    const { showBigImage, position, backgroundPostion, target } = usePreviewImg()
    return { currIndex, showBigImage, position, backgroundPostion, target }
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
