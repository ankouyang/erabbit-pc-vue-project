<template>
    <div class="goods-sku">
      <dl v-for="item in goods.specs" :key="item.id">
        <dt>{{item.name}}</dt>
        <dd>
           <template  v-for="val in item.values" :key="val.name">
            <img   @click="selectSku(val,item.values)"  v-if="val.picture" :class="{selected:val.selected,disabled:val.disabled}" :src="val.picture" :alt="val.name">
            <span v-else @click="selectSku(val,item.values)" :class="{selected:val.selected,disabled:val.disabled}" >{{val.name}}</span>
           </template>

        </dd>
      </dl>
    </div>
  </template>
<script>
import getPowerSet from '@/vender/power-set'
const spliter = '★'
// 得到一个路径字典对象
const getPathMap = (skus) => {
  // 1. 得到所有的sku集合 props.goods.skus
  // 2. 从所有的sku中筛选出有效的sku
  // 3. 根据有效的sku使用power-set算法得到子集
  // 4. 根据子集往路径字典对象中存储 key-value
  const pathMap = {}
  skus.forEach(sku => {
    // 1. 过滤出有库存有效的sku 例如：[1,2,3]===>[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]
    if (sku.inventory) {
      // 2. 得到sku属性值数组
      const specs = sku.specs.map(spec => spec.valueName)
      // 3. 得到sku属性值的子集
      const powerSet = getPowerSet(specs)
      // 4. 遍历子集，设置给路径字典对象
      powerSet.forEach(set => {
        const key = set.join(spliter)
        // 如果key存在的话就追加
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}

// 得到当前选中规格集合
const getSelectedArr = (specs) => {
  const selectedArr = []
  specs.forEach(spec => {
    const selectedVal = spec.values.find(val => val.selected)
    selectedArr.push(selectedVal ? selectedVal.name : undefined)
  })
  return selectedArr
}

// 更新按钮禁用状态(难点:关键点)
const updateDisabledStatus = (specs, pathMap) => {
  // 1.约定每个按钮的状态由本身的disabled数据来控制
  specs.forEach((spec, i) => {
    // 要在每个规格中都要去获取一遍最新的，所以需要放在这个循环里面
    const selectedArr = getSelectedArr(specs)
    spec.values.forEach(val => {
      // 已经选中的按钮不用判断
      if (val.selected) return false
      // 未选中的替换对应的值
      selectedArr[i] = val.name
      // 过滤无效值得到key
      const key = selectedArr.filter(v => v).join(spliter)
      // val.name 在pathMap 中key 是一直的，如果pathMap[val.name]存在,说明在路径字典中存在,反之没有
      val.disabled = !pathMap[key]
    })
    // console.log(selectedArr)
  })
}

//  initSelectedStatus 根据skuId默认选中
const initSelectedStatus = (goods, skuId) => {
  // 1. 获取sku相关信息
  const sku = goods.skus.find(sku => skuId === sku.id)
  // 2. 遍历所有的按钮
  if (sku) {
    goods.specs.forEach((spec, i) => {
      spec.values.forEach(val => {
        val.selected = val.name === sku.specs[i].valueName
      })
    })
  }
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => {}
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const pathMap = getPathMap(props.goods.skus)
    // 组件初始化:更新按钮禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)
    // 根据skuId默认选中
    initSelectedStatus(props.goods, props.skuId)
    // 1. 选中与取消选中逻辑
    // 1.1 点击的是已选中,只需要取消当前的选中
    // 1.2 点击的是未选中, 将已选中的规格按钮改成为未选中,当前点击的改成选中
    const selectSku = (val, arr) => {
      //  如果按钮是禁用的组织程序运行
      if (val.disabled) return false
      // 如果不是禁用,逻辑正常走
      // 选中的效果
      if (val.selected) {
        val.selected = false
      } else {
        arr && arr.forEach(item => { item.selected = false })
        val.selected = true
      }
      //  选择规格的时候,也得更新按钮禁用状态
      updateDisabledStatus(props.goods.specs, pathMap)

      // 将选择的sku信息通知父组件{skuId,price,oldPrice,inventory,specsText}
      // 1.选择完整的sku组合按钮,才可以拿到这些信息,提交组件
      // 2.不是完整的sku组合按钮,提交空对象
      const validSelectValues = getSelectedArr(props.goods.specs).filter(v => v)
      console.log(pathMap)
      // 完整的sku组合按钮
      if (validSelectValues.length === props.goods.specs.length) {
        // 找到sku按钮所对应的skuIds
        console.log('完整')
        const skuIds = pathMap[validSelectValues.join(spliter)]
        const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          // 属性名: 属性值   属性名1：属性值1 ... 这样的字符串
          specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').replace(' ', '')
        })
      } else {
        // 父组件需要判断是否规格选择完整,不完整不能加购物车
        emit('change', {})
      }
    }

    return { selectSku }
  }
}
</script>
  <style scoped lang="scss">
  @mixin sku-state-mixin {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;
    &.selected {
      border-color: $xtxColor;
    }
    &.disabled {
      opacity: 0.6;
      border-style: dashed;
      cursor: not-allowed;
    }
  }
  .goods-sku {
    padding-left: 10px;
    padding-top: 20px;
    dl {
      display: flex;
      padding-bottom: 20px;
      align-items: center;
      dt {
        width: 50px;
        color: #999;
      }
      dd {
        flex: 1;
        color: #666;
        line-height: 40px;
        > img {
          width: 50px;
          height: 50px;
          @include sku-state-mixin;
        }
        > span {
          display: inline-block;
          height: 30px;
          line-height: 28px;
          padding: 0 20px;
          @include sku-state-mixin;
        }
      }
    }
  }
  </style>
