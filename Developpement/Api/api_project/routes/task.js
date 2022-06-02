const task_ctrl = require('../controllers/task');

module.exports = [

	/**
	 * @swagger
	 * components:
	 *   schemas: 
	 *     Task:
	 *       type: object
	 *       properties:
	 *          id:
	 *            type: integer
	 *            description: Id de la tâche 
	 *          title:
	 *            type: string
	 *            description: Titre de la tâche
	 *          date:
	 *            type: string
	 *            description: Date de la tâche au format AAAA-MM-JJ
	 *          createdAt:
	 *            type: string
	 *            description: Date de création de la tâche
	 *          updateAt:
	 *            type: string
	 *            description: Date de modification de la tâche
	 *          TravelId:
	 *            type: integer 
	 *            description: Id du voyage
	 *       example:
	 *         id: 4
	 *         title: Faire les valises
	 *         createdAt: 2022-03-17T15:17:42.282Z
	 *         updateAt: 2022-03-17T15:17:42.282Z
	 *         TravelId: 2
	 * 		
	 */



	/**
	 * @swagger
	 * /task:
	 *   get:
	 *     tags:
	 *     - Task
	 *     summary: Retourne toutes les tâches de la base de données.
	 *     description: Retourne toutes les tâches de la base de données dont l'id est unique.
	 *     responses:
	 *       200:
	 *         description: Retourne toutes les tâches de la base de données.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: integer
	 *                   description: Id de la tâche 
	 *                   example: 4
	 *                 title:
	 *                   type: string
	 *                   description: Titre de la tâche
	 *                   example: Acheter des rations pour le voyage
	 *                 date:
	 *                   type: string
	 *                   description: Date de la tâche au format AAAA-MM-JJ
	 *                   example: 2022-05-18
	 *                 createdAt:
	 *                   type: string
	 *                   description: Date de création de la tâche
	 *                   example: 2022-05-24T18:34:10.286Z
	 *                 updateAt:
	 *                   type: string
	 *                   description: Date de modification de la tâche
	 *                   example: 2022-05-24T18:34:10.286Z
	 *                 TravelId:
	 *                   type: integer 
	 *                   description: Id du voyage
	 *                   example: 2
	 */

	/**
	 * @swagger
	 * /task/{task_id}:
	 *   get:
	 *     tags:
	 *     - Task
	 *     summary: Retourne une tâche dont l'id est passé en paramètre.
	 *     description: Retourne une tâche dont l'id est passé en paramètre.
	 *     parameters:
	 *      - in: path
	 *        name: task_id
	 *        example: 4
	 *        required: true
	 *        schema:
	 *          type: integer
	 *     responses:
	 *       200:
	 *         description: Retourne une tâche dont l'id est passé en paramètre.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: integer
	 *                   description: Id de la tâche 
	 *                   example: 4
	 *                 title:
	 *                   type: string
	 *                   description: Titre de la tâche
	 *                   example: Acheter des rations pour le voyage
	 *                 date:
	 *                   type: string
	 *                   description: Date de la tâche au format AAAA-MM-JJ
	 *                   example: 2022-05-18
	 *                 createdAt:
	 *                   type: string
	 *                   description: Date de création de la tâche
	 *                   example: 2022-05-24T18:34:10.286Z
	 *                 updateAt:
	 *                   type: string
	 *                   description: Date de modification de la tâche
	 *                   example: 2022-05-24T18:34:10.286Z
	 *                 TravelId:
	 *                   type: integer 
	 *                   description: Id du voyage
	 *                   example: 2
	 */

	/**
	 * @swagger
	 * /task:
	 *   post:
	 *     tags:
	 *     - Task
	 *     summary: Crée une nouvelle tâche.
	 *     description: Crée une nouvelle tâche.
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               title:
	 *                 type: string
	 *                 description: Titre de la nouvelle tâche crée 
	 *                 example: Faire les réservations
	 *               date:
	 *                 type: string
	 *                 description: Date de la tâche au format AAAA-MM-JJ 
	 *                 example: 2022-05-18
	 *               TravelId:
	 *                 type: integer 
	 *                 description: Id du voyage. 
	 *                 example: 2
	 * 
	 *     responses:
	 *       200:
	 *         description: Crée une nouvelle tâche.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: integer
	 *                   description: Id de la tâche 
	 *                   example: 4
	 *                 title:
	 *                   type: string
	 *                   description: Titre de la tâche
	 *                   example: Acheter des rations pour le voyage
	 *                 date:
	 *                   type: string
	 *                   description: Date de la tâche au format AAAA-MM-JJ
	 *                   example: 2022-05-18
	 *                 createdAt:
	 *                   type: string
	 *                   description: Date de création de la tâche
	 *                   example: 2022-05-24T18:34:10.286Z
	 *                 updateAt:
	 *                   type: string
	 *                   description: Date de modification de la tâche
	 *                   example: 2022-05-24T18:34:10.286Z
	 *                 TravelId:
	 *                   type: integer 
	 *                   description: Id du voyage
	 *                   example: 2
	 */

	/**
	 * @swagger
	 * /task/{task_id}:
	 *   put:
	 *     tags:
	 *     - Task
	 *     summary: Update les infos d'une tâche.
	 *     description: Met à jour les infos d'une tâche dont l'id est passé en paramètre.
	 *     parameters:
	 *      - in: path
	 *        name: task_id
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
	 *               title:
	 *                 type: string
	 *                 description: Titre de la tâche 
	 *                 example: Faire les réservations
	 *               date:
	 *                 type: string
	 *                 description: Date de la tâche au format AAAA-MM-JJ 
	 *                 example: 2023-05-20              
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
	 *                   description: Id de la tâche 
	 *                   example: 4
	 *                 title:
	 *                   type: string
	 *                   description: Titre de la tâche
	 *                   example: Acheter des rations pour le voyage
	 *                 date:
	 *                   type: string
	 *                   description: Date de la tâche au format AAAA-MM-JJ
	 *                   example: 2022-05-18
	 *                 createdAt:
	 *                   type: string
	 *                   description: Date de création de la tâche
	 *                   example: 2022-05-24T18:34:10.286Z
	 *                 updateAt:
	 *                   type: string
	 *                   description: Date de modification de la tâche
	 *                   example: 2022-05-24T18:34:10.286Z
	 *                 TravelId:
	 *                   type: integer 
	 *                   description: Id du voyage
	 *                   example: 2
	 *       404:
	 *         description: Tâche demandé n'existe pas.
	 */

	/**
	 * @swagger
	 * /task/{task_id}:
	 *   delete:
	 *     tags:
	 *     - Task
	 *     summary: Supprime une tâche.
	 *     description: Supprime une tâche dont l'id est passé en paramètre.
	 *     parameters:
	 *      - in: path
	 *        name: task_id
	 *        example: 7
	 *        required: true
	 *        schema:
	 *          type: integer
	 *
	 *     responses:
	 *       200:
	 *         description: Voyage supprimé avec succès.
	 *       
	 *       404:
	 *         description: Tâche demandé n'existe pas.
	 *
	 */

	{
		url: '/task',
		method: 'get',
		func: task_ctrl.get_all
	},
	{
		url: '/task',
		method: 'post',
		func: task_ctrl.create
	},
	{
		url: '/task/:task_id',
		method: 'get',
		func: task_ctrl.get_by_id
	},
	{
		url: '/task/:task_id',
		method: 'put',
		func: task_ctrl.update_by_id
	},
	{
		url: '/task/:task_id',
		method: 'delete',
		func: task_ctrl.delete_by_id
	}

];
