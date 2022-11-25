// 扩展vue原有功能:全局组件,自定义指令 挂载原型方法，注意没有全局过滤器
// 这就是插件
// vue2.0 插件写法要素: 导出一个对象,有install函数,默认传入Vue构造函数,Vue基础之上扩展。
// vue3.0 插件写法要素: 导出一个对象,有install函数,默认传入app应用实例,app基础之上扩展。
// 自定义指令
import { imgDirective } from '@/directive/index'

// 1.单个导入方式
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'
// const components = [XtxSkeleton, XtxCarousel, XtxMore, XtxBread, XtxBreadItem]

// 2. 批量导入需要使用一个函数 require.context(dir,deep,mathing)
// 参数: 1.目录 2.是否加载目录 3.加载的正则匹配

const importFn = require.context('./', false, /\.vue$/)
// console.log(importFn.keys())
export default {
  install (app) {
    // 在app上进行扩展,app提供component directive 函数
    // 如果要挂载原型方法  app.config.globalProperties 在此对象上添加原型方法
    // 全局组件
    importFn.keys().forEach(key => {
      // 导入组件
      const component = importFn(key).default
      app.component(component.name, component)
    }) // 组件里面一定要加上name
    //  以后全局组件,自定义指令在此添加
    imgDirective(app)
  }
}
