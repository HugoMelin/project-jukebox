<template>
    <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Ajouter un Vinyle</h2>
  
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            id="title"
            v-model="vinyl.title"
            required
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Titre du vinyle"
          />
        </div>
  
        <div class="mb-4">
          <label for="artist" class="block text-sm font-medium text-gray-700">Artiste</label>
          <input
            type="text"
            id="artist"
            v-model="vinyl.artist"
            required
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Nom de l'artiste"
          />
        </div>
  
        <div class="mb-4">
          <label for="year" class="block text-sm font-medium text-gray-700">Année de sortie</label>
          <input
            type="number"
            id="year"
            v-model="vinyl.year"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Année de sortie (optionnel)"
          />
        </div>
  
        <div class="mb-4">
          <label for="coverUrl" class="block text-sm font-medium text-gray-700">URL de la couverture</label>
          <input
            type="url"
            id="coverUrl"
            v-model="vinyl.coverUrl"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="URL de l'image de couverture (optionnel)"
          />
        </div>
  
        <div class="flex items-center justify-center mt-6">
          <button
            type="submit"
            class="bg-black text-white rounded-lg shadow-lg px-4 py-2 hover:bg-gray-800"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  // État du formulaire
  const vinyl = ref({
    title: '',
    artist: '',
    year: null,
    coverUrl: ''
  });
  
  // Gestionnaire d'envoi du formulaire
  const handleSubmit = () => {
    // Ici vous pouvez ajouter votre logique pour envoyer les données du formulaire
    console.log(vinyl.value);
    // Par exemple, appeler une API pour enregistrer le vinyle
  };
  </script>
