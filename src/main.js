import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import App from './App.vue'
import router from './router'
import { currency } from './methods/fitters'

const app = createApp(App)
// 設置全域用 $filters為自定義名稱 加$是為了避免衝突到自己的其他名稱
app.config.globalProperties.$filters = {
  currency
}
app.use(VueAxios, axios)
app.use(router)
app.component('LoadingShow', Loading)
app.mount('#app')
