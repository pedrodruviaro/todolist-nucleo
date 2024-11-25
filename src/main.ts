import '@/assets/main.css'

import App from './App.vue'
import { router } from '@/router'
import { createApp } from 'vue'

const app = createApp(App)

app.mount('#app')
app.use(router)
