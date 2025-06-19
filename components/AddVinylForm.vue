<template>
    <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Ajouter un Vinyle</h2>
  
      <form @submit.prevent="() => { $emit('handleSubmit', vinyl); resetForm() }">
        <div v-if="!formulaire">
          <p>Pas d'entrée formulaire</p>
        </div>
        <div class="mb-4" v-for="(field, index) in formulaire" :key="index">
        <label :for="field.id" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
        <input
          :type="field.type"
          :id="field.id"
          v-model="vinyl[field.id]"
          :required="field.required"
          class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          :placeholder="field.input"
        />
        </div>
  
        <div class="flex items-center justify-center mt-6">
          <button
            type="submit"
            class="bg-black text-white rounded-lg shadow-lg px-4 py-2 hover:bg-gray-800"
          >
            {{ buttonLabel ? buttonLabel : "Soumettre le formulaire"}}
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
const props = defineProps({
  formulaire: Array,
  buttonLabel: String,
  data: Object
})

  const vinyl = ref({
    title: '',
    artist: '',
    year: null,
    coverUrl: ''
  });

  onMounted(() => {
    if (props.data) {
      vinyl.value = { ...props.data }
    }
  })

  const resetForm = () => {
  vinyl.value = {
    title: '',
    artist: '',
    year: null,
    coverUrl: ''
  };
};
  </script>
