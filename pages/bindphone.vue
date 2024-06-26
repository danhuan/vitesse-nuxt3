<!-- 手机号绑定页面 -->
<script setup>
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NInputGroup,
  createDiscreteApi,
} from 'naive-ui'

useHead({ title: '绑定手机号' })
const route = useRoute()

const formRef = ref(null)
const form = reactive({
  phone: '',
  code: '',
})
const rules = {
  phone: [{
    required: true,
    message: '手机号需要填写',
    trigger: 'blur',
  }],
  code: [{
    required: true,
    message: '请输入验证码',
    trigger: 'blur',
  }],
}

const loading = ref(false)
// 回车/提交事件
function onSubmit() {
  formRef.value.validate(async (errors) => {
    if (errors)
      return

    loading.value = true

    const {
      data,
      error,
    } = await useBindPhoneApi(form)

    loading.value = false

    if (error.value)
      return

    const { message } = createDiscreteApi(['message'])
    message.success('绑定成功')

    navigateTo(route.query.from || '/', { replace: true })
  })
}
useEnterEvent(() => onSubmit())

definePageMeta({
  title: '手机绑定',
  layout: 'login',
})
</script>

<template>
  <NForm ref="formRef" class="w-[340px]" :model="form" :rules="rules" size="large">
    <NFormItem :show-label="false" path="phone">
      <NInput v-model:value="form.phone" placeholder="这里输入手机号" clearable />
    </NFormItem>
    <NFormItem :show-label="false" path="code">
      <NInputGroup>
        <NInput v-model:value="form.code" :style="{ width: '75%' }" placeholder="输入6位验证码" />
        <SendCode :phone="form.phone" />
      </NInputGroup>
    </NFormItem>
    <div>
      <NButton class="w-full" type="primary" :loading="loading" @click="onSubmit">
        绑 定
      </NButton>
    </div>
  </NForm>
</template>
