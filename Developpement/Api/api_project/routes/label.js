const label_ctrl = require('../controllers/label');

module.exports = [
	/**
	 * @swagger
	 * components:
	 *   schemas: 
	 *     Label:
	 *       type: object
	 *       properties:
	 *          id:
	 *            type: integer
	 *            description: Id du label  
	 *          title:
	 *            type: string
	 *            description: Titre du label
	 *          createdAt:
	 *            type: string
	 *            description: Date de création du label
	 *          updateAt:
	 *            type: string
	 *            description: Date de modification du label
	 *          TravelId:
	 *            type: integer 
	 *            description: Id du voyage
	 *       example:
	 *         id: 2
	 *         title: serkan
	 *         createdAt: 2022-03-17T15:17:42.282Z
	 *         updateAt: 2022-03-17T15:17:42.282Z
	 *         TravelId: 1
	 * 		
	 */

	/**
	 * @swagger
	 * /label:
	 *   get:
	 *     tags:
	 *     - Label
	 *     summary: Retourne tous les labels de la base de données.
	 *     description: Retourne tous les labels de la base de données dont l'id est unique.
	 *     responses:
	 *       200:
	 *         description: Retourne tous les labels de la base de données.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: integer
	 *                   description: Id du label.  
	 *                   example: 2  
	 *                 title: 
	 *                   type: string
	 *                   description: Titre du label.
	 *                   example: serkan
	 *                 createdAt:                    
	 *                   type: string                   
	 *                   description: Date de création du label.                   
	 *                   example: 2022-03-17T15:17:42.282Z
	 *                 updateAt:   
	 *                   type: string
	 *                   description: Date de modification du label.
	 *                   example: 2022-03-17T15:17:42.282Z
	 *                 TravelId:    
	 *                   type: integer 
	 *                   description: Id du voyage.
	 *                   example: 1
	 *                     
	 *                      
	 */

	/**
	 * @swagger
	 * /label:
	 *   post:
	 *     tags:
	 *     - Label
	 *     summary: Créer un nouveau label.
	 *     description: Création d'un nouveau label.
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               title:
	 *                 type: string
	 *                 description: Titre du nouveau label crée 
	 *                 example: serkan
	 *               TravelId:
	 *                 type: integer 
	 *                 description: Id du voyage. 
	 *                 example: 1
	 *     responses:
	 *       201:
	 *         description: Label crée avec succès.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: integer
	 *                   description: Id du label. 
	 *                   example: 2
	 *                 title:
	 *                   type: string
	 *                   description: Titre du nouveau label crée 
	 *                   example: Iut Robert Schuman
	 *                 createdAt:                    
	 *                   type: string                   
	 *                   description: Date de création du label crée                   
	 *                   example: 2022-03-17T15:17:42.282Z
	 *                 updateAt:   
	 *                   type: string
	 *                   description: Date de modification du label crée
	 *                   example: 2022-03-17T15:17:42.282Z
	 *                 TravelId:
	 *                   type: integer 
	 *                   description: Id du voyage
	 *                   example: 1                   
	 *                      
	 */

	/**
	 * @swagger
	 * /label/{label_id}:
	 *   get:
	 *     tags:
	 *     - Label
	 *     summary: Retourne un label dont l'id est passé en paramètre.
	 *     description: Retourne le label demandé avec l'id passé en paramètre.
	 *     parameters:
	 *      - in: path
	 *        name: label_id
	 *        example: 2
	 *        required: true
	 *        schema:
	 *          type: integer     
	 *           
	 *     responses:
	 *       200:
	 *         description: Retourne un label dont l'id est passé en paramètre.
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
	 *                   example: serkan
	 *                 createdAt:                    
	 *                   type: string                   
	 *                   description: Date de création du label                 
	 *                   example: 2022-03-17T15:17:42.282Z
	 *                 updateAt:   
	 *                   type: string
	 *                   description: Date de modification du label
	 *                   example: 2022-03-17T15:17:42.282Z
	 *                 TravelId:    
	 *                   type: integer 
	 *                   description: Id du voyage
	 *                   example: 1
	 *                     
	 *                      
	 */

	/**
	 * @swagger
	 * /label/{label_id}:
	 *   delete:
	 *     tags:
	 *     - Label
	 *     summary: Supprime un label.
	 *     description: Supprime un label dont l'id est passé en paramètre.
	 *     parameters:
	 *      - in: path
	 *        name: label_id
	 *        example: 2
	 *        required: true
	 *        schema:
	 *          type: integer
	 *
	 *     responses:
	 *       200:
	 *         description: Label supprimé avec succès.
	 *
	 */

	{
		url: '/label',
		method: 'get',
		func: label_ctrl.get_all
	},
	{
		url: '/label',
		method: 'post',
		func: label_ctrl.create
	},
	{
		url: '/label/:label_id',
		method: 'get',
		func: label_ctrl.get_by_id
	},

	{
		url: '/label/:label_id',
		method: 'put',
		func: label_ctrl.update_by_id
	},
	{
		url: '/label/:label_id',
		method: 'delete',
		func: label_ctrl.delete_by_id
	}

];
