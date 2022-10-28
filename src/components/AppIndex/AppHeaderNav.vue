<template>
  <ul class="app-header-nav">
          <li class="home"><RouterLink to="/">首页</RouterLink></li>
          <li v-for="item in categoryList" :key="item.id"  @mouseenter="show(item)"   @mouseleave="hide(item)" >
            <RouterLink :to="`/category/${item.id}`" @click="hide(item)"> <a href="#">{{item.name}}</a></RouterLink>
            <div class="layer" :class="{open:item.open}">
                    <ul>
                      <li v-for="child in item.children || []" :key="child.id">
                        <RouterLink :to="`/category/sub/${child.id}`" @click="hide(item)">
                            <a href="#">
                               <img :src="child.picture" alt="">
                               <p>{{child.name}}</p>
                             </a>
                        </RouterLink>
                      </li>
                    </ul>
              </div>
        </li>
        </ul>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'AppHeaderNav',
  setup () {
    const store = useStore()
    // 获取数据
    const categoryList = computed(() => {
      return store.state.category.list
    })
    // 显示二级
    const show = (item) => {
      store.commit('category/show', item)
    }
    // 隐藏二级
    const hide = (item) => {
      store.commit('category/hide', item)
    }

    return {
      categoryList,
      show,
      hide

    }
  }
}
</script>

<style lang="scss" scoped>
 .app-header-nav {
      width: 820px;
      display: flex;
      justify-content: space-around;
      padding-left: 40px;
      position: relative;
      z-index: 998;
      > li {
        margin-right: 40px;
        width: 38px;
        text-align: center;
        > a {
          font-size: 16px;
          line-height: 32px;
          height: 32px;
          display: inline-block;
        }
        &:hover {
          > a {
            color: $xtxColor;
            border-bottom: 1px solid $xtxColor;
          }
        }
        //显示二级类目
        .layer {
             width: 1240px;
             background-color: #fff;
             position: absolute;
             left: -200px;
             top: 56px;
             height: 0;
             overflow: hidden;
             opacity: 0;
             box-shadow: 0 0 5px #ccc;
             transition: all .2s .1s;
             ul {
               display: flex;
               flex-wrap: wrap;
               padding: 0 70px;
               align-items: center;
               height: 132px;
               li {
                width: 110px;
                text-align: center;
                   img {
                     width: 60px;
                     height: 60px;
                   }
                   p {
                     padding-top: 10px;
                   }
                   &:hover {
                     p {
                       color: $xtxColor;
                     }
                   }
            }

            }
            &.open{
                height: 132px;
                opacity: 1;
            }

           }
      }
    }
</style>>
