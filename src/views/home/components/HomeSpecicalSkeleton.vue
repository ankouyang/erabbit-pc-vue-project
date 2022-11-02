<template>
    <div class='home-skeleton-special'>
     <div class="special-item" v-for=" i in 3" :key="i">
        <XtxSkeleton bg="#e4e4e4" width="404px" height="288px" animated />
        <div class="foot">
            <div class="left">
             <XtxSkeleton bg="#e4e4e4" width="40px" height="21px" animated />
               &nbsp; &nbsp;
             <XtxSkeleton bg="#e4e4e4" width="40px" height="21px" animated />
            </div>
            <div class="right">
               <XtxSkeleton bg="#e4e4e4" width="40px" height="21px" animated />
            </div>
        </div>
     </div>
    </div>
  </template>

<script>
export default {
  name: 'HomeSkeletonSpecial',
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
  .home-skeleton-special {
    width: 1240px;
    height: 380px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .special-item{
        width: 404px;
        background: #fff;
        .foot{
            overflow: hidden;
            padding: 0 20px;
             .left{
                 float: left;
                 height: 72px;
                 line-height: 72px;
             }
             .right{
                 float: right;
                 height: 72px;
                 line-height: 72px;
             }
        }

    }
  }
  </style>
