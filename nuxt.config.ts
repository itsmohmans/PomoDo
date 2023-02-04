// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/styles/main.sass"],
  build: {
    transpile: ["vuetify"]
  },
  modules: [
    '@pinia/nuxt',
  ],
})
