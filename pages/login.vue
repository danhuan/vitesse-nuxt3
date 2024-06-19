<script setup>
import {
  createDiscreteApi,
} from 'naive-ui'
import { useLoginApi, useLoginQrcodeApi } from '~/apis/user.ts'

const route = useRoute()
const title = ref('微信登录')
useHead({
  title,
})

// ui布局
definePageMeta({
  layout: 'login',
})

// 登录二维码 ID
const followId = ref('')
// 登录二维码的 URL
const qrcodeUrl = ref('')

// 获取登录二维码的 URL 和跟随 ID
const { data, error } = await useLoginQrcodeApi()
if (!error.value && data.value) {
  qrcodeUrl.value = data.value.qrcodeUrl
  followId.value = data.value.followId
}

// 开始轮询订单状态
const timer = ref(null)
function checkIsLogin() {
  timer.value = setInterval(async () => {
    const { data, error } = await useLoginApi(followId.value)
    if (!error.value && data.value) {
      const { message } = createDiscreteApi(['message'])
      message.success('登录成功')

      // 将用户登录成功返回的token存储在cookie当中，用户登录成功的标识
      const token = useCookie('token')
      token.value = data.value.token
      // console.log(data.value);
      const user = useUser()

      user.value = data.value

      // 跳转
      navigateTo(route.query.from || '/', { replace: true })
    }
  }, 2000)
}

// 页面加载完成之后，开始轮询扫码状态
onNuxtReady(async () => {
  checkIsLogin()
})

// 页面销毁的时候，清除定时器
onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})
</script>

<template>
  <div>
    <h4 class="pb-4 text-xl text-blue-500">
      {{ title }}
    </h4>

    <div class="m-3 border-1 rounded-2xl p-1 lg:(h-500px w-500px) md:(h-40vw w-40vw) sm:(h-50vw w-50vw)">
      <nuxt-img :src="qrcodeUrl" class="w-full" />
    </div>
    <div class="mb-6 mt-5 text-center">
      👉 微信扫码关注公众号进行登录
    </div>
  </div>
</template>
