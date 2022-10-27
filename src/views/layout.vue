 <template>
   <!-- 顶部通栏 -->
   <app-nav-bar />
   <!-- 头部组件 -->
   <header>头部组件</header>
   <!-- 内容容器 -->
   <div class="main">
      <RouterView />
   </div>
   <!-- 底部组件 -->
   <footer>底部组件</footer>
 </template>

<script>
import AppNavBar from '@/components/AppNavBar.vue'

export default {
  name: 'Layout',
  components: {
    AppNavBar
  }
}
</script>

 <style lang="scss" scoped>

 </style>
