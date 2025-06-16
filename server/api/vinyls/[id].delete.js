import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/vinyls/{id}:
 *   delete:
 *     summary: Supprimer un vinyle par son ID
 *     tags:
 *       - Vinyls
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du vinyle à supprimer
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Vinyl supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusMessage:
 *                   type: string
 *                   example: Vinyl supprimé avec success
 *                 deleteVinyl:
 *                   $ref: '#/components/schemas/Vinyl'
 *       400:
 *         description: ID invalide ou manquant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: L'ID fourni est invalide ou manquant.
 *       404:
 *         description: Aucun vinyle trouvé avec cet ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Aucun vinyl trouvé avec l'ID 2.
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Une erreur est survenue lors de la récupération du vinyl.
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
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