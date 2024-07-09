// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  ssr: false,
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxt/icon'],
  icon: {
    customCollections: [
      {
        prefix: 'noci',
        dir: './assets/icons',
      },
    ],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
