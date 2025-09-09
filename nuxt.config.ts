export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  ssr: false,
  nitro: {
    preset: 'static'
  }
})