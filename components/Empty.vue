<script setup>
import { NEmpty } from 'naive-ui'

defineProps({
  desc: {
    type: String,
    default: '暂无数据',
  },
})
</script>

<template>
  <NEmpty :description="desc" size="large" class="py-10" />
</template>
