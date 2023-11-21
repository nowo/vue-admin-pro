import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router'

import { directive } from '@/directive'

// import { elSvg } from '@/utils/other'

import 'uno.css'
import '@unocss/reset/tailwind-compat.css'
import '@/assets/scss/index.scss'

const app = createApp(App)

directive(app)
// elSvg(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
