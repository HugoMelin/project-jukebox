// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@prisma/nuxt'
  ],
  css: [
    // Ajoute le chemin vers ton fichier tailwind.css
    '@/assets/css/tailwind.css'
  ],
});
