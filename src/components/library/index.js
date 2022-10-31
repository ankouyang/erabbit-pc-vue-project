// 扩展vue原有功能:全局组件,自定义指令 挂载原型方法，注意没有全局过滤器
// 这就是插件
// vue2.0 插件写法要素: 导出一个对象,有install函数,默认传入Vue构造函数,Vue基础之上扩展。
// vue3.0 插件写法要素: 导出一个对象,有install函数,默认传入app应用实例,app基础之上扩展。

import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
// 存储所有需要注册的组件

const components = [XtxSkeleton, XtxCarousel]
export default {
  install (app) {
    // 在app上进行扩展,app提供component directive 函数
    // 如果要挂载原型方法  app.config.globalProperties 在此对象上添加原型方法
    // 全局组件
    components.map(item => app.component(item.name, item)) // 组件里面一定要加上name
    //  以后全局组件,自定义指令在此添加
  }
}
