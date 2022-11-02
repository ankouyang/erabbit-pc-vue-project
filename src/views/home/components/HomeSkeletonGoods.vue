<template>
    <div class='home-skeleton-goods'>
     <div class="img">
      <XtxSkeleton bg="#e4e4e4" width="240px" height="610px" animated />
     </div>
     <div class="goods">
      <ul>
        <li v-for="i in  8" :key="i" class="goods-item">
          <XtxSkeleton bg="#e4e4e4" width="178px" height="160px" animated />
          <XtxSkeleton class="mt-10" bg="#e4e4e4" width="178px" height="44px" animated />
          <XtxSkeleton class="mt-10" bg="#e4e4e4" width="178px" height="22px" animated />
          <XtxSkeleton class="mt-10" bg="#e4e4e4" width="100px" height="28px" animated />
        </li>
      </ul>
     </div>
    </div>
  </template>

<script>
export default {
  name: 'HomeSkeletonGoods',
  props: {
    // 暴露出一个bg 用于自定义
    bg: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

  <style scoped lang='scss'>
  .home-skeleton-goods {
    width: 1240px;
    height: 610px;
    display: flex;
    overflow: hidden;
    justify-content: space-between;
    .goods{
      width: 990px;
      height: 610px;
      ul{
        width: 100%;
        display: flex;
        flex-wrap: wrap
      }
      &-item {
        width: 240px;
        height: 300px;
        padding: 10px 30px;
        .mt-10{
          margin-top:10px
        }
      }
    }
  }
  </style>
