import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'

const app = createApp(App)

// 全局注册naive-ui
app.use(naive)

app.mount('#app')