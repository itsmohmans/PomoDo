<template>
  <v-bottom-navigation
    :elevation="2" grow
    height="60"
  >
    <v-btn
      v-for="(page, index) in pages"
      :key="index"
      :to="page.route"
      :value="page.title"
    >
      <v-icon>mdi-{{page.icon}}</v-icon>
      {{page.title}}
    </v-btn>
    <!-- <v-spacer></v-spacer> -->
    <v-btn
      :prepend-icon="useAppStore().getTheme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      @click="useAppStore().toggleTheme()"
    >Toggle Theme</v-btn>
  </v-bottom-navigation>
</template>
<script setup>
import {useAppStore} from '/stores/app'
const pages = ref([
  {
    title: 'Timer',
    route: '/',
    icon: 'timer'
  },
  {
    title: 'Stats',
    route: '/stats',
    icon: 'chart-areaspline'
  },
  {
    title: 'Settings',
    route: '/settings',
    icon: 'cog'
  },
])
</script>
