// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'PomoDo ',
      meta: [
        { name: 'description', content: 'PomoDo is a simple material-design pomodoro timer to help you focus.' }
      ]
    }
  },
  css: [
    "vuetify/styles/main.sass",
    '@mdi/font/css/materialdesignicons.css'
  ],
  build: {
    transpile: ["vuetify"]
  },
  modules: [
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
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
  },
  pwa: {
    manifest: {
      name: 'PomoDo',
      short_name: 'PomoDo',
      description: 'A simple material design pomodoro timer to help you focus',
      icons: [
        {
          src: 'icons/logo/256.png',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: 'icons/logo/512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'icons/logo/1024.png',
          sizes: '1024x1024',
          type: 'image/png'
        },
      ]
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
})
