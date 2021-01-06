import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

interface RequestFunc {
  (): void;
}

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({ // 请求刷新token可能也会401,
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

let isRefreshing = false // 防止多次刷新token
let requests: Array<RequestFunc> = [] // 缓存挂起请求
const request = axios.create({})

request.interceptors.request.use(function (config) {
  const user = store.state.user
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) { // 请求响应成功
  // 自定义错误状态码，错误处理这里
  if (response.data.code === '000000' || response.data.state === 1) { // 业务中一定是成功的
    return response
  } else { // 参数错误
    Message.error(response.data.message || '错误')
    return Promise.reject(new Error(response.data.message || '错误'))
  }
  // return response
}, async function (error) { // 超出200状态码执行, try catch的catch不能再message提示了，否则提示两次
  // http错误状态码，错误处理这里
  if (error.response) { // 请求发出去收到响应，状态码超出2xx,比如400， 401（未认证,token无效，过期）， 403（禁止访问，没有权限）， 404（不能找到资源）， 500
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) { // token问题
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 刷新token
      if (!isRefreshing) {
        isRefreshing = true
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新token失败')
          }
          // 保存新的登录信息
          store.commit('setUser', res.data.content)
          // 把本次失败的请求重新发送, 如果同时发送多个请求，都会发送刷新token,refresh_token只能使用一次，第二次使用会失败
          requests.forEach(cb => cb())
          requests = []
          return request(error.config)
        }).catch((err) => {
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(err)
        }).finally(() => {
          isRefreshing = false
        })
      }

      // 刷新状态下，把请求挂起放在requests数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })

      // refresh_token获取新的token
      // 成功了，把失败的请求重新发送
      // 失败，重新登录
      // 没有refresh_token，直接跳转登录页
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else {
    Message.error(`请求失败，${error.message}`)
    // 设置请求时发生了一些事情，触发了一个错误
  }
  return Promise.reject(error)
})

export default request
