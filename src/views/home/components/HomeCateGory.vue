<template>
    <!--离开home-category这个大盒子的时候 -->
    <div class='home-category' @mouseleave="currentCateGoryId = null">
        <!--左侧分类-->
      <ul class="menu">
        <li :class="{active:currentCateGoryId === item.id}" v-for="item in menuList" :key="item.id" @mouseenter="currentCateGoryId = item.id">
          <RouterLink :to="`/category/${item.id}`">{{item.name}}</RouterLink>
            <!-- 数据2 -->
           <template v-if="item.children">
              <RouterLink :to="`/category/sub/${item1.id}`" v-for="item1 in item.children" :key="item1.id">{{item1.name}}</RouterLink>
           </template>
            <!-- 骨架 -->
           <span v-else>
+             <XtxSkeleton width="60px" animated height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)" />
+             <XtxSkeleton width="50px" animated height="18px" bg="rgba(255,255,255,0.2)" />
+          </span>
        </li>
      </ul>
        <!-- 弹层 -->
       <div class="layer">
         <h4 v-if="currentCateGoryData">{{currentCateGoryData.id==='brand'?'品牌推荐':'分类推荐'}} <small>根据您的购买或浏览记录推荐</small></h4>
          <!-- 商品 -->
           <ul v-if="currentCateGoryData&&currentCateGoryData.goods&&currentCateGoryData.goods.length">
             <li v-for="item in currentCateGoryData.goods" :key="item.id">
               <RouterLink :to="`/product/${item.id}`">
                  <img :src="item.picture" alt="">
                  <div class="info">
                    <p class="name ellipsis-2">{{item.name}}</p>
                    <p class="desc ellipsis">{{item.desc}}</p>
                    <p class="price"><i>¥</i>{{item.price}}</p>
                  </div>
               </RouterLink>
             </li>
           </ul>
           <!-- 品牌 -->
           <ul v-if="currentCateGoryData&&currentCateGoryData.brands&&currentCateGoryData.brands.length">
              <li class="brand" v-for="item in currentCateGoryData.brands" :key="item.id">
                <RouterLink to="/">
                  <img :src="item.picture" alt="">
                  <div class="info">
                    <p class="place"><i class="iconfont icon-dingwei"></i>{{item.place}}</p>
                    <p class="name ellipsis">{{item.place}}</p>
                    <p class="desc ellipsis-2">{{item.desc}}</p>
                  </div>
                </RouterLink>
              </li>
           </ul>
        </div>
    </div>
  </template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { findBrand } from '@/api/home'
// 这里使用计算属性
export default {
  name: 'HomeCategory',
  //  setup 尽量不要跟async 一起使用 这样就变成异步，如果非要这么用，需要另外一种方式
  setup () {
    const store = useStore()
    // 使用计算属性(最终的数据  9个分类+1个品牌)
    // 定义一个品牌数据
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [
        { id: 'brand-children', name: '品牌推荐' }
      ],
      brands: []
    })
    // 9个分类
    const menuList = computed(() => {
      // 每个一级分类下面只展示两个子分类
      const categoryList = store.state.category.list.map(
        item => ({
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2), // 截取前2个
          goods: item.goods
        })
      )
      categoryList.push(brand)
      return categoryList
    })
    // 弹出层数据

    // 定义一个ref 响应式currentCateGoryId  鼠标移动记录
    const currentCateGoryId = ref(null)
    const currentCateGoryData = computed(() => {
      // 注意：computed 返回一个默认不可手动修改的 ref 对象，所以当你需要在setup中使用的时候,需要使用.value进行获取。
      return menuList.value.find(item => item.id === currentCateGoryId.value)
    })

    // 获取品牌数据
    findBrand().then(data => {
      const { result } = data
      brand.brands = result || []
    })
    return {
      menuList,
      currentCateGoryId,
      currentCateGoryData
    }
  }
}
</script>
<style lang="scss" scoped>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0,0,0,0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,&.active {
        background: $xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255,255,255,0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
              width: 95px;
              height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: priceColor;
              i {
                font-size: 16px;
              }
            }
          }

        }
        &.brand{
            height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
           }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}

</style>
