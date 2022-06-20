const travel_ctrl = require("../controllers/travel");
const user_ctrl = require("../controllers/user");

module.exports = [
  /**
   * @swagger
   * components:
   *   schemas:
   *     Travel:
   *       type: object
   *       properties:
   *          id:
   *            type: integer
   *            description: Id du voyage
   *          name:
   *            type: string
   *            description: Nom du voyage
   *          picture:
   *            type: string
   *            description: Image du voyage
   *          status:
   *            type: integer
   *            description: Indique l'état d'activité du voyage
   *          infos:
   *            type: string
   *            description: Description indiqué lors du voyage
   *          toPublish:
   *            type: boolean
   *            description: Indique si le voyage est publique ou non
   *          positionAgree:
   *            type: boolean
   *            description: Indique si on autorise la suivie de notre position
   *          startDate:
   *            type: date
   *            description: Date de début du voyage
   *          createdAt:
   *            type: string
   *            description: Date de création du voyage
   *          updateAt:
   *            type: string
   *            description: Date de modification du voyage
   *
   *       example:
   *         id: 5
   *         name: Visite Asie centrale.
   *         picture: null
   *         status: 0
   *         infos: null
   *         toPublish: true
   *         positionAgree: true
   *         startDate: 25/06/2022
   *         createdAt: 2022-03-17T15:17:42.282Z
   *         updateAt: 2022-03-17T15:17:42.282Z
   *
   */

  /**
   * @swagger
   * /travel:
   *   get:
   *     tags:
   *     - Travel
   *     summary: Retourne tout les voyages.
   *     description: Retourne tout les voyages dont l'id est unique.
   *     responses:
   *       200:
   *         description: Retourne tout les voyages.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id du voyage
   *                   example: 5
   *                 name:
   *                   type: string
   *                   description: Nom du voyage
   *                   example: Tournée Asie centrale
   *                 picture:
   *                   type: string
   *                   description: Image du voyage
   *                   example: null
   *                 status:
   *                   type: integer
   *                   description: Indique l'état d'activité du voyage
   *                   example: 0
   *                 infos:
   *                   type: string
   *                   description: Description d'un voyage
   *                   example: null
   *                 toPublish:
   *                   type: boolean
   *                   description: Indique si le voyage est publique ou non
   *                   example: true
   *                 positionAgree:
   *                   type: boolean
   *                   description: Indique si on autorise la suivie de notre position
   *                   example: true
   *                 startDate:
   *                   type: date
   *                   description: Date de début du voyage
   *                   example: null
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du voyage
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du voyage
   *                   example: 2022-03-17T15:17:42.282Z
   *                 UserId:
   *                   type: integer
   *                   description: Id de l'utilisateur ayant crée le voyage
   *                   example: 2
   *
   *
   *
   *
   */

  /**
   * @swagger
   * /travel:
   *   post:
   *     tags:
   *     - Travel
   *     summary: Créer un nouveau voyage.
   *     description: Création d'un nouveau voyage.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Nom du nouveau voyage
   *                 example: Vacance 2022
   *               picture:
   *                 type: string
   *                 description: Image du voyage
   *                 example:
   *               activated:
   *                 type: boolean
   *                 description: Indique si le voyage est actif
   *                 example: true
   *               budget:
   *                 type: integer
   *                 description: Budget du voyage
   *                 example: 3580
   *               infos:
   *                 type: string
   *                 description: Description du voyage
   *                 example:
   *               finished:
   *                 type: boolean
   *                 description: Indique si le voyage est fini
   *                 example: false
   *     responses:
   *       201:
   *         description: Point crée avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *                   description: Nom du nouveau voyage
   *                   example: Vacance 2022
   *                 picture:
   *                   type: string
   *                   description: Image du voyage
   *                   example:
   *                 activated:
   *                   type: boolean
   *                   description: Indique si le voyage est actif
   *                   example: true
   *                 budget:
   *                   type: integer
   *                   description: Budget du voyage
   *                   example: 3580
   *                 infos:
   *                   type: string
   *                   description: Description du voyage
   *                   example:
   *                 finished:
   *                   type: boolean
   *                   description: Indique si le voyage est fini
   *                   example: false
   *
   */

  /**
   * @swagger
   * /travelpublished:
   *   get:
   *     tags:
   *     - Travel
   *     summary: Retourne tout les voyages actifs.
   *     description: Retourne tout les voyages actifs.
   *     responses:
   *       200:
   *         description: Retourne tout les voyages publique.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id du voyage
   *                   example: 5
   *                 name:
   *                   type: string
   *                   description: Nom du voyage
   *                   example: Tournée Asie centrale
   *                 picture:
   *                   type: string
   *                   description: Image du voyage
   *                   example: null
   *                 status:
   *                   type: integer
   *                   description: Indique l'état d'activité du voyage
   *                   example: 2
   *                 infos:
   *                   type: string
   *                   description: Description d'un voyage
   *                   example: null
   *                 toPublish:
   *                   type: boolean
   *                   description: Indique si le voyage est publique ou non
   *                   example: true
   *                 positionAgree:
   *                   type: boolean
   *                   description: Indique si on autorise la suivie de notre position
   *                   example: true
   *                 startDate:
   *                   type: date
   *                   description: Date de début du voyage
   *                   example: null
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du voyage
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du voyage
   *                   example: 2022-03-17T15:17:42.282Z
   *                 UserId:
   *                   type: integer
   *                   description: Id de l'utilisateur ayant crée le voyage
   *                   example: 2
   *
   *
   *
   *
   */

  /**
   * @swagger
   * /travel/{travel_id}:
   *   get:
   *     tags:
   *     - Travel
   *     summary: Retourne un voyage dont l'id est passé en paramètre.
   *     description: Retourne le voyage demandé avec l'id passé en paramètre.
   *     parameters:
   *      - in: path
   *        name: travel_id
   *        example: 1
   *        required: true
   *        schema:
   *          type: integer
   *
   *     responses:
   *       200:
   *         description: Retourne les infos d'un voyage dont l'id est passé en paramètre.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id du voyage
   *                   example: 5
   *                 name:
   *                   type: string
   *                   description: Nom du voyage
   *                   example: Tournée Asie centrale
   *                 picture:
   *                   type: string
   *                   description: Image du voyage
   *                   example: null
   *                 status:
   *                   type: integer
   *                   description: Indique l'état d'activité du voyage
   *                   example: 2
   *                 infos:
   *                   type: string
   *                   description: Description d'un voyage
   *                   example: null
   *                 toPublish:
   *                   type: boolean
   *                   description: Indique si le voyage est publique ou non
   *                   example: true
   *                 positionAgree:
   *                   type: boolean
   *                   description: Indique si on autorise la suivie de notre position
   *                   example: true
   *                 startDate:
   *                   type: date
   *                   description: Date de début du voyage
   *                   example: null
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du voyage
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du voyage
   *                   example: 2022-03-17T15:17:42.282Z
   *                 UserId:
   *                   type: integer
   *                   description: Id de l'utilisateur ayant crée le voyage
   *                   example: 2
   *
   */

  /**
   * @swagger
   * /travel/{travel_id}/points:
   *   get:
   *     tags:
   *     - Travel
   *     summary: Retourne tout les points d'intérêt d'un voyage.
   *     description: Retourne tout les points d'intérêt d'un voyage dont l'id du voyage est passé en paramètre.
   *     parameters:
   *      - in: path
   *        name: travel_id
   *        example: 1
   *        required: true
   *        schema:
   *          type: integer
   *
   *     responses:
   *       200:
   *         description: Retourne les points d'intérêt d'un voyage dont l'id du voyage est passé en paramètre.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id du point d'intérêt
   *                   example: 33
   *                 title:
   *                   type: string
   *                   description: Titre du point d'intérêt
   *                   example: Arc de Triomphe
   *                 latitude:
   *                   type: number
   *                   format: float
   *                   description: Latitude du point d'intérêt
   *                   example: 48.87382848822226
   *                 longitude:
   *                   type: number
   *                   format: float
   *                   description: Longitude du point d'intérêt
   *                   example: 2.2950540054083306
   *                 description:
   *                   type: string
   *                   description: Description du point d'intérêt
   *                   example: null
   *                 category:
   *                   type: string
   *                   description: Catégorie du point d'intérêt
   *                   example: Monument historique
   *                 day:
   *                   type: integer
   *                   description: Correspond au numéro du jour d'étape associé
   *                   example: 3
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du point d'intérêt
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du point d'intérêt
   *                   example: 2022-03-17T15:17:42.282Z
   *                 TravelId:
   *                   type: integer
   *                   description: Id du voyage
   *                   example: 1
   *                 StepId:
   *                   type: integer
   *                   description: Id du point d'étape
   *                   example: 8
   *
   */

  /**
   * @swagger
   * /travel/{travel_id}/steps:
   *   get:
   *     tags:
   *     - Travel
   *     summary: Retourne tout les points d'étapes d'un voyage.
   *     description: Retourne tout les points d'étapes d'un voyage dont l'id du voyage est passé en paramètre.
   *     parameters:
   *      - in: path
   *        name: travel_id
   *        example: 1
   *        required: true
   *        schema:
   *          type: integer
   *
   *     responses:
   *       200:
   *         description: Retourne les points d'étapes d'un voyage dont l'id est passé en paramètre.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id du point
   *                   example: 1
   *                 title:
   *                   type: string
   *                   description: Titre du point
   *                   example: Strasbourg
   *                 description:
   *                   type: string
   *                   description: Description du point
   *                   example: null
   *                 latitude:
   *                   type: number
   *                   format: float
   *                   description: Latitude du point
   *                   example: 48.58216674328555
   *                 longitude:
   *                   type: number
   *                   format: float
   *                   description: Longitude du point
   *                   example: 7.742935804417188
   *                 duration:
   *                   type: integer
   *                   description: Nombre de jour du point d'étape
   *                   example: 3
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du point
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du point
   *                   example: 2022-03-17T15:17:42.282Z
   *                 TravelId:
   *                   type: integer
   *                   description: Id du voyage
   *                   example: 2
   *       404:
   *         description: L'id que vous avez passé n'existe pas. Voyage non trouvé.
   *
   *
   */

  /**
   * @swagger
   * /travel/{travel_id}/routes:
   *   get:
   *     tags:
   *     - Travel
   *     summary: Retourne les informations d'un trajet entre deux étapes.
   *     description: Retourne les informations d'un trajet.
   *     parameters:
   *      - in: path
   *        name: travel_id
   *        example: 1
   *        required: true
   *        schema:
   *          type: integer
   *
   *     responses:
   *       200:
   *         description: Retourne les points d'étapes d'un voyage dont l'id est passé en paramètre.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id du trajet.
   *                   example: 1
   *                 travelType:
   *                   type: string
   *                   description: Type de voyage.
   *                   example: DRIVING
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du point.
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du point.
   *                   example: 2022-03-17T15:17:42.282Z
   *                 start:
   *                   type: integer
   *                   description: Id du point de départ du trajet.
   *                   example: 1
   *                 finish:
   *                   type: integer
   *                   description: Id du point d'arrivé du trajet.
   *                   example: 2
   *                 TravelId:
   *                   type: integer
   *                   description: Id du voyage passé en paramètre.
   *                   example: 1
   *       404:
   *         description: L'id que vous avez passé n'existe pas. Voyage non trouvé.
   *
   *
   */

  /**
   * @swagger
   * /travel/{travel_id}:
   *   put:
   *     tags:
   *     - Travel
   *     summary: Update voyage infos.
   *     description: Met à jour les infos d'un voyage dont l'id est passé en paramètre.
   *     parameters:
   *      - in: path
   *        name: travel_id
   *        example: 4
   *        required: true
   *        schema:
   *          type: integer
   *
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Nom du voyage
   *                 example: Tournée Asie centrale
   *               picture:
   *                 type: string
   *                 description: Image du voyage
   *                 example: null
   *               status:
   *                 type: integer
   *                 description: Indique l'état d'activité du voyage
   *                 example: 2
   *               infos:
   *                 type: string
   *                 description: Description d'un voyage
   *                 example: null
   *               toPublish:
   *                 type: boolean
   *                 description: Indique si le voyage est publique ou non
   *                 example: true
   *               positionAgree:
   *                 type: boolean
   *                 description: Indique si on autorise la suivie de notre position
   *                 example: true
   *               startDate:
   *                 type: date
   *                 description: Date de début du voyage
   *                 example: null
   *
   *
   *     responses:
   *       200:
   *         description: Retourne les infos du voyage après modification.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id du voyage
   *                   example: 5
   *                 name:
   *                   type: string
   *                   description: Nom du voyage
   *                   example: Tournée Asie centrale
   *                 picture:
   *                   type: string
   *                   description: Image du voyage
   *                   example: null
   *                 status:
   *                   type: integer
   *                   description: Indique l'état d'activité du voyage
   *                   example: 0
   *                 infos:
   *                   type: string
   *                   description: Description d'un voyage
   *                   example: null
   *                 toPublish:
   *                   type: boolean
   *                   description: Indique si le voyage est publique ou non
   *                   example: true
   *                 positionAgree:
   *                   type: boolean
   *                   description: Indique si on autorise la suivie de notre position
   *                   example: true
   *                 startDate:
   *                   type: date
   *                   description: Date de début du voyage
   *                   example: null
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du voyage
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du voyage
   *                   example: 2022-03-17T15:17:42.282Z
   *                 UserId:
   *                   type: integer
   *                   description: Id de l'utilisateur ayant crée le voyage
   *                   example: 2
   */

  /**
   * @swagger
   * /travel/{travel_id}:
   *   delete:
   *     tags:
   *     - Travel
   *     summary: Supprime un voyage.
   *     description: Supprime un voyage dont l'id est passé en paramètre.
   *     parameters:
   *      - in: path
   *        name: travel_id
   *        example: 5
   *        required: true
   *        schema:
   *          type: integer
   *
   *     responses:
   *       200:
   *         description: Voyage supprimé avec succès.
   *
   */

  /**
   * @swagger
   * /travel/{travel_id}/members:
   *   get:
   *     tags:
   *     - Travel
   *     summary: Retourne les membres d'un voyage.
   *     description: Retourne tout les membres appartenant à un voyage.
   *     parameters:
   *      - in: path
   *        name: travel_id
   *        example: 1
   *        required: true
   *        schema:
   *          type: integer
   *
   *     responses:
   *       200:
   *         description: Retourne tout les membres d'un voyage dont l'id du voyage est passé en paramètre.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id du membre
   *                   example: 5
   *                 name:
   *                   type: string
   *                   description: Nom du membre
   *                   example: Serkan
   *                 userLogin:
   *                   type: string
   *                   description: Nom d'utilisateur
   *                   example: Sdev
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du point
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du point
   *                   example: 2022-03-17T15:17:42.282Z
   *                 TravelId:
   *                   type: integer
   *                   description: Id du voyage
   *                   example: 1
   *                 UserId:
   *                   type: integer
   *                   description: Id de l'utilisateur
   *                   example: 1
   *       404:
   *         description: L'id que vous avez passé n'existe pas. Voyage non trouvé.
   *
   *
   */

  /**
 * @swagger
 * /travel/{travel_id}/expenses:
 *   get:
 *     tags:
 *     - Travel
 *     summary: Retourne les depenses d'un voyages.
 *     description: Retourne toutes les depenses appartenant à un voyage.
 *     parameters:
 *      - in: path
 *        name: travel_id
 *        example: 1
 *        required: true
 *        schema:
 *          type: integer
 *
 *     responses:
 *       200:
 *         description: Retourne toutes les depenses appartenant à un voyage dont l'id du voyage est passé en paramètre.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Id du membre
 *                   example: 5
 *                 cost:
 *                   type: string
 *                   description: Cout de la depense
 *                   example: Serkan
 *                 to:
 *                   type: string
 *                   description: ID des destinataires
 *                   example: Sdev
 *                 category:
 *                   type: string
 *                   description: Category de la depense
 *                   example: Sdev
 *                 date:
 *                   type: string
 *                   description: Date oû la depense a été effectué
 *                   example: Sdev
 *                 createdAt:
 *                   type: string
 *                   description: Date de création de la depense
 *                   example: 2022-03-17T15:17:42.282Z
 *                 updateAt:
 *                   type: string
 *                   description: Date de modification de la depense
 *                   example: 2022-03-17T15:17:42.282Z
 *                 TravelId:
 *                   type: integer
 *                   description: Id du voyage
 *                   example: 1
 *                 MemberId:
 *                   type: integer
 *                   description: Id de l'utilisateur
 *                   example: 1
 *       404:
 *         description: L'id que vous avez passé n'existe pas. Voyage non trouvé.
 *
 *
 */

  /**
   * @swagger
   * /travel/{travel_id}/tasks:
   *   get:
   *     tags:
   *     - Travel
   *     summary: Retourne toutes les tâches d'un voyage.
   *     description: Retourne toutes les tâches d'un voyage.
   *     parameters:
   *      - in: path
   *        name: travel_id
   *        example: 1
   *        required: true
   *        schema:
   *          type: integer
   *
   *     responses:
   *       200:
   *         description: Retourne toutes les tâches d'un voyage.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id de la tâche
   *                   example: 2
   *                 title:
   *                   type: string
   *                   description: Titre de la tâche
   *                   example: Préparer les rations pour le voyage
   *                 date:
   *                   type: string
   *                   description: Date associé à la tâche
   *                   example: 2022-05-18
   *                 createdAt:
   *                   type: string
   *                   description: Date de création de la tâche
   *                   example: 2022-05-24T18:25:09.730Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification de la tâche
   *                   example: 2022-05-24T18:25:09.730Z
   *                 TravelId:
   *                   type: integer
   *                   description: Id du voyage
   *                   example: 1
   *
   */

  /**
   * @swagger
   * /travel/{travel_id}/labels:
   *   get:
   *     tags:
   *     - Travel
   *     summary: Retourne toutes les labels d'un voyage.
   *     description: Retourne toutes les labels d'un voyage.
   *     parameters:
   *      - in: path
   *        name: travel_id
   *        example: 1
   *        required: true
   *        schema:
   *          type: integer
   *
   *     responses:
   *       200:
   *         description: Retourne toutes les labels d'un voyage.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id du label
   *                   example: 2
   *                 title:
   *                   type: string
   *                   description: Titre du label
   *                   example: Préparer les rations pour le voyage
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du label
   *                   example: 2022-05-24T18:25:09.730Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du label
   *                   example: 2022-05-24T18:25:09.730Z
   *                 TravelId:
   *                   type: integer
   *                   description: Id du voyage
   *                   example: 1
   *
   */

  /**
   * @swagger
   * /travel/{travel_id}/journalEntries:
   *   get:
   *     tags:
   *     - Travel
   *     summary: Retourne les entrées du journal d'un voyage.
   *     description: Retourne les entrées du journal d'un voyage.
   *     parameters:
   *      - in: path
   *        name: travel_id
   *        example: 1
   *        required: true
   *        schema:
   *          type: integer
   *
   *     responses:
   *       200:
   *         description: Retourne les entrées du journal d'un voyage.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id de l'entrée du journal
   *                   example: 2
   *                 date:
   *                   type: string
   *                   description: Date de l'entrée du journal
   *                   example: 12/05/2022 15:18
   *                 text:
   *                   type: string
   *                   description: Text de l'entrée du journal
   *                   example: Woah c'est vraiment beau ici !
   *                 createdAt:
   *                   type: string
   *                   description: Date de création de l'entrée du journal
   *                   example: 2022-05-24T18:25:09.730Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification de l'entrée du journal
   *                   example: 2022-05-24T18:25:09.730Z
   *                 TravelId:
   *                   type: integer
   *                   description: Id du voyage
   *                   example: 1
   *                 MemberId:
   *                   type: integer
   *                   description: Id du membre
   *                   example: 1
   *                 StepId:
   *                   type: integer
   *                   description: Id du point d'étape
   *                   example: 1
   *                 PointId:
   *                   type: integer
   *                   description: Id du point d'intérêt
   *                   example: 1
   *
   */

  /**
   * @swagger
   * /travel/{travel_id}/documents:
   *   get:
   *     tags:
   *     - Travel
   *     summary: Retourne tous les documents d'un voyage.
   *     description: Retourne tous les documents d'un voyage.
   *     parameters:
   *      - in: path
   *        name: travel_id
   *        example: 1
   *        required: true
   *        schema:
   *          type: integer
   *
   *     responses:
   *       200:
   *         description: Retourne tous les documents d'un voyage.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id du document
   *                   example: 2
   *                 title:
   *                   type: string
   *                   description: titre du document
   *                   example: monument.png
   *                 typeFile:
   *                   type: string
   *                   description: Type du document
   *                   example: image/png
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du document
   *                   example: 2022-05-24T18:25:09.730Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du document
   *                   example: 2022-05-24T18:25:09.730Z
   *                 StepId:
   *                   type: integer
   *                   description: Id du point d'étape
   *                   example: null
   *                 TravelId:
   *                   type: integer
   *                   description: Id du voyage
   *                   example: 2
   *                 RouteId:
   *                   type: integer
   *                   description: Id de la route
   *                   example: null
   *                 PointId:
   *                   type: integer
   *                   description: Id du point d'intérêt
   *                   example: null
   *       404:
   *         description: L'id que vous avez passé n'existe pas. Voyage non trouvé.
   *
   *
   *
   */

  /**
   * @swagger
   * /travel/{travel_id}/photos:
   *   get:
   *     tags:
   *     - Travel
   *     summary: Retourne les photos prises par le mobile.
   *     description: Retourne les photos prises par le mobile.
   *     parameters:
   *      - in: path
   *        name: travel_id
   *        example: 1
   *        required: true
   *        schema:
   *          type: integer
   *
   *     responses:
   *       200:
   *         description: Retourne les photos prises par le mobile.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id de la  photo
   *                   example: 2
   *                 dataFile:
   *                   type: object
   *                   properties:
   *                     type:
   *                        type: string
   *                     data:
   *                        type: array
   *                        items:
   *                          type: integer
   *                          example: 1
   *                 date:
   *                   type: string
   *                   description: Date de prise de la photo
   *                   example: 26/05/2022 15:30
   *                 latitude:
   *                   type: number
   *                   format: float
   *                   description: Latitude de la photo
   *                   example: 48.87382848822226
   *                 longitude:
   *                   type: number
   *                   format: float
   *                   description: Longitude de la photo
   *                   example: 2.2950540054083306
   *                 createdAt:
   *                   type: string
   *                   description: Date de création de la photo
   *                   example: 2022-05-24T18:25:09.730Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification de la photo
   *                   example: 2022-05-24T18:25:09.730Z
   *                 StepId:
   *                   type: integer
   *                   description: Id du point d'étape
   *                   example: null
   *                 TravelId:
   *                   type: integer
   *                   description: Id du voyage
   *                   example: 2
   *                 RouteId:
   *                   type: integer
   *                   description: Id de la route
   *                   example: null
   *                 PointId:
   *                   type: integer
   *                   description: Id du point d'intérêt
   *                   example: null
   *       404:
   *         description: L'id que vous avez passé n'existe pas. Voyage non trouvé.
   *
   *
   *
   */

  {
    url: "/travel",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_all,
    ],
  },
  {
    url: "/travel",
    method: "post",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.create,
    ],
  },

  // Pas besoin du token pour cette requete
  {
    url: "/travelpublished",
    method: "get",
    func: [
      travel_ctrl.get_published,
    ],
  },
  {
    url: "/travel/:travel_id",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_by_id,
    ],
  },
  {
    url: "/travel/:travel_id/points",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_points_of_travel,
    ],
  },

  {
    url: "/travel/:travel_id/steps",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_steps_of_travel,
    ],
  },

  {
    url: "/travel/:travel_id/routes",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_routes_of_travel,
    ],
  },

  {
    url: "/travel/:travel_id",
    method: "put",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.update_by_id,
    ],
  },

  {
    url: "/travel/:travel_id",
    method: "delete",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.delete_by_id,
    ],
  },
  {
    url: "/travel/:travel_id/tasks",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_tasks_of_travel,
    ],
  },
  {
    url: "/travel/:travel_id/labels",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_labels_of_travel,
    ],
  },

  {
    url: "/travel/:travel_id/journalEntries",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_journalEntries_of_travel,
    ],
  },

  {
    url: "/travel/:travel_id/members",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_members_of_travel,
    ],
  },
  {
    url: "/travel/:travel_id/expenses",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_expenses_of_travel,
    ],
  },
  {
    url: "/travel/:travel_id/documents",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_all_documents_by_travel_id,
    ],
  },
  {
    url: "/travel/:travel_id",
    method: "put",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.update_by_id,
    ],
  },
  {
    url: "/travel/:travel_id/photos",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_all_photos_by_travel_id,
    ],
  },

  /* new route a swagger */
  {
    url: "/travel_preparation",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_in_preparation_travel,
    ],
  },
  {
    url: "/travel_current",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_current_travel,
    ],
  },
  {
    url: "/travel_finish",
    method: "get",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.get_finish_travel,
    ],
  },
  {
    url: "/travel/copy",
    method: "post",
    func: [
      user_ctrl.identify_client,
      travel_ctrl.copyTravel,
    ],
  },
];