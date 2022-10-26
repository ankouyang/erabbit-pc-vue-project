
// vue2.0 创建仓库 new Vuex.Store({})
// vue3.0 创建仓库 create Store({})
// export default createStore({
//   state: {
//     // 数据
//     userName: '张三'
//   },
//   mutations: {
//     // 改变数据
//     UPDATE_NAME (state, pload) {
//       state.userName = pload
//     }
//   },
//   actions: {
//     // 请求数据函数,异步操作
//     updateName ({ commit }) {
//       // 发请求
//       setTimeout(() => {
//         commit('UPDATE_NAME', '李四')
//       }, 3000)
//     }
//   },
//   modules: {
//     // 分模块

//   },
//   getters: {
//     // vuex 计算属性
//     newName: (state) => state.userName + '!!!!'
//   }
// })

import { createStore } from 'vuex'
import userInfo from './modules/userInfo'
import getters from './getters'

export default createStore({
  modules: { userInfo },
  getters: getters
})
