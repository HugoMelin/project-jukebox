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

/**
 * @swagger
 * /api/vinyls/{id}:
 *   put:
 *     summary: Mettre à jour un vinyle existant
 *     tags:
 *       - Vinyls
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du vinyle à mettre à jour
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: The Dark Side of the Moon
 *               artist:
 *                 type: string
 *                 example: Pink Floyd
 *               year:
 *                 type: integer
 *                 nullable: true
 *                 example: 1973
 *               owned:
 *                 type: boolean
 *                 example: true
 *               listened:
 *                 type: boolean
 *                 example: true
 *               liked:
 *                 type: boolean
 *                 example: false
 *               coverUrl:
 *                 type: string
 *                 nullable: true
 *                 example: https://example.com/covers/darkside.jpg
 *     responses:
 *       203:
 *         description: Vinyl mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 203
 *                 message:
 *                   type: string
 *                   example: Vinyl mis à jour avec succès
 *                 updatedVinyl:
 *                   $ref: '#/components/schemas/Vinyl'
 *       404:
 *         description: Le vinyl n'existe pas
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
 *                   example: Le vinyl n'existe pas.
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
 *                   example: Une erreur est survenue lors de la mise à jour du vinyl.
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
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
