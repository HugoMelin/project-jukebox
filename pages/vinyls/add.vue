<template>
    <main>
        <AddVinylForm :formulaire="formulaire" buttonLabel="Envoyer" @handleSubmit="handleSubmit"/>
    </main>
</template>

<script setup>
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
      const res = await $fetch("/api/vinyls", {
        method: "POST",
        body: vinyl
      })
      console.log('Vinyle ajouté avec succés : ', res.vinyl);

      navigateTo(`/vinyls/${res.vinyl.id}`)
    } catch (error) {
      console.error(error)
    }
  };
</script>