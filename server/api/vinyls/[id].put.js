import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const parseData = (data) => {
  return {
    title: data.title ? String(data.title) : undefined,       // Transformation en chaîne
    artist: data.artist ? String(data.artist) : undefined,    // Transformation en chaîne
    year: data.year ? parseInt(data.year) : undefined,        // Conversion en entier
    owned: data.owned !== undefined ? Boolean(data.owned) : undefined, // Conversion en booléen
    listened: data.listened !== undefined ? Boolean(data.listened) : undefined, // Conversion en booléen
    liked: data.liked !== undefined ? Boolean(data.liked) : undefined, // Conversion en booléen
    coverUrl: data.coverUrl ? String(data.coverUrl) : undefined, // Transformation en chaîne
  }
};

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, "id"));
    const body = await readBody(event);

    const vinylExists = await prisma.vinyl.findUnique({
      where: { id },
    });

    if (!vinylExists) {
      return {
        statusCode: 404,
        message: "Le vinyl n'existe pas.",
      };
    }

    const updatedVinyl = await prisma.vinyl.update({
      where: { id },
      data: parseData(body),
    });

    return {
      statusCode: 203,
      message: "Vinyl mis à jour avec succès",
      updatedVinyl,
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
