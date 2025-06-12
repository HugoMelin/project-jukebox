import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, "id"));
    const body = await readBody(event);

    const updateVinyl = await prisma.vinyl.update({
      where: { id },
      data: {
        title: body.title,
        artist: body.artist,
        year: body.year,
        owner: body.owner,
        listened: body.listened,
        liked: body.liked,
        coverUrl: body.coverUrl,
      },
    });

    return {
      statusCode: 203,
      message: "Vinyl mis à jour avec succès",
      updateVinyl,
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du vinyl :", error);
    return {
      statusCode: 500,
      message: "Une erreur est survenue lors de la mise à jour du vinyl.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
});
