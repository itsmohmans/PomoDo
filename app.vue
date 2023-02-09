<template>
  <v-app :theme="useAppStore().getTheme">
    <Toolbar />
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>
<script setup>
import {useAppStore} from '/stores/app'
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