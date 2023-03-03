<template>
  <v-toolbar :collapse="isFullscreen" density="compact" color="background">
    <Settings v-if="!isFullscreen" />
    <v-btn
      icon
      :to="useRoute().name === 'stats' ? '/' : '/stats'"
    >
      <v-icon>
        {{
           useRoute().name === 'stats' ? 'mdi-timer' : 'mdi-chart-areaspline'
        }}
      </v-icon>
      <v-tooltip activator="parent" location="bottom" open-delay="500">
        {{
           useRoute().name === 'stats' ? 'Timer' : 'Statistics'
        }}
      </v-tooltip>
    </v-btn>
    <v-spacer v-if="!isFullscreen"></v-spacer>
    <v-btn v-if="!isFullscreen && useAppStore().showThemeToggle" icon @click="useAppStore().toggleTheme()">
      <v-icon>{{ useAppStore().getTheme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      <v-tooltip activator="parent" location="bottom" open-delay="500">
        Toggle Theme
      </v-tooltip>
    </v-btn>
    <v-btn icon @click="toggleFullScreen">
      <v-icon>{{ isFullscreen ? 'mdi-arrow-collapse' : 'mdi-arrow-expand' }}</v-icon>
      <v-tooltip activator="parent" location="bottom" open-delay="500">
        Toggle full screen
      </v-tooltip>
    </v-btn>
  </v-toolbar>
</template>
<script setup>
import {useAppStore} from '/stores/app'
const { isFullscreen, toggle:toggleFullScreen } = useFullscreen()
</script>
