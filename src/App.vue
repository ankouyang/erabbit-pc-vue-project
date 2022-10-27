<template>
  <div>
    {{$store.state.user.profie.account}}
    <hr>
   <button @click="$store.commit('user/SET_USER',{account:'ankouyang'})">设置</button>
  </div>
</template>

<script>
// import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {

  }
}
</script>
