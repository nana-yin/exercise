import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// 全局引入echarts
// import * as echarts from 'echarts'
// 按需引入echarts
import * as echarts from 'echarts/lib/echarts'
import { PieChart, GaugeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([PieChart, GaugeChart, CanvasRenderer])
Vue.prototype.$echarts = echarts
Vue.use(Antd)
Vue.config.productionTip = false

// runtime
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
