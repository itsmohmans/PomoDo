// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "vuetify/styles/main.sass",
    '@mdi/font/css/materialdesignicons.css'
  ],
  build: {
    transpile: ["vuetify"]
  },
  modules: [
    '@vueuse/nuxt',
    [ '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
  ],
  runtimeConfig: {
    public: {
      APP_VERSION: process.env.APP_VERSION
    }
  }
})
