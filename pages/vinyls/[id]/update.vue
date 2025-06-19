<template>
    <main>
        <div v-if="isLoading" class="text-center mt-8">
            <p class="text-xl text-gray-500">Chargement...</p>
        </div>
        <AddVinylForm v-else :formulaire="formulaire" buttonLabel="Modifier" @handleSubmit="handleSubmit" :data="vinyl"/>
    </main>
</template>

<script setup>
const route = useRoute();
const id = parseInt(route.params.id);

const vinyl = ref(null)
const isLoading = ref(true)

  const fetchVinyl = async () => {
    const res = await $fetch(`/api/vinyls/${id}`)
    vinyl.value = res;
    isLoading.value = false;
  }
  
  onMounted(async () => {
    fetchVinyl();
  })

const formulaire = [
    {
        label: 'Titre',
        input: "Titre du vinyle",
        id: 'title',
        type: 'texte',
        required: true
    },
    {
        label: 'Artiste',
        input: "Nom de l'artiste",
        id: 'artist',
        type: 'texte',
        required: true
    },
    {
        label: 'Année de sortie',
        input: "Année de sortie (optionnel)",
        id: 'year',
        type: 'number',
        required: false
    },
    {
        label: 'URL de la couverture',
        input: "URL de la couverture (optionnel)",
        id: 'coverUrl',
        type: 'url',
        required: false
    },
]

const handleSubmit = async (vinyl) => {
    try {
      const res = await $fetch(`/api/vinyls/${id}`, {
        method: "PUT",
        body: vinyl
      })
      console.log('Vinyle modifié avec succés : ', res.updatedVinyl);
      navigateTo(`/vinyls/${id}`)
    } catch (error) {
      console.error(error)
    }
  };
</script>