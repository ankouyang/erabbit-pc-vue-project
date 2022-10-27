
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
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  modules: { user, cart, category },

  // 配置插件
  plugins: [
    // createPersistedstate默认是localStroge
    createPersistedstate(
      {
        //  存储模式为修改为sessionStorage
        storage: window.sessionStorage,
        // 本地存储名字
        key: 'erabbit-pc-vue-project',
        // 指定需要存储的模块
        paths: ['user', 'cart']
      }
    )]
})
