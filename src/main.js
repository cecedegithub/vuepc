import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import {
  getUser
} from '@/untils/auth'
import {
  removeUser
} from './untils/auth'
import JSONbig from 'json-bigint'
Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.transformResponse = [function (data) {
  // console.log('transformResponse => ', data)
  // return data

  // 这里使用 JSONbig.parse 转换原始数据
  // 类似于 JSON.parse
  // 但是它会处理其中超出安全整数范围的整数问题。
  // 严谨一点，如果 data 不是 json 格式字符串就会报错
  try {
    // 如果是 json 格式字符串，那就转换并返回给后续使用
    return JSONbig.parse(data)
  } catch (err) {
    // 报错就意味着 data 不是 json 格式字符串，这里就直接原样返回给后续使用
    return data
  }
}]
axios.interceptors.request.use((req) => {
  const userInfo = getUser()
  if (userInfo) {
    req.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return req
})
axios.interceptors.response.use((res) => {
  if (typeof res.data === 'object' && res.data.data) {
    return res.data.data
  } else {
    return res.data
  }
}, (err) => {
  if (err.response.status === 401) {
    removeUser()
    router.push({
      name: 'login'
    })
  }
  return err
})
Vue.use(element)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
