import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const vinyls = await prisma.vinyl.findMany();
    return { nb: vinyls.length, vinyls };
  } catch (error) {
    console.error("Erreur lors de la récupération des vinyls :", error);
    return {
      statusCode: 500,
      message: "Une erreur est survenue lors de la récupération des vinyls.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
});
