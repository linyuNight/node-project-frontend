import { createApp } from 'vue'
import '@/assets/css/common.less'
import '@/assets/css/various.less'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/locale/index.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(store).use(router).use(i18n).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
