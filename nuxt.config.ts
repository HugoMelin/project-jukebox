// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@prisma/nuxt", "@pinia/nuxt"],
  css: ["@/assets/css/tailwind.css"],
});
