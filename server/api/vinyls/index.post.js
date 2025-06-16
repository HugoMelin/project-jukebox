import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/vinyls:
 *   post:
 *     summary: Ajouter un nouveau vinyl
 *     tags:
 *       - Vinyls
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - artist
 *             properties:
 *               title:
 *                 type: string
 *                 example: Nevermind
 *               artist:
 *                 type: string
 *                 example: Nirvana
 *               year:
 *                 type: integer
 *                 nullable: true
 *                 example: 1991
 *               coverUrl:
 *                 type: string
 *                 nullable: true
 *                 example: https://example.com/covers/nevermind.jpg
 *     responses:
 *       201:
 *         description: Vinyl ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Vinyl ajouté avec succès.
 *                 vinyl:
 *                   $ref: '#/components/schemas/Vinyl'
 *       500:
 *         description: Erreur serveur lors de l'ajout du vinyl
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
 *                   example: Une erreur est survenue lors de l'ajout du vinyl.
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
*/
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
