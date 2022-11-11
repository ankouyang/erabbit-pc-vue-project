<template>
   <div class="sub-filter" v-if="filterList&&!filterLoading">
     <div class="item">
       <div class="head">品牌：</div>
       <div class="body" v-if="filterList.brands">
         <a href="javascript:;"  @click="changeBrand(item.id)" :class="{active:item.id === filterList.selectedBrand }" v-for="item in filterList.brands" :key="item.id">{{item.name}}</a>
       </div>
     </div>
     <div v-if="filterList.saleProperties">
       <div class="item" v-for="item in filterList.saleProperties" :key="item.id">
       <div class="head">{{item.name}}：</div>
       <div class="body" v-if="item.properties">
         <a href="javascript:;" :class="{active:sale.id === item.selectedProperty }" @click="changeAttr(item,sale.id)"  v-for="sale in item.properties" :key="sale.id">{{sale.name}}</a>
       </div>
     </div>
     </div>
   </div>
   <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
  </div>
</template>
<script>
import { findSubCategoryFilter } from '@/api/category'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const route = useRoute()
    const filterList = ref(null)
    const filterLoading = ref(false)
    // 获取二级类目-筛选条件-PC
    const getSubCategoryFilter = () => {
      filterLoading.value = true
      findSubCategoryFilter(route.params.id).then(({ result }) => {
        if (result) {
        // 添加品牌添加全部
          result.brands && result.brands.unshift({ id: null, name: '全部' })
          result.selectedBrand = null// 默认是全部
          result.saleProperties && result.saleProperties.forEach(item => {
            item.selectedProperty = null
            item.properties.unshift({ id: null, name: '全部' })
          })
        }
        filterList.value = result || []
        filterLoading.value = false
      })
    }

    // watch params-id
    watch(() => route.params.id, (newVal) => {
      // 判断当前路由是不是严格个二级路径匹配，才获取二级类目-筛选条件
      (newVal && `/category/sub/${newVal}` === route.path) && getSubCategoryFilter()
    }, {
      immediate: true
    })

    // 筛选过滤入参数据格式成指定的格式
    const getFilterParams = () => {
      const filterParams = {}
      const attrs = []
      filterParams.brandId = filterList.value.selectedBrand
      filterList.value.saleProperties.forEach(item => {
        // 找到选中的数据,并进行组装
        const attr = item.properties.find(attr => attr.id === item.selectedProperty)
        if (attr && attr.id) {
          attrs.push({ groupName: item.name, propertyName: attr.name })
        }
      })
      // 组装attrs
      if (attrs.length) filterParams.attrs = attrs
      return getFilterParams
    }
    // 选择品牌
    const changeBrand = (brandId) => {
      // 防止多次点击，减少无效请求筛选
      if (filterList.value.selectedBrand === brandId) return
      filterList.value.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }

    // 选择属性
    const changeAttr = (item, propId) => {
      // 防止多次点击，减少无效请求筛选
      if (item.selectedProperty === propId) return
      item.selectedProperty = propId
      emit('filter-change', getFilterParams())
    }

    return {
      filterList,
      filterLoading,
      changeBrand,
      changeAttr
    }
  }
}
</script>
<style scoped lang='scss'>
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;
          &.active,
          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
    .xtx-skeleton {
      padding: 10px 0;
    }
  }
</style>
