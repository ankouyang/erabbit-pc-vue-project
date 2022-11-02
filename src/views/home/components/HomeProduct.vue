<template>
    <div class="home-product" ref="target">
      <div style="position: relative">
        <Transition name="fade">
          <div v-if="resultData.length">
        <HomePanel :title="cate.name" v-for="cate in  resultData" :key="cate.id">
        <template #right>
          <div class="sub">
            <RouterLink :to="`/category/sub/${sub.id}`" v-for="sub in cate.children" :key="sub.id">{{sub.name}}</RouterLink>
          </div>
          <XtxMore :path="`/category/${cate.id}`"  />
        </template>
        <div class="box">
          <RouterLink class="cover" :to="`/category/${cate.id}`">
            <img :src="cate.picture" alt="">
            <strong class="label">
              <span>{{cate.name}}馆</span>
              <span>{{cate.saleInfo}}</span>
            </strong>
          </RouterLink>
          <ul class="goods-list">
            <li v-for="item in cate.goods" :key="item.id">
              <HomeGoods :goods="item" />
            </li>
          </ul>
        </div>
      </HomePanel>
      </div>
      <div v-else>
        <HomePanel v-for="i in  4" :key="i">
          <HomeSkeletonGoods />
        </HomePanel>
      </div>
        </Transition>
      </div>
    </div>
  </template>

<script>
import HomePanel from './HomePanel'
import HomeGoods from './HomeGoods'
import { findProduct } from '@/api/home'
// import { ref } from 'vue'
import { useLazyData } from '@/hooks/index'
import HomeSkeletonGoods from './HomeSkeletonGoods.vue'
export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods, HomeSkeletonGoods },
  setup () {
    // productList
    // const productList = ref([])
    // findProduct().then(({ result }) => {
    //   productList.value = result
    // })

    const { target, resultData } = useLazyData(findProduct)
    return { resultData, target }
  }
}
</script>

  <style scoped lang='scss'>
  .home-product {
    background: #fff;
    height: 2900px;
    .sub {
      margin-bottom: 2px;
      a {
        padding: 2px 12px;
        font-size: 16px;
        border-radius: 4px;
        &:hover {
          background: $xtxColor;
          color: #fff;
        }
        &:last-child {
          margin-right: 80px;
        }
      }
    }
    .box {
      display: flex;
      .cover {
        width: 240px;
        height: 610px;
        margin-right: 10px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .label {
          width: 188px;
          height: 66px;
          display: flex;
          font-size: 18px;
          color: #fff;
          line-height: 66px;
          font-weight: normal;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate3d(0,-50%,0);
          span {
            text-align: center;
            &:first-child {
              width: 76px;
              background: rgba(0,0,0,.9);
            }
            &:last-child {
              flex: 1;
              background: rgba(0,0,0,.7);
            }
          }
        }
      }
      .goods-list {
        width: 990px;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 240px;
          height: 300px;
          margin-right: 10px;
          margin-bottom: 10px;
          &:nth-last-child(-n+4) {
            margin-bottom: 0;
          }
          &:nth-child(4n) {
            margin-right: 0;
          }
        }
      }
    }
  }
  </style>
