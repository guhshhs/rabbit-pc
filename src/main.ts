import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// 导入默认样式
import 'normalize.css'
import '@/assets/styles/common.less'
// 导入 pinia 持久化插件
import piniaPersistedState from 'pinia-plugin-persistedstate'


const app = createApp(App)
const pina = createPinia()
pina.use(piniaPersistedState)
app.use(pina)

// 挂载pinia和 路由
app.use(router)
app.mount('#app')
