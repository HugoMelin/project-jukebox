<template>
  <div class="max-w-2xl mx-auto p-4">
    <input
      v-model="search"
      @input="onSearch"
      type="text"
      placeholder="Rechercher un vinyle..."
      class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <div v-if="search && loading" class="mt-4 text-center text-gray-500 italic">
      Chargement...
    </div>

    <div v-else class="mt-4">
      <div v-if="trimmedSearch && vinyls.length === 0" class="text-center text-gray-400">
        Aucun vinyle trouvé.
      </div>

      <ul v-else class="divide-y divide-gray-200">
        <li
          v-for="vinyl in vinyls"
          :key="vinyl.id"
          class="py-3 px-2 hover:bg-gray-50 transition"
        >
          <NuxtLink :to="`/vinyls/${vinyl.id}`">
            <div class="font-semibold text-gray-800">{{ vinyl.title }}</div>
            <div class="text-sm text-gray-600">{{ vinyl.artist }}</div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import debounce from 'lodash.debounce'

const search = ref('')
const vinyls = ref([])
const loading = ref(false)

const trimmedSearch = computed(() => search.value.trim())

const fetchVinyls = async () => {
  const trimmed = search.value.trim()
  if (!trimmed) {
    vinyls.value = []
    loading.value = false
    return
  }

  loading.value = true
  try {
    const queryParam = `?query=${encodeURIComponent(trimmed)}`
    const response = await $fetch(`/api/vinyls${queryParam}`)
    vinyls.value = response.vinyls || []
  } catch (error) {
    console.error('Erreur lors de la recherche des vinyles :', error)
    vinyls.value = []
  } finally {
    loading.value = false
  }
}

// debounce : la recherche ne se fait que 300ms après la frappe
const onSearch = debounce(fetchVinyls, 300)
</script>
