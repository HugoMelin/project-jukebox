import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/vinyls:
 *   get:
 *     summary: Récupérer tous les vinyles
 *     tags:
 *       - Vinyls
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
    const vinyls = await prisma.vinyl.findMany({
      orderBy: {
        title: "asc",
      },
    });

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
