// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    "./runtimeConfig": "./runtimeConfig.browser",
  },
  vite: {
    define: {
      "window.global": {},
    },
  },
});
