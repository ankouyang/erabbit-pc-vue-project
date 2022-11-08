<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区展示-->
      <SubFilter />
       <!-- 复选框测试-->
       <XtxCheckbox v-model="allChecked">全部</XtxCheckbox>
    </div>
  </div>
</template>

<script>
import SubBread from './components/SubBread'
import SubFilter from './components/SubFilter'
import { ref } from 'vue'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter },
  setup () {
    const allChecked = ref(true)
    return {
      allChecked
    }
  }
}
</script>
