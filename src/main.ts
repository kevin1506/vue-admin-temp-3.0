import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/reset.less'
import '@/assets/style/common.less'
import { elComponents } from './plugins/element.js'
const app = createApp(App)
elComponents.forEach((component: any) => {
  // app.component(component.name, component)
  app.use(component)
})
app.use(store).use(router)
app.mount('#app')
