import { createApp } from 'vue'
import '@/assets/css/common.less'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/locale/index.js'

createApp(App).use(store).use(router).use(i18n).mount('#app')
