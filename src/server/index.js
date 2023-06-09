import axios from 'axios'
import { isPro } from '@/config/index.js'
import router from '@/router'

let baseUrl = ''
if (isPro) {
  baseUrl = 'http://103.152.132.60:3001'
} else {
  baseUrl = 'http://127.0.0.1:3001'
}

const server = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
  headers: {
    Authorization: null
  }
})

// 请求拦截
server.interceptors.request.use(
  (config) => {
    const tolen = localStorage.getItem('token')
    config.headers.Authorization = tolen
    return config
  }, (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
server.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(new Error('Error Message'))
    }
  },
  err => {
    // token 失效
    if (err.response.status === 401) {
      localStorage.removeItem('token')

      router.push({
        name: 'login'
      })
      // return Promise.reject(new Error("to login"))
    }
  }
)

export default server
