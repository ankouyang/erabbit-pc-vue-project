<template>
    <div class="xtx-checkbox" @click="changeChecked()">
      <i v-if="checked" class="iconfont icon-checked"></i>
      <i v-else class="iconfont icon-unchecked"></i>
      <!-- $slots.default  可以判断是否有默认插槽-->
      <span v-if="$slots.default"><slot /></span>
    </div>
  </template>
<script>
import { ref, watch } from 'vue'
// vue3.0 v-model 其实就是:modelValue  +   @update:modelValue的简写，这个和2.0 还是有点区别的
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
    const checked = ref(false)
    // 手动触发的方法
    const changeChecked = () => {
      checked.value = !checked.value
      emit('update:modelValue', checked.value)
    }

    // 主动监听modelValue的变化
    watch(() => props.modelValue, (newVal) => {
      checked.value = newVal
    }, { immediate: true })

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
