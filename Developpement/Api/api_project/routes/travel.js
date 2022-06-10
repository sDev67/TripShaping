const travel_ctrl = require("../controllers/travel");
const point_ctrl = require("../controllers/point");

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
   *          activated:
   *            type: boolean
   *            description: Indique l'état d'activité du voyage
   *          budget:
   *            type: integer
   *            description: Total budget pour le voyage
   *          infos:
   *            type: string
   *            description: Description indiqué lors du voyage
   *          finished:
   *            type: boolean
   *            description: Indique si le voyage est fini
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
   *         picture:
   *         activated: true
   *         budget: 2000
   *         infos:
   *         finished: false
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
   *                   description: Id du voyage.
   *                   example: 5
   *                 name:
   *                   type: string
   *                   description: Nom du voyage.
   *                   example: Tournée Asie centrale.
   *                 picture:
   *                   type: string
   *                   description: Image du voyage.
   *                   example:
   *                 activated:
   *                   type: boolean
   *                   description: Indique si le voyage est actif.
   *                   example: true
   *                 budget:
   *                   type: integer
   *                   description: Budget du voyage.
   *                   example: 2000
   *                 infos:
   *                   type: string
   *                   description: Description d'un voyage.
   *                   example: Excellent voyage.
   *                 finished:
   *                   type: boolean
   *                   description: Indique si le voyage est fini.
   *                   example: false
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du voyage.
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du voyage.
   *                   example: 2022-03-17T15:17:42.282Z
   *
   *
   */

  {
    url: "/travel",
    method: "get",
    func: travel_ctrl.get_all,
  },

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

  {
    url: "/travelpublished",
    method: "get",
    func: travel_ctrl.get_published,
  },
  {
    url: "/travel",
    method: "post",
    func: travel_ctrl.create,
  },

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
   *                   description: Id du voyage.
   *                   example: 52
   *                 name:
   *                   type: string
   *                   description: Nom du voyage
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
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du voyage
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du voyage
   *                   example: 2022-03-17T15:17:42.282Z
   *
   *
   *
   */

  {
    url: "/travel/:travel_id",
    method: "get",
    func: travel_ctrl.get_by_id,
  },

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
   *                   description: Id du point d'intérêt.
   *                   example: 33
   *                 title:
   *                   type: string
   *                   description: Titre du point d'intérêt.
   *                   example: Arc de Triomphe
   *                 latitude:
   *                   type: number
   *                   format: float
   *                   description: Latitude du point d'intérêt.
   *                   example: 48.87382848822226
   *                 longitude:
   *                   type: number
   *                   format: float
   *                   description: Longitude du point d'intérêt.
   *                   example: 2.2950540054083306
   *                 description:
   *                   type: string
   *                   description: Description du point d'intérêt.
   *                   example: Arc de triomphe emblématique érigé pour commémorer les victoires de Napoléon, avec plateforme d'observation.
   *                 category:
   *                   type: string
   *                   description: Catégorie du point d'intérêt.
   *                   example: Monument historique
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du point d'intérêt.
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du point d'intérêt.
   *                   example: 2022-03-17T15:17:42.282Z
   *                 TravelId:
   *                   type: integer
   *                   description: Id du voyage passé en paramètre.
   *                   example: 1
   *
   */

  {
    url: "/travel/:travel_id/points",
    method: "get",
    func: travel_ctrl.get_points_of_travel,
  },

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
   *                   description: Id du point.
   *                   example: 1
   *                 title:
   *                   type: string
   *                   description: Titre du point.
   *                   example: Strasbourg
   *                 description:
   *                   type: string
   *                   description: Description du point.
   *                   example: Capitale de l'Alsace
   *                 latitude:
   *                   type: number
   *                   format: float
   *                   description: Latitude du point.
   *                   example: 48.58216674328555
   *                 longitude:
   *                   type: number
   *                   format: float
   *                   description: Longitude du point.
   *                   example: 7.742935804417188
   *                 category:
   *                   type: string
   *                   description: Catégorie du point.
   *                   example: Hôtel
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du point.
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du point.
   *                   example: 2022-03-17T15:17:42.282Z
   *                 TravelId:
   *                   type: integer
   *                   description: Id du voyage passé en paramètre.
   *                   example: 1
   *       404:
   *         description: L'id que vous avez passé n'existe pas. Voyage non trouvé.
   *
   *
   */

  {
    url: "/travel/:travel_id/steps",
    method: "get",
    func: travel_ctrl.get_steps_of_travel,
  },
  {
    url: "/travel_preparation",
    method: "get",
    func: travel_ctrl.get_in_preparation_travel,
  },
  {
    url: "/travel_current",
    method: "get",
    func: travel_ctrl.get_current_travel,
  },
  {
    url: "/travel_finish",
    method: "get",
    func: travel_ctrl.get_finish_travel,
  },

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
   *                   description: Id du point.
   *                   example: 6
   *                 name:
   *                   type: string
   *                   description: Nom du voyage
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
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du voyage
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du voyage
   *                   example: 2022-03-17T15:17:42.282Z
   *
   *
   */

  {
    url: "/travel/:travel_id",
    method: "put",
    func: travel_ctrl.update_by_id,
  },

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
  {
    url: "/travel/:travel_id",
    method: "delete",
    func: travel_ctrl.delete_by_id,
  },

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

  {
    url: "/travel/:travel_id/tasks",
    method: "get",
    func: travel_ctrl.get_tasks_of_travel,
  },
  {
    url: "/travel/:travel_id/labels",
    method: "get",
    func: travel_ctrl.get_labels_of_travel,
  },
  {
    url: "/travel/:travel_id/routes",
    method: "get",
    func: travel_ctrl.get_routes_of_travel,
  },

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
   *                   description: Id du membre.
   *                   example: 5
   *                 lastname:
   *                   type: string
   *                   description: Nom du membre.
   *                   example: Deveci
   *                 firstname:
   *                   type: string
   *                   description: Prénom du membre.
   *                   example: Serkan
   *                 fictive:
   *                   type: string
   *                   description: Indique si le membre est fictif ou non.
   *                   example: false
   *                 createdAt:
   *                   type: string
   *                   description: Date de création du point.
   *                   example: 2022-03-17T15:17:42.282Z
   *                 updateAt:
   *                   type: string
   *                   description: Date de modification du point.
   *                   example: 2022-03-17T15:17:42.282Z
   *                 TravelId:
   *                   type: integer
   *                   description: Id du voyage passé en paramètre.
   *                   example: 1
   *       404:
   *         description: L'id que vous avez passé n'existe pas. Voyage non trouvé.
   *
   *
   */
  {
    url: "/travel/:travel_id/tasks",
    method: "get",
    func: travel_ctrl.get_tasks_of_travel,
  },
  {
    url: "/travel/:travel_id/labels",
    method: "get",
    func: travel_ctrl.get_labels_of_travel,
  },
  {
    url: "/travel/:travel_id/routes",
    method: "get",
    func: travel_ctrl.get_routes_of_travel,
  },
  {
    url: "/travel/:travel_id/journalEntries",
    method: "get",
    func: travel_ctrl.get_journalEntries_of_travel,
  },

  {
    url: "/travel/:travel_id/members",
    method: "get",
    func: travel_ctrl.get_members_of_travel,
  },
  {
    url: "/travel/:travel_id/expenses",
    method: "get",
    func: travel_ctrl.get_expenses_of_travel,
  },
  {
    url: "/travel/:travel_id/documents",
    method: "get",
    func: travel_ctrl.get_all_documents_by_travel_id,
  },

  {
    url: "/travel/:travel_id/journal_entries",
    method: "get",
    func: travel_ctrl.get_all_journal_entries_by_travel_id,
  },

  {
    url: "/travel/:travel_id/photos",
    method: "get",
    func: travel_ctrl.get_all_photos_by_travel_id,
  },
  // {
  // 	url: '/travel/:travel_id/point/:point_id/documents',
  // 	method: 'get',
  // 	func: [travel_ctrl.load_by_id, point_ctrl.load_by_id, travel_ctrl.get_all_documents_by_travel_point_id]
  // },

  {
    url: "/travel/copy",
    method: "post",
    func: travel_ctrl.copyTravel,
  },

];
