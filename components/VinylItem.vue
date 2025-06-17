<script setup> 
  const { id } = defineProps({
    id: Number,
  });

  const vinyl = ref(null)
  
  // Simuler des données fictives
  onMounted(() => {
    // Simule un appel API avec des données statiques
    vinyl.value = {
      id: 1,
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      year: 1973,
      owned: true,
      listened: true,
      liked: true,
      coverUrl: 'https://s2.qwant.com/thumbr/474x474/c/1/0ba0cb230252f8e400019341f924b9624c94fc3bbdf272f0193aa0c6986a42/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.jo0Cv1x2A3XMNFBtsi-HtQHaHa%26pid%3DApi&q=0&b=1&p=0&a=0'
    }
  })
</script>

<template>
    <div v-if="vinyl" class="max-w-3xl mx-auto p-6">
      <h1 class="text-3xl font-semibold text-gray-900 text-center">{{ vinyl.title }}</h1>

      <div v-if="vinyl.coverUrl" class="mt-6">
        <img :src="vinyl.coverUrl" alt="Vinyl cover" class="w-full h-auto rounded-lg shadow-lg" />
      </div>

      <h3 class="text-2xl text-gray-600">{{ vinyl.artist }}</h3>
  
      <p class="mt-2 text-gray-500">Année de sortie : {{ vinyl.year || 'Unknown' }}</p>
  
      <div class="mt-6">
        <p class="text-gray-800"><strong>Owned:</strong> {{ vinyl.owned ? 'Yes' : 'No' }}</p>
        <p class="text-gray-800"><strong>Listened:</strong> {{ vinyl.listened ? 'Yes' : 'No' }}</p>
        <p class="text-gray-800"><strong>Liked:</strong> {{ vinyl.liked ? 'Yes' : 'No' }}</p>
      </div>
    </div>
  
    <div v-else class="text-center mt-8">
      <p class="text-xl text-gray-600">Loading...</p>
    </div>
  </template>
  