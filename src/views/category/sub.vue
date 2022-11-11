<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区展示-->
      <SubFilter  @filter-change="changeFilter" />
       <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort  @sort-change="changeSort"/>
        <!-- 列表 -->
        <ul>
          <li v-for="item in  goodsList" :key="item.id">
              <GoodsItem :goods="item" />
          </li>
        </ul>
        <!-- 无线加载组件 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getGoodList" />
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/SubBread'
import SubFilter from './components/SubFilter'
import SubSort from './components/SubSort'
import GoodsItem from './components/GoodsItem'
import { ref, watch } from 'vue'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup () {
    const route = useRoute()
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20,
      categoryId: route.params.id
    }
    // 获取商品列表数据
    const getGoodList = () => {
      // 请求开始
      loading.value = true
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          // console.log(result.items)
          reqParams.page++
        } else {
          // 没有则加载完毕
          finished.value = true
        }
        // 请求结束
        loading.value = false
      }).catch(() => {
        // 请求结束
        loading.value = false
      })
    }
    // 监听parmams  id 变化
    watch(() => route.params.id, (newVal) => {
      if (newVal && route.path === ('/category/sub/' + newVal)) {
        goodsList.value = []
        reqParams = {
          page: 1,
          pageSize: 20
        }
        finished.value = false
      }
    })
    // 监听排序改变
    const changeSort = (sortParams) => {
      console.log(sortParams)
      reqParams = {
        ...reqParams,
        ...sortParams
      }
      reqParams.page = 1
      // goodsList  初始化
      goodsList.value = []
      // finished 初始化
      finished.value = false
      // 重新加载数据
      getGoodList()
    }

    // 监听筛选条件的改变
    const changeFilter = (filterParams) => {
      console.log(filterParams)
      reqParams = {
        ...reqParams,
        ...filterParams
      }
      reqParams.page = 1
      // goodsList  初始化
      goodsList.value = []
      // finished 初始化
      finished.value = false
      // 重新加载数据
      getGoodList()
    }

    return {
      loading,
      finished,
      goodsList,
      getGoodList,
      changeSort,
      changeFilter
    }
  }
}
</script>
<style lang="scss" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul{
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li{
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n){
        margin-right: 0;
      }
    }
  }
}
</style>
