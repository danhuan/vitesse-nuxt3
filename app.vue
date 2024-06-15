<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}

/*.layout-enter-active,
.layout-leave-active {
  transition: all 1s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}*/
</style>
