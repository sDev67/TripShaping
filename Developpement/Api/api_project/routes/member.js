const member_ctrl = require('../controllers/member');

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

	{
		url: '/members',
		method: 'get',
		func: member_ctrl.get_all
	},
	{
		url: '/member',
		method: 'post',
		func: member_ctrl.create
	},
	{
		url: '/member/:member_id',
		method: 'get',
		func: member_ctrl.get_by_id
	},
	{
		url: '/member/:member_id',
		method: 'put',
		func: member_ctrl.update_by_id
	},
	{
		url: '/member/:member_id',
		method: 'delete',
		func: member_ctrl.delete_by_id
	}

];
