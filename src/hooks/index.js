// 提供复用逻辑的函数(钩子)

//  useIntersectionObserver 判断是否进去浏览器可视区的hooks
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

/**
 *
 * @param {object} target  - Dom对象
 * @param { Function } apiFn -API函数
 */

export const useLayData = (target, apiFn) => {
  const resultData = ref([])
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
    }
  )
  return resultData
}
