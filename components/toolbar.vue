<template>
  <v-toolbar :collapse="isFullscreen" density="compact" color="background">
    <v-btn
      v-if="!isFullscreen"
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

    <v-spacer v-if="!isFullscreen"></v-spacer>

    <v-btn v-if="!isFullscreen" icon @click="useAppStore().toggleTheme()">
      <v-icon>{{ useAppStore().getTheme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      <v-tooltip activator="parent" location="bottom">
        Toggle Theme
      </v-tooltip>
    </v-btn>
    <v-btn icon @click="toggle">
      <v-icon>{{ isFullscreen ? 'mdi-arrow-collapse' : 'mdi-arrow-expand' }}</v-icon>
      <v-tooltip activator="parent" location="bottom">
        Toggle full screen
      </v-tooltip>
    </v-btn>
  </v-toolbar>
</template>
<script setup>
import {useAppStore} from '/stores/app'
const { isFullscreen, enter, exit, toggle } = useFullscreen()

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
