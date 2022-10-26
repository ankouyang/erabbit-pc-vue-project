<template>
  <div>
    <!-- 1. 在模板使用vuex userInfo模块下面的state -->
    {{$store.state.userInfo.userName}}
    <hr>
    <!-- 2. 默认情况下 state是有区分模块的，其他的 getters  mutations actions 都在全局,这里整合了一个getter.js文件整合在一起了 -->
    {{$store.getters.getUserName}}
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    const store = useStore()
    console.log(store.state.userInfo.userName)
    console.log(store.getters.getUserName)
    // 可直接调用，无需区分模块    

    
    store.commit('UPDATE_NAME', '2323')
    store.dispatch('updateName')

    return {

    }
  }
}
</script>
