// 用户模块

// PC获取登录二维码，用于扫码关注微信公众号登录
export function useLoginQrcodeApi() {
  console.log('useLoginQrcodeApi')
  return useHttpGet('getLoginQrcode', `/wechat/public/getLoginQrcode`, {
    $: true,
  })
}

// PC轮询接口，判断用户是否扫码完成登录
export function useLoginApi(followId: string) {
  return useHttpGet('login', `/wechat/login?followId=${followId}`)
}

// 获取用户信息
export function useGetUserInfoApi() {
  return useHttpGet('getUserInfo', '/web/user/getUserInfo', {
    $: true,
  })
}

// 用户退出
export function useLogoutApi() {
  return useHttpPost('logout', '/wechat/logout')
}
