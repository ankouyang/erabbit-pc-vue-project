<template>
    <div class='xtx-carousel' @mouseenter="stop" @mouseleave="start">
      <!-- 图片容器 -->
      <ul class="carousel-body">
        <!-- fade 控制图片显示隐藏 -->
        <li class="carousel-item"  :class="{fade:index===i}" v-for="(item,i) in sliders" :key="i">
          <RouterLink :to="item.hrefUrl">
            <img :src="item.imgUrl" alt="">
          </RouterLink>
        </li>
      </ul>
      <!-- 上一张 -->
      <a href="javascript:;" class="carousel-btn prev" @click="prev"><i class="iconfont icon-angle-left"></i></a>
      <!-- 下一张 -->
      <a href="javascript:;" class="carousel-btn next" @click="next"><i class="iconfont icon-angle-right"></i></a>
      <!-- 指示器 -->
      <div class="carousel-indicator">
        <span v-for="(item,i) in sliders.length" :key="i" :class="{active:index === i}"></span>
      </div>
    </div>
  </template>

<script>
import { onUnmounted, ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    duration: {
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const index = ref(0)
    // 自动播放
    let timer = null
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        // 如果是到最后一行数据的时候，默认回到第一页
        console.log(index.value)
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }

    // 开启轮播
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }

    // 暂停轮播
    const stop = () => {
      if (timer) {
        clearInterval(timer)
      }
    }
    //  mounted
    onUnmounted(() => {
      stop()
    })
    // 使用监听对象中某一个属性的变化,例如 obj.name,这个比较特别，需要用一个函数，并返回该属性
    watch(() => props.sliders, (val) => {
    //   console.log(val)
      // 有数据&开启自动播放，才调用自动播放函数
      if (val.length && props.autoPlay) {
        index.value = 0
        autoPlayFn()
      }
    }, { immediate: true })
    // 下一张
    const next = () => {
      index.value++
      // 如果是到最后一行数据的时候，默认回到第一页
      console.log(index.value)
      if (index.value >= props.sliders.length) {
        index.value = 0
      }
    }
    //  上一张
    const prev = () => {
      index.value--
      // 如果是到最开始的数据的时候，默认回到最后一页
      console.log(index.value)
      if (index.value < 0) {
        index.value = props.sliders.length - 1
      }
    }
    return {
      index,
      stop,
      start,
      next,
      prev

    }
  }
}
</script>
  <style scoped lang="scss">
  .xtx-carousel{
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    position: relative;
    .carousel{
      &-body {
        width: 100%;
        height: 100%;
      }
      &-item {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        transition: opacity 0.5s linear;
        &.fade {
          opacity: 1;
          z-index: 1;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-indicator {
        position: absolute;
        left: 0;
        bottom: 20px;
        z-index: 2;
        width: 100%;
        text-align: center;
        span {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: rgba(0,0,0,0.2);
          border-radius: 50%;
          cursor: pointer;
          ~ span {
            margin-left: 12px;
          }
          &.active {
            background:  #fff;
          }
        }
      }
      &-btn {
        width: 44px;
        height: 44px;
        background: rgba(0,0,0,.2);
        color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 228px;
        z-index: 2;
        text-align: center;
        line-height: 44px;
        opacity: 0;
        transition: all 0.5s;
        &.prev{
          left: 2px;
        }
        &.next{
          right: 20px;
        }
      }
    }
    &:hover {
      .carousel-btn {
        opacity: 1;
      }
    }
  }
  </style>
