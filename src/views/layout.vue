 <template>
   <!-- 顶部通栏 -->
   <app-nav-bar />
   <!-- 头部组件 -->
   <app-header />
    <!-- 头部吸顶组件 -->
    <app-header-sticky />
   <!-- 内容容器 -->
   <div class="main">
      <RouterView />
   </div>
   <!-- 底部组件 -->
   <AppFooter />
 </template>

<script>
import AppNavBar from '@/components/AppIndex/AppNavBar.vue'
import AppHeader from '@/components/AppIndex/AppHeader.vue'
import AppFooter from '@/components/AppIndex/AppFooter.vue'
import AppHeaderSticky from '@/components/AppIndex/AppHeaderSticky.vue'
import { useStore } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppNavBar,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup () {
    const store = useStore()
    // 调用分类的接口
    store.dispatch('category/getAllCategorylist')
  }
}
</script>

 <style lang="scss" scoped>

 </style>
