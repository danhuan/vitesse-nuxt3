/*
* 路由中间件 todo
* 页面中使用示例
  definePageMeta({
    middleware: 'auth'
  })
**/
export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated()是一个验证用户是否已经认证的示例方法
  if (isAuthenticated() === false)
    return navigateTo('/login')
})

/**
 * todo
 * 验证用户是否已经认证
 */
function isAuthenticated() {
  return true
}
