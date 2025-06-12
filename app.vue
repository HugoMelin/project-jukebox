<script setup>
async function testUpdateVinyl() {
  const vinylId = 2; // Remplace par un id existant
  const url = `/api/vinyls/${vinylId}`;

  const updateData = {
    title: "Wish You Were Here",
    artist: "Pink Floyd",
    year: 1975,
    listened: true,
    liked: true,
    coverUrl: "https://example.com/covers/wishyouwerehere.jpg"
  };

  try {
    const response = await $fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });

    const result = await response;

    if (response.ok) {
      console.log("Mise à jour réussie :", result);
    } else {
      console.error("Erreur du serveur :", result);
    }
  } catch (error) {
    console.error("Erreur réseau ou autre :", error);
  }
}

testUpdateVinyl();
</script>

<template>
  <h1 class="text-[2rem] text-white-700 underline font-[600]">App</h1>
  <div>
    <NuxtWelcome />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>