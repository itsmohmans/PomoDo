<template>
  <v-toolbar density="compact" color="background">
    <v-btn
      v-for="(page, index) in pages"
      :key="index"
      :to="page.route"
      :value="page.title"
      icon
    >
      <v-icon>mdi-{{page.icon}}</v-icon>
      <v-tooltip activator="parent" location="bottom">
        {{ page.title }}
      </v-tooltip>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn icon @click="useAppStore().toggleTheme()">
      <v-icon>{{ useAppStore().getTheme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      <v-tooltip activator="parent" location="bottom">
        Toggle Theme
      </v-tooltip>
    </v-btn>
  </v-toolbar>
</template>
<script setup>
import {useAppStore} from '/stores/app'

const pages = ref([
  {
    title: 'Settings',
    route: '/settings',
    icon: 'cog'
  },
  {
    title: 'Stats',
    route: '/stats',
    icon: 'chart-areaspline'
  },
  {
    title: 'Timer',
    route: '/',
    icon: 'timer'
  },
])
</script>
