// 提供复用逻辑的函数(钩子)

//  useIntersectionObserver 判断是否进去浏览器可视区的hooks
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

/**
 *
 * @param {object} target  - Dom对象
 * @param { Function } apiFn -API函数
 */

export const useLazyData = (apiFn) => {
  const resultData = ref([])
  const target = ref(null)// 直接在里面定义 ref响应式数据
  // stop停止观察的函数
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
    // isIntersecting 是否进入可视区
      if (isIntersecting) {
        stop()// 停止监听
        // 调用API函数获取数据
        apiFn().then(({ result }) => {
          resultData.value = result
        })
      }
    },
    //  配置选项，threshold 容器和可视区交叉的占比（进入的面积/容器完整面积:阀值） 取值，0-1 之间，默认比0大，所以需要滚动较多才能触发进入可视区域事件。这里设置为 0 相交就触发
    {
      threshold: 0
    }
  )
  return { resultData, target } // target导出  无需再每个使用的地方都进行target定义
}
