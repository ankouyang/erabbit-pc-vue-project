// 用户模块
export default {
  namespaced: true, // 加上这个才能分模块
  // 注意这里写成函数而不是对象，这个和return  data是一样  语法要求
  state () {
    return {
      // 用户信息
      profie: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }

    }
  },
  mutations: {
    // 修改用户信息
    setUser (state, payload) {
      state.profie = payload
    }
  }
}
