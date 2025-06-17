import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

export const useVinylStore = defineStore("vinyl", () => {
  const vinyls = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchVinyls = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await $fetch("/api/vinyls");
      vinyls.value = res.vinyls;
    } catch (err) {
      error.value = "Impossible de récupérer les vinyls.";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchVinyls();
  });

  return {
    vinyls,
    isLoading,
    error,
    fetchVinyls,
  };
});
