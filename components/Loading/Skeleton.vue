<!-- 骨架屏加载组件 -->
<script setup>
import { NCard, NSkeleton } from 'naive-ui'
</script>

<template>
  <NCard v-for="i in 4" :key="i" class="mb-5">
    <NSkeleton text style="width:30%" />
    <NSkeleton text :repeat="2" />
    <NSkeleton text style="width: 45%" />
    <NSkeleton text style="width: 60%" />
  </NCard>
</template>
