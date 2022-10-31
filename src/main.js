import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 重置各个浏览器中不同默认样式为一个统一的样式  这里使用normalize.css库
import 'normalize.css'
// 全局公用样式
import '@/assets/styles/global.scss'
// 自己UI插件
import UI from '@/components/library/index'

//  插件用使用use
createApp(App)
  .use(store)
  .use(router)
  .use(UI)
  .mount('#app')
