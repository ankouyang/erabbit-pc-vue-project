// 图片懒加载  定义指令 lazyload
import defautImg from '@/assets/images/200.png'
export const imgDirective = (app) => {
  // 1. 图片懒加载指令  v-lazy
  // 原理:先存储图片地址不能在src上, 当图片进去可视区,将你存储图片地址设置给图片元素即可
  app.directive('lazyload', {
    // vue2.0 监听使用指令的DOM是否创建好,钩子函数:inserted
    // vue3.0 的指令拥有的钩子函数和组件的一样,使用指令的DOM是否创建好,钩子函数:mounted
    mounted (el, binding) {
      // 2. 创建一个观察对象，来观察当前使用指令的元素.
      // callback 被观察dom进入可视区离开可视区都会触发
      // - 两个回调参数 entries , observer
      // - entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中isIntersecting判断进入或离开
      // - observer 就是观察实例
      // options 配置参数
      // - 三个配置属性 root rootMargin threshold
      // - root 基于的滚动容器，默认是document
      // - rootMargin 容器有没有外边距
      // - threshold 交叉的比例

      // 实例提供两个方法
      // observe(dom) 观察哪个dom
      // unobserve(dom) 停止观察那个dom
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
        // 停止观察,不然改元素每次进入可视区，都会执行这个段逻辑
          observer.unobserve(el)
          //   console.log('进入绑定元素的区域了')
          el.onerror = () => {
            el.src = defautImg
          }
          // 重新赋值
          el.src = binding.value
        }
      }, { threshold: 0.01 })
      // mounted只执行一次
      observer.observe(el)
    }
  }

  )
}
