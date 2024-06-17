// 微信pc支付
export function useWxpayApi(no) {
  return useHttpPost('wxpay', `/order/wxpay`, {
    body: {
      no,
    },
  })
}

// 查询订单支付状态
export function useGetWxpayStatusApi(no) {
  return useHttpPost('getWxpayStatus', `/order/iswxpay`, {
    body: {
      no,
    },
    $: true,
  })
}
