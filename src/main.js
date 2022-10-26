import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//  插件用使用use
createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
