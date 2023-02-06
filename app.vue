<template>
  <v-app :theme="useAppStore().getTheme">
    <v-main>
      <NuxtPage />
    </v-main>
    <navbar />
  </v-app>
</template>
<script setup>
import {useAppStore} from '/stores/app'
</script>