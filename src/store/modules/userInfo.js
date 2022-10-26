export default {
  state: {
    // 数据
    userName: '张三'
  },
  mutations: {
    // 改变数据
    UPDATE_NAME (state, pload) {
      state.userName = pload
    }
  },
  actions: {
    // 请求数据函数,异步操作
    updateName ({ commit }) {
      // 发请求
      setTimeout(() => {
        commit('UPDATE_NAME', '李四')
      }, 3000)
    }
  }
}
