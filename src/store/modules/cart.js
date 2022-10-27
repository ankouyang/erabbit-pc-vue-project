// 购物车模块
export default {
  namespaced: true, // 加上这个才能分模块
  // 注意这里写成函数而不是对象，这个和return  data是一样  语法要求
  state () {
    return {
      // 购物车商品列表
      lis: []

    }
  }
}
