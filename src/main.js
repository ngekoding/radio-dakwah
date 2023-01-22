import { createApp } from 'vue'

import '@/styles/app.scss'
import App from './App.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'

const app = createApp(App)

app.component('material-icon', MaterialIcon)

app.mount('#app')
