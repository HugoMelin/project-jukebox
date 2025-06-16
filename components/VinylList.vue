<script setup>
import { ref, onMounted } from 'vue'

const vinyls = ref([])

onMounted(() => {
  const data = {
    count: 1,
    vinyls: [
      {
        id: 1,
        title: "Thriller",
        artist: "Michael Jackson",
        year: 1982,
        owned: true,
        listened: false,
        liked: true,
        coverUrl: "https://s1.qwant.com/thumbr/474x684/a/8/6b8397ab059b10a72b8a4104f60dec3d5545e7755827215d42e019857ef4e7/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.rxRA_DkzqSeMba_vPCTuvQHaKs%26pid%3DApi&q=0&b=1&p=0&a=0"
      },
      {
        id: 2,
        title: "Back in Black",
        artist: "AC/DC",
        year: 1980,
        owned: false,
        listened: true,
        liked: false,
        coverUrl: "https://s2.qwant.com/thumbr/474x572/4/b/1bfd42d0a815e2cba1b9e0ba3909633de0abdfa3304c365769bb251484c17a/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.LfjK-OUBTNOihY_VOieUpAHaI8%26pid%3DApi&q=0&b=1&p=0&a=0"
      }
    ]
  }

  vinyls.value = data.vinyls
})
</script>

<template>
    <div class="max-w-6xl mx-auto p-6">
      <h1 class="text-4xl font-extrabold text-center mb-8 text-gray-900">Ma collection de vinyls</h1>
      <div v-if="vinyls.length === 0" class="text-center text-gray-500">
        Aucun vinyl à afficher.
      </div>
      <!-- Liste de vinyls en grille responsive -->
      <ul class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <li v-for="vinyl in vinyls" :key="vinyl.id" class="bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden flex flex-col">
          <img
            :src="vinyl.coverUrl"
            :alt="`Cover de ${vinyl.title}`"
            class="h-auto w-full object-cover"
            loading="lazy"
          />
          <div class="p-5 flex flex-col justify-between h-full">
            <h2 class="text-2xl font-semibold text-gray-800">{{ vinyl.title }}</h2>
            <p class="text-gray-500 text-lg">{{ vinyl.artist }} - {{ vinyl.year }}</p>
            <div class="mt-4 flex space-x-6 justify-center items-center text-xl">
              <!-- Possédé -->
              <span
                :class="vinyl.owned ? 'text-green-600' : 'text-gray-400'"
                title="Possédé"
                class="cursor-pointer hover:text-green-700 transform transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="w-8 h-8">
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
                </svg>
              </span>
              <!-- Écouté -->
              <span
                :class="vinyl.listened ? 'text-blue-600' : 'text-gray-400'"
                title="Écouté"
                class="cursor-pointer hover:text-blue-700 transform transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                  <path d="M9 19V5l12 7z"/>
                </svg>
              </span>
              <!-- Aimé -->
              <span
                :class="vinyl.liked ? 'text-pink-600' : 'text-gray-400'"
                title="Aimé"
                class="cursor-pointer hover:text-pink-700 transform transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  