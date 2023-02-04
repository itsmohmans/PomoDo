<template>
  <v-bottom-navigation :elevation="2" grow>
    <v-btn
      v-for="(page, index) in pages"
      :key="index"
      :to="page.route"
      :value="page.title"
    >
      <v-icon>mdi-{{page.icon}}</v-icon>
      {{page.title}}
    </v-btn>
  </v-bottom-navigation>
</template>
<script setup>
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
