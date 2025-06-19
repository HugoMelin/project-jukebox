<script setup>
const route = useRoute();
const id = parseInt(route.params.id);

if(!id) {
    navigateTo('/vinyls');
}
</script>

<template>
    <main>
        <VinylItem :id="id" />
    </main>
</template>