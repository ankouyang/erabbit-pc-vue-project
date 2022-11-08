<template>
    <div class="xtx-checkbox" @click="changeChecked()">
      <i v-if="checked" class="iconfont icon-checked"></i>
      <i v-else class="iconfont icon-unchecked"></i>
      <!-- $slots.default  可以判断是否有默认插槽-->
      <span v-if="$slots.default"><slot /></span>
    </div>
  </template>
<script>
import { useVModel } from '@vueuse/core'
// import { ref, watch } from 'vue'
// vue3.0 v-model 其实就是:modelValue  +   @update:modelValue的简写，这个和2.0 还是有点区别的

// 使用vueuse
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      // 复选框我们使用 Boolean 来绑定
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 1.第一种方式
    // const checked = ref(false)+
    // // 手动触发的方法
    // const changeChecked = () => {
    //   checked.value = !checked.value
    //   emit('update:modelValue', checked.value)
    // }
    // // 主动监听modelValue的变化
    // watch(() => props.modelValue, (newVal) => {
    //   checked.value = newVal
    // }, { immediate: true })

    // 第二种方式
    // 使用useVModel实现双向数据绑定v-model指令
    // 1. 使用props接收modelValue
    // 2. 使用useVModel来包装props中的modelValue属性数据
    // 3. 在使用checked.value就是使用父组件数据
    // 4. 在使用checked.value = '数据' 赋值，触发emit('update:modelvalue', '数据')
    const checked = useVModel(props, 'modelValue', emit)

    const changeChecked = () => {
      const newVal = !checked.value
      // 通知父组件,这里相当于emit('update:modelvalue', '数据')
      checked.value = newVal
      // 让组件支持change事件，这样就形成了一个完整复选框组件
      emit('change', newVal)
    }

    return { checked, changeChecked }
  }
}
</script>
  <style scoped lang="scss">
  .xtx-checkbox {
    display: inline-block;
    margin-right: 2px;
    .icon-checked {
      color: $xtxColor;
      ~ span {
        color: $xtxColor;
      }
    }
    i {
      position: relative;
      top: 1px;
    }
    span {
      margin-left: 2px;
    }
  }
  </style>
