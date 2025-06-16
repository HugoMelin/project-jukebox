import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const idParam = getRouterParam(event, "id");
        
        if (!idParam || isNaN(parseInt(idParam))) {
            return {
                statusCode: 400,
                message: "L'ID fourni est invalide ou manquant.",
            };
        }

        const id = parseInt(idParam);

        const vinyl = await prisma.vinyl.findUnique({
            where: { id }
        });

        if (!vinyl) {
            return {
                statusCode: 404,
                message: `Aucun vinyl trouvé avec l'ID ${id}.`,
            };
        }

        const res = await prisma.vinyl.delete({
            where: { id }
        })

        return {
            statusMessage: "Vinyl supprimé avec success",
            deleteVinyl: res
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du vinyl :", error);

        const errorMessage = error instanceof Error ? error.message : String(error);

        return {
            statusCode: 500,
            message: "Une erreur est survenue lors de la récupération du vinyl.",
            error: errorMessage,
        };
    }
})