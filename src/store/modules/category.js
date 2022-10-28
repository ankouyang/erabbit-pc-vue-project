import { findAllCategory } from '@/api/category'
import { topCategory } from '@/constants/constant'

// 分类模块
export default {
  namespaced: true, // 加上这个才能分模块
  // 注意这里写成函数而不是对象，这个和return  data是一样  语法要求
  state () {
    return {
      // 分类信息,这里最好添加一个name
      list: topCategory.map(name => ({ name: name }))

    }
  },
  // 修改分类函数
  mutations: {
    setCategorylist (state, payload) {
      state.list = payload
    },
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }

  },
  actions: {
    async getAllCategorylist ({ commit }) {
      const { result } = await findAllCategory()
      result.forEach(top => {
        top.open = false
      })
      commit('setCategorylist', result || [])
    }
  }
}
