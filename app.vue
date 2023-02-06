
import { useAppStore } from './stores/app';

<template>
  <v-app>
    <v-main :theme="useAppStore().getTheme">
      <NuxtPage />
    </v-main>
    <navbar />
  </v-app>
</template>
<script setup>
import {useAppStore} from '/stores/app'
</script>