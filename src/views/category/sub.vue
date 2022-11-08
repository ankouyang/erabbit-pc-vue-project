<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区展示-->
      <SubFilter />
       <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort />
        <!-- 列表 -->
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/SubBread'
import SubFilter from './components/SubFilter'
import SubSort from './components/SubSort'
import { ref } from 'vue'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort },
  setup () {
    const allChecked = ref(true)
    return {
      allChecked
    }
  }
}
</script>
<style lang="scss" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
