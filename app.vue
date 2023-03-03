<template>
  <div>
    <VitePwaManifest />
    <v-app :theme="useAppStore().getTheme">
      <Toolbar />
      <v-main>
        <NuxtPage />
      </v-main>
    </v-app>
  </div>
</template>
<script setup>
import {useAppStore} from '/stores/app'

onMounted(() => {
  getSettings()
})
</script>
<style>
/* make scrollbar invisible on chromium */
html {
  overflow:   scroll;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
</style>