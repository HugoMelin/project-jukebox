import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const vinyl = await prisma.vinyl.create({
      data: {
        title: body.title,
        artist: body.artist,
        year: parseInt(body.year),
        coverUrl: body.coverUrl,
      },
    });

    return {
      statusCode: 201,
      message: "Vinyl ajouté avec succès.",
      vinyl,
    };
  } catch (error) {
    console.error("Erreur lors de l'ajout du vinyl :", error);

    return {
      statusCode: 500,
      message: "Une erreur est survenue lors de l'ajout du vinyl.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
});
