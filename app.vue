<script setup>

</script>

<template>
  <header class="flex gap-4 p-4">
    <NuxtLink to="/" class="bg-black text-white rounded-lg shadow-lg px-4 py-2 hover:bg-gray-800">Accueil</NuxtLink>
    <NuxtLink to="/vinyls" class="bg-black text-white rounded-lg shadow-lg px-4 py-2 hover:bg-gray-800">Mes vinyls</NuxtLink>
    <NuxtLink to="/vinyls/add" class="bg-black text-white rounded-lg shadow-lg px-4 py-2 hover:bg-gray-800">Ajouter un vinyl</NuxtLink>
  </header>
  <NuxtPage />
  <AppNav />
</template>

<style>
</style>