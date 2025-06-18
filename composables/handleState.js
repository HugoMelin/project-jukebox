const

export async function useHandleState(data) {
  try {
    const res = await $fetch(`/api/vinyls/${data.id}`, {
      method: "PUT",
      body: {
        owned: data.owned !== undefined ? Boolean(data.owned) : undefined,
        listened:
          data.listened !== undefined ? Boolean(data.listened) : undefined,
        liked: data.liked !== undefined ? Boolean(data.liked) : undefined,
      },
    });
    if (res.statusCode === 203) {
      return res;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du vinyle : ", error);
    throw error;
  }
}
