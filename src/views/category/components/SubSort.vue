<template>
    <div class='sub-sort'>
      <div class="sort">
        <a href="javascript:;" :class="{active:sortParams.sortField===item.params&&item.params!=='price'}" @click="changeSort(item.params)" v-for="item in sortList" :key="item.params">
        {{item.name}}
        <span v-if="item.params==='price'">
            <i class="arrow up" :class="{active:sortParams.sortMethod === 'asc'}" />
            <i class="arrow down" :class="{active:sortParams.sortMethod === 'desc'}" />
        </span>
        </a>
      </div>
      <div class="check">
        <XtxCheckbox v-model="sortParams.inventory" @change="changeCheck">仅显示有货商品</XtxCheckbox>
        <XtxCheckbox v-model="sortParams.onlyDiscount" @change="changeCheck">仅显示特惠商品</XtxCheckbox>
      </div>
    </div>
  </template>
<script>
import { reactive } from 'vue'

export default {
  name: 'SubSort',
  setup (props, { emit }) {
    // 排序查询条件列表
    const sortList = reactive([
      { name: '默认排序', params: null },
      { name: '最新商品', params: 'publishTime' },
      { name: '最高人气', params: 'orderNum' },
      { name: '评论最多', params: 'evaluateNum' },
      { name: '价格排序', params: 'price' }
    ])
    // 排序的入参定义
    // 1. 根据后台需要的参数定义数据对象
    // 2. 根据数据对象，绑定组件（复选框，排序按钮）
    // 3. 在操作排序组件的时候，需要反馈给数据对象
    // sortField====>publishTime,orderNum,price,evaluateNum
    // sortMethod====>asc为正序 desc为倒序
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: null,
      sortMethod: null
    })
    //  改变排序的方法
    const changeSort = (sortField) => {
    //   console.log(sortField)
      if (sortField === 'price') {
        // 第一次点击默认是降序
        sortParams.sortField = sortField
        sortParams.sortMethod = sortParams.sortMethod === null ? 'desc' : sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
      } else {
        if (sortParams.sortField === sortField) return
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }
      // 需要主动触发调用接口筛选，所以这里需要用change事件
      emit('sort-change', sortParams)
    }

    //  这个checkbox需要主动触发调用接口筛选，所以这里需要用change事件
    const changeCheck = () => {
    //   console.log(sortParams)
      emit('sort-change', sortParams)
    }
    return {
      sortList,
      sortParams,
      changeSort,
      changeCheck
    }
  }
}
</script>
  <style scoped lang='scss'>
  .sub-sort {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sort {
      display: flex;
      a {
        height: 30px;
        line-height: 28px;
        border: 1px solid #e4e4e4;
        padding: 0 20px;
        margin-right: 20px;
        color: #999;
        border-radius: 2px;
        position: relative;
        transition: all .3s;
        &.active {
          background: $xtxColor;
          border-color: $xtxColor;
          color: #fff;
        }
        .arrow {
          position: absolute;
          border: 5px solid transparent;
          right: 8px;
          &.up {
            top: 3px;
            border-bottom-color: #bbb;
              &.active {
              border-bottom-color: $xtxColor;
            }
          }
          &.down {
            top: 15px;
            border-top-color: #bbb;
            &.active {
              border-top-color: $xtxColor;
            }
          }
        }
      }
    }
    .check {
      .xtx-checkbox {
        margin-left: 20px;
        color: #999;
      }
    }
  }
  </style>
