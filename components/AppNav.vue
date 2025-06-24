<template>
    <footer class="fixed bottom-0 left-0 right-0 bg-black text-white shadow-lg flex justify-between items-center p-4 z-10">
      <!-- Navigation principale -->
      <div class="flex gap-4 justify-center w-full">
        <NuxtLink 
          to="/" 
          class="flex flex-col items-center gap-1 text-sm bg-black text-white rounded-lg shadow-lg px-4 py-2 hover:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-8 h-8"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" fill="currentColor" /></svg>
          Accueil
        </NuxtLink>
        <NuxtLink 
          to="/vinyls" 
          class="flex flex-col items-center gap-1 text-sm bg-black text-white rounded-lg shadow-lg px-4 py-2 hover:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-8 h-8"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 224a128 128 0 1 0 0-256 128 128 0 1 0 0 256zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" fill="currentColor"/></svg>
          Mes vinyls
        </NuxtLink>
        <NuxtLink 
          to="/vinyls/add" 
          class="flex flex-col items-center gap-1 text-sm bg-black text-white rounded-lg shadow-lg px-4 py-2 hover:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-8 h-8"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" fill="currentColor"/></svg>
          Ajouter un vinyl
        </NuxtLink>
      </div>
  
      <!-- Burger menu pour options supplémentaires -->
      <button 
        class="bg-black text-white rounded-full p-3 shadow-lg hover:bg-gray-800 focus:outline-none"
        @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-8 h-8"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" fill="currentColor" /></svg>
      </button>
  
      <!-- Menu Burger (si activé) -->
      <div v-if="isMenuOpen" class="absolute bottom-16 right-0 bg-black text-white shadow-lg rounded-lg p-4">
        <ul>
          <li>
            <NuxtLink to="/settings" class="block p-2 hover:bg-gray-800">Paramètres</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/profile" class="block p-2 hover:bg-gray-800">Profil</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/logout" class="block p-2 hover:bg-gray-800">Déconnexion</NuxtLink>
          </li>
        </ul>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Etat pour ouvrir/fermer le menu burger
  const isMenuOpen = ref(false);
  
  // Fonction pour activer/désactiver le menu burger
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  </script>
  
  <style scoped>
  .material-icons {
    font-size: 24px;
  }
  </style>
  