import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/vinyls:
 *   get:
 *     summary: Récupérer tous les vinyles ou effectuer une recherche par titre ou artiste
 *     tags:
 *       - Vinyls
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: Chaîne de recherche pour filtrer les vinyles par titre ou artiste
 *     responses:
 *       200:
 *         description: Liste des vinyles récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 1
 *                 vinyls:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Vinyl'
 *       500:
 *         description: Erreur serveur
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
 *                   example: Une erreur est survenue lors de la récupération des vinyls.
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Vinyl:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Thriller
 *         artist:
 *           type: string
 *           example: Michael Jackson
 *         year:
 *           type: integer
 *           nullable: true
 *           example: 1982
 *         owned:
 *           type: boolean
 *           example: true
 *         listened:
 *           type: boolean
 *           example: false
 *         liked:
 *           type: boolean
 *           example: true
 *         coverUrl:
 *           type: string
 *           nullable: true
 *           example: https://example.com/covers/thriller.jpg
 */
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const search = query.query?.toString().toLowerCase() || "";
    let vinyls;

    if (!search) {
      vinyls = await prisma.vinyl.findMany({
        orderBy: {
          title: "asc",
        },
      });
    } else {
      vinyls = await prisma.vinyl.findMany({
        where: {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              artist: {
                contains: search,
              },
            },
          ],
        },
        orderBy: {
          title: "asc",
        },
      });
    }

    return { count: vinyls.length, vinyls };
  } catch (error) {
    console.error("Erreur lors de la récupération des vinyls :", error);
    return {
      statusCode: 500,
      message: "Une erreur est survenue lors de la récupération des vinyls.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
});
