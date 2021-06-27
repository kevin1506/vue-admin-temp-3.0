import axios from 'axios'
import qs from 'qs'
import { ElMessage, ElMessageBox } from 'element-plus'
// import store from '../store'

// 创建axios实例
// let BASE_URL = ''
// if (process.env.NODE_ENV === 'production') {
//   BASE_URL = 'http://192.168.201.121:58087'
// } else {
//   BASE_URL = 'http://192.168.201.121:58087'
// }
const BASE_URL = 'http://192.168.201.121:58087'
const service = axios.create({
  baseURL: BASE_URL, // api的base_url
  timeout: 20000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // 请求前的拦截 do something
  // if (config.method === 'post') {
  //   // config.data = qs.stringify(config.params)
  //   config.data = JSON.stringify(config.params)
  //   config.params = null
  // }
  return config
}, error => {
  // console.log(error) // for debug
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.success) {
      return res
    } else {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // store.dispatch('FedLogOut').then(() => {
          //   location.reload()// 为了重新实例化vue-router对象 避免bug
          // })
        })
      } else {
        return res
      }
      return res
    }
  },
  error => {
    // console.log('err：' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
// { method = 'get' } = {}, enableQs = true
export default function axiosReq (...args:any[]):any {
  // const arg = arguments[0]
  // let opts = Object.assign({ method }, arg)
  let opts = Object.assign({}, { method: 'get' }, args[0])
  const enableQs = args[1] === undefined ? true : args[1]
  if (opts.params && opts.method === 'post') {
    opts.data = opts.params
    enableQs && (opts.data = qs.stringify(opts.params))
    opts.paramsType === 'json' && (opts.data = JSON.stringify(opts.params))
    opts = JSON.parse(JSON.stringify(opts, (key, value) => {
      if (key === 'params' || key === 'paramsType') {
        return undefined
      } else {
        return value
      }
    }))
  }
  return service(opts)
}
