<template>
    <div class="vinyl-search">
      <input
        v-model="search"
        @input="onSearch"
        type="text"
        placeholder="Rechercher un vinyle..."
        class="search-input"
      />
  
      <div v-if="loading" class="loading">Chargement...</div>
  
      <div v-else>
        <div v-if="vinyls.length === 0" class="no-results">
          Aucun vinyle trouvé.
        </div>
  
        <ul class="vinyl-list" v-else>
          <li v-for="vinyl in vinyls" :key="vinyl.id" class="vinyl-item">
            <strong>{{ vinyl.title }}</strong> — {{ vinyl.artist }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, debounce } from '#imports'
  
  const search = ref('')
  const vinyls = ref([])
  const loading = ref(false)
  
  const fetchVinyls = async () => {
    loading.value = true
    try {
      const queryParam = search.value ? `?query=${encodeURIComponent(search.value)}` : ''
      const response = await $fetch(`/api/vinyls${queryParam}`)
      vinyls.value = response.vinyls || []
    } catch (error) {
      console.error('Erreur lors de la recherche des vinyles :', error)
      vinyls.value = []
    } finally {
      loading.value = false
    }
  }
  
  // Déclenche la recherche 300ms après la frappe (anti-spam)
  const onSearch = debounce(fetchVinyls, 300)
  
  // Charger tous les vinyles au démarrage
  onMounted(fetchVinyls)
  </script>
  
  <style scoped>
  .vinyl-search {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .search-input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .loading {
    text-align: center;
    font-style: italic;
  }
  
  .no-results {
    text-align: center;
    color: #999;
  }
  
  .vinyl-list {
    list-style: none;
    padding: 0;
  }
  
  .vinyl-item {
    padding: 8px 0;
    border-bottom: 1px solid #ddd;
  }
  </style>
  