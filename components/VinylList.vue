<script setup>
import { useVinylStore } from '@/stores/vinylsStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref, computed, toRef, defineProps } from 'vue'

// Props
const props = defineProps({
  filter: {
    type: String,
    default: 'all'
  }
})
const filter = toRef(props, 'filter')

// Store
const store = useVinylStore()
const { isLoading, vinyls, error } = storeToRefs(store)
const { fetchVinyls } = store

// Autres filtres
const likedFilter = ref(false)
const listenedFilter = ref(false)

// Lifecycle
onMounted(() => {
  fetchVinyls()
})

// Computed
const filteredVinyls = computed(() => {
  let result = vinyls.value || []

  if (filter.value !== 'all') {
    result = result.filter(vinyl => vinyl?.[filter.value])
  }
  if (likedFilter.value) {
    result = result.filter(vinyl => vinyl?.liked)
  }
  if (listenedFilter.value) {
    result = result.filter(vinyl => vinyl?.listened)
  }
  return result
})

// Méthode de changement d'état
const handleChangeState = async (data) => {
  await useHandleState(data)
  await fetchVinyls()
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="mb-6 flex flex-wrap gap-4 justify-center">
      <label class="flex items-center space-x-2 text-lg">
        <input type="checkbox" v-model="listenedFilter" />
        <span>Écoutés</span>
      </label>

      <label class="flex items-center space-x-2 text-lg">
        <input type="checkbox" v-model="likedFilter" />
        <span>Aimés</span>
      </label>
</div>

    <!-- Affichage du message de chargement -->
    <div v-if="isLoading" class="text-center mt-8">
      <p class="text-xl text-gray-500">Chargement...</p>
    </div>

    <div v-if="error" class="text-center text-red-600">
      <p class="text-xl">{{ error }}</p>
      <button @click="fetchVinyls" class="bg-black text-white rounded-lg shadow-lg px-4 py-2 hover:bg-gray-800">Réessayer</button>
    </div>


    <div v-else>
      <!-- Affichage d'un message si aucun vinyl n'est disponible -->
      <div v-if="vinyls && filteredVinyls.length === 0" class="text-center text-gray-500">
        Aucun vinyl à afficher.
      </div>

      <!-- Affichage des vinyls en grille -->
      <ul class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <li v-for="vinyl in filteredVinyls" :key="vinyl.id" class="bg-white rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden flex flex-col">
          <NuxtLink :to="`/vinyls/${vinyl.id}`">
            <img
              :src="vinyl.coverUrl"
              :alt="`Cover de ${vinyl.title}`"
              class="h-auto w-full object-cover"
              loading="lazy"
            />
          </NuxtLink>
          <div class="p-5 flex flex-col justify-between h-full">
            <h2 class="text-2xl font-semibold text-gray-800">{{ vinyl.title }}</h2>
            <p class="text-gray-500 text-lg">{{ vinyl.artist }} {{ vinyl.year ? "- " + vinyl.year : "" }}</p>
            <div class="mt-4 flex space-x-6 justify-center items-center text-xl">
              <!-- Possédé -->
              <span
                :class="vinyl.owned ? 'text-green-600' : 'text-gray-400'"
                title="Possédé"
                class="cursor-pointer hover:text-green-700 transform transition duration-200"
                @click="handleChangeState({id: vinyl.id, owned: !vinyl.owned})"
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
                @click="handleChangeState({id: vinyl.id, listened: !vinyl.listened})"
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
                @click="handleChangeState({id: vinyl.id, liked: !vinyl.liked})"
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
  </div>
</template>
