// 分类模块
export default {
  namespaced: true, // 加上这个才能分模块
  // 注意这里写成函数而不是对象，这个和return  data是一样  语法要求
  state () {
    return {
      // 分类信息
      list: []

    }
  }
}
