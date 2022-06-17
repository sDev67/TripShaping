const member_ctrl = require('../controllers/member');
const user_ctrl = require("../controllers/user");

module.exports = [

	/**
	 * @swagger
	 * components:
	 *   schemas: 
	 *     Member:
	 *       type: object
	 *       properties:
	 *          id:
	 *            type: integer
	 *            description: Id du membre
	 *          name:
	 *            type: string
	 *            description: Nom du membre
	 *          userLogin:
	 *            type: string
	 *            description: Pseudo de l'utilisateur
	 *          balance:
	 *            type: integer
	 *            description: Solde du membre
	 *          createdAt:
	 *            type: string
	 *            description: Date de création du membre
	 *          updateAt:
	 *            type: string
	 *            description: Date de modification du membre
	 *          TravelId:
	 *            type: integer 
	 *            description: Id du voyage
	 *          UserId:
	 *            type: integer 
	 *            description: Id de l'utilisateur
	 * 
	 *       example:
	 *         id: 1
	 *         name: Serkan
	 *         userLogin: sDev
	 *         balance: 160,34
	 *         createdAt: 2022-06-02T12:49:08.133Z
	 *         updateAt: 2022-06-02T12:49:08.133Z
	 *         TravelId: 1
	 *         UserId: 1
	 * 		
	 */

	/**
	 * @swagger
	 * /members:
	 *   get:
	 *     tags:
	 *     - Member
	 *     summary: Retourne tous les membres de la base de données.
	 *     description: Retourne tous les membres de la base de données.
	 *     responses:
	 *       200:
	 *         description: Retourne tous les membres de la base de données.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: integer
	 *                   description: Id du membre
	 *                   example: 10
	 *                 name:
	 *                   type: string
	 *                   description: Nom du membre
	 *                   example: Serkan
	 *                 userLogin:
	 *                   type: string
	 *                   description: Pseudo de l'utilisateur
	 *                   example: sDev
	 *                 balance:
	 *                   type: integer
	 *                   description: Solde du membre
	 *                   example: 123,45
	 *                 createdAt:
	 *                   type: string
	 *                   description: Date de création du membre
	 *                   example: 2022-06-03T15:23:42.282Z
	 *                 updateAt:
	 *                   type: string
	 *                   description: Date de modification du membre
	 *                   example: 2022-06-03T15:23:42.282Z
	 *                 TravelId:
	 *                   type: integer 
	 *                   description: Id du voyage
	 *                   example: 1
	 *                 UserId:
	 *                   type: integer 
	 *                   description: Id de l'utilisateur
	 *                   example: 1
	 *                      
	 */

	/**
	 * @swagger
	 * /member/{member_id}:
	 *   get:
	 *     tags:
	 *     - Member
	 *     summary: Retourne un membre dont l'id est passé en paramètre.
	 *     description: Retourne le membre demandé avec l'id passé en paramètre.
	 *     parameters:
	 *      - in: path
	 *        name: member_id
	 *        example: 1
	 *        required: true
	 *        schema:
	 *          type: integer     
	 *           
	 *     responses:
	 *       200:
	 *         description: Retourne un membre dont l'id est passé en paramètre.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: integer
	 *                   description: Id du membre
	 *                   example: 10
	 *                 name:
	 *                   type: string
	 *                   description: Nom du membre
	 *                   example: Serkan
	 *                 userLogin:
	 *                   type: string
	 *                   description: Pseudo de l'utilisateur
	 *                   example: sDev
	 *                 balance:
	 *                   type: integer
	 *                   description: Solde du membre
	 *                   example: 123,45
	 *                 createdAt:
	 *                   type: string
	 *                   description: Date de création du membre
	 *                   example: 2022-06-03T15:23:42.282Z
	 *                 updateAt:
	 *                   type: string
	 *                   description: Date de modification du membre
	 *                   example: 2022-06-03T15:23:42.282Z
	 *                 TravelId:
	 *                   type: integer 
	 *                   description: Id du voyage
	 *                   example: 1
	 *                 UserId:
	 *                   type: integer 
	 *                   description: Id de l'utilisateur
	 *                   example: 1
	 *       404:
	 *         description: Id du membre n'existe pas.
	 *                      
	 */

	/**
	 * @swagger
	 * /member:
	 *   post:
	 *     tags:
	 *     - Member
	 *     summary: Créer un nouveau membre.
	 *     description: Création d'un nouveau membre.
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               name:
	 *                 type: string
	 *                 description: Nom du nouveau membre crée 
	 *                 example: serkan
	 *               userLogin:
	 *                 type: string
	 *                 description: Nom d'utilisateur du nouveau membre crée 
	 *                 example: sdev
	 *               TravelId:
	 *                 type: integer 
	 *                 description: Id du voyage. 
	 *                 example: 1
	 *     responses:
	 *       201:
	 *         description: Membre crée avec succès.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: integer
	 *                   description: Id du membre
	 *                   example: 10
	 *                 name:
	 *                   type: string
	 *                   description: Nom du membre
	 *                   example: Serkan
	 *                 userLogin:
	 *                   type: string
	 *                   description: Pseudo de l'utilisateur
	 *                   example: sDev
	 *                 balance:
	 *                   type: integer
	 *                   description: Solde du membre
	 *                   example: 123,45
	 *                 createdAt:
	 *                   type: string
	 *                   description: Date de création du membre
	 *                   example: 2022-06-03T15:23:42.282Z
	 *                 updateAt:
	 *                   type: string
	 *                   description: Date de modification du membre
	 *                   example: 2022-06-03T15:23:42.282Z
	 *                 TravelId:
	 *                   type: integer 
	 *                   description: Id du voyage
	 *                   example: 1
	 *                 UserId:
	 *                   type: integer 
	 *                   description: Id de l'utilisateur
	 *                   example: 1                  
	 *                      
	 */



	/**
	 * @swagger
	 * /member/{member_id}:
	 *   delete:
	 *     tags:
	 *     - Member
	 *     summary: Supprime un membre.
	 *     description: Supprime un membre dont l'id est passé en paramètre.
	 *     parameters:
	 *      - in: path
	 *        name: member_id
	 *        example: 2
	 *        required: true
	 *        schema:
	 *          type: integer
	 *
	 *     responses:
	 *       200:
	 *         description: Membre supprimé avec succès.
	 * 
	 *       404:
	 *         description: Id du membre n'existe pas.
	 *
	 */

	{
		url: '/members',
		method: 'get',
		func: [
			user_ctrl.identify_client,
			member_ctrl.get_all,
		],
	},
	{
		url: '/member',
		method: 'post',
		func: [
			user_ctrl.identify_client,
			member_ctrl.create,
		],
	},
	{
		url: '/member/:member_id',
		method: 'get',
		func: [
			user_ctrl.identify_client,
			member_ctrl.get_by_id,
		],
	},
	{
		url: '/member/:member_id',
		method: 'put',
		func: [
			user_ctrl.identify_client,
			member_ctrl.update_by_id,
		],
	},
	{
		url: '/member/:member_id',
		method: 'delete',
		func: [
			user_ctrl.identify_client,
			member_ctrl.delete_by_id,
		],
	}

];
