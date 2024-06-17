import {
  createDiscreteApi,
} from 'naive-ui'

const config = useRuntimeConfig()
export const fetchConfig = {
  baseURL: config.public.baseURL,
  headers: {
    // appid: 'bd9d01ecc75dbbaaefce',
  },
}

// 请求体封装
function useGetFetchOptions(options = {}) {
  options.baseURL = options.baseURL ?? fetchConfig.baseURL
  // options.headers = options.headers ?? {
  //   appid: fetchConfig.headers.appid,
  // }
  options.initialCache = options.initialCache ?? false // 初始化缓存
  options.lazy = options.lazy ?? false // 为true时，需要手动处理加载状态，使用pending值。
  // options.server = options.server ?? true // 为true时，仅在客户端执行。对于首次渲染不需要的数据（例如，非SEO敏感数据）非常有用 lazy: true,server: false

  // 用户登录，默认传token
  const token = useCookie('token')

  if (token.value)
    options.headers.token = token.value

  return options
}

// http请求封装
export async function useHttp(key, url, options = {}) {
  options = useGetFetchOptions(options)
  options.key = key

  if (options.$) {
    const data = ref(null)
    const error = ref(null)
    return await $fetch(url, options).then((res) => {
      data.value = res.data
      return {
        data,
        error,
      }
    }).catch((err) => {
      const msg = err?.data?.data
      if (import.meta.client) {
        const { message } = createDiscreteApi(['message'])
        message.error(msg || '服务端错误')
      }
      error.value = msg
      return {
        data,
        error,
      }
    })
  }

  const res = await useFetch(url, {
    ...options,
    // 相当于响应拦截器
    transform: (res) => {
      return res.data
    },
  })

  // 客户端错误处理
  if (import.meta.client && res.error.value) {
    const msg = res.error.value?.data?.data
    if (!options.lazy) {
      const { message } = createDiscreteApi(['message'])
      message.error(msg || '服务端错误')
    }
  }

  return res
}

// GET请求
export function useHttpGet(key, url, options = {}) {
  options.method = 'GET'
  return useHttp(key, url, options)
}

// POST请求
export function useHttpPost(key, url, options = {}) {
  options.method = 'POST'
  return useHttp(key, url, options)
}
