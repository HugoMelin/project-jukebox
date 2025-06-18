<script setup> 
  const { id } = defineProps({
    id: Number,
  });

  const vinyl = ref(null)

  const fetchVinyl = async () => {
    const res = await $fetch(`/api/vinyls/${id}`)
    vinyl.value = res;
  }
  
  onMounted(async () => {
    fetchVinyl();
  })

  const handleChangeState = async (data) => {
    await useHandleState(data);
    await fetchVinyl();
  }
</script>

<template>
    <div v-if="vinyl" class="max-w-3xl mx-auto p-6">
      <h1 class="text-3xl font-semibold text-gray-900 text-center">{{ vinyl.title }}</h1>

      <div v-if="vinyl.coverUrl" class="mt-6">
        <img :src="vinyl.coverUrl" alt="Vinyl cover" class="w-full h-auto rounded-lg shadow-lg" />
      </div>

      <h3 class="text-2xl text-gray-600">{{ vinyl.artist }}</h3>
  
      <p class="mt-2 text-gray-500">Année de sortie : {{ vinyl.year || 'Unknown' }}</p>
  
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
  
    <div v-else class="text-center mt-8">
      <p class="text-xl text-gray-600">Loading...</p>
    </div>
  </template>
  