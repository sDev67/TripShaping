const point_ctrl = require('../controllers/point');

module.exports = [
	/**
	 * @swagger
	 * components:
	 *   schemas: 
	 *     Point:
	 *       type: object
	 *       properties:
	 *          id:
	 *            type: integer
	 *            description: Id du point d'intérêt  
	 *          title:
	 *            type: string
	 *            description: Titre du point d'intérêt
	 *          latitude:
	 *            type: number
	 *            format: float
	 *            description: Latitude du point d'intérêt
	 *          longitude:
	 *            type: number 
	 *            format: float                        
	 *            description: Longitude du point d'intérêt
	 *          description:
	 *            type: string 
	 *            description: Description du point d'intérêt
	 *          category:
	 *            type: string 
	 *            description: Catégorie du point d'intérêt
	 *          createdAt:
	 *            type: string
	 *            description: Date de création du point d'intérêt
	 *          updateAt:
	 *            type: string
	 *            description: Date de modification du point d'intérêt
	 *          TravelId:
	 *            type: integer 
	 *            description: Id du voyage
	 *       example:
	 *         id: 33
	 *         title: Arc de Triomphe
	 *         latitude: 48.87382848822226
	 *         longitude: 2.2950540054083306
	 *         description: Arc de triomphe emblématique érigé pour commémorer les victoires de Napoléon, avec plateforme d'observation
	 *         category: Monument historique
	 *         createdAt: 2022-03-17T15:17:42.282Z
	 *         updateAt: 2022-03-17T15:17:42.282Z
	 *         TravelId: 1
	 * 		
	 */

	/**
	 * @swagger
	 * /point:
	 *   get:
	 *     tags:
	 *     - Point
	 *     summary: Retourne tout les points de la base de données.
	 *     description: Retourne tout les points de la base de données dont l'id est unique.
	 *     responses:
	 *       200:
	 *         description: Retourne tout les points de la base de données.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: integer
	 *                   description: Id du point.  
	 *                   example: 33  
	 *                 title: 
	 *                   type: string
	 *                   description: Titre du point.
	 *                   example: Arc de Triomphe
	 *                 latitude:
	 *                   type: number
	 *                   format: float
	 *                   description: Latitude du point.
	 *                   example: 48.87382848822226
	 *                 longitude:
	 *                   type: number 
	 *                   format: float                        
	 *                   description: Longitude du point.
	 *                   example: 2.2950540054083306
	 *                 description: 
	 *                   type: string
	 *                   description: Description du point.
	 *                   example: Arc de triomphe emblématique érigé pour commémorer les victoires de Napoléon, avec plateforme d'observation.
	 *                 category: 
	 *                   type: string                 
	 *                   description: Catégorie du point.
	 *                   example: Monument historique
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
	 *                   description: Id du voyage.
	 *                   example: 1
	 *                     
	 *                      
	 */

	{
		url: '/point',
		method: 'get',
		func: point_ctrl.get_all
	},
	/**
	 * @swagger
	 * /point:
	 *   post:
	 *     tags:
	 *     - Point
	 *     summary: Créer un nouveau point d'intêret.
	 *     description: Création d'un nouveau point d'intêret.
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               title:
	 *                 type: string
	 *                 description: Titre du nouveau point crée 
	 *                 example: Iut Robert Schuman
	 *               latitude:
	 *                 type: number
	 *                 format: float
	 *                 description: Latitude du nouveau point crée.
	 *                 example: 48.53088834964869
	 *               longitude:
	 *                 type: number 
	 *                 format: float                        
	 *                 description: Longitude du nouveau point crée.
	 *                 example: 7.7356207021928824
	 *               description:
	 *                 type: string 
	 *                 description: Description du nouveau point crée.
	 *                 example: Ecole très répandue au Grand Est
	 *               category:
	 *                 type: string 
	 *                 description: Catégorie du nouveau point crée.
	 *                 example: Autre
	 *               TravelId:
	 *                 type: integer 
	 *                 description: Id du voyage. 
	 *                 example: 1
	 *     responses:
	 *       201:
	 *         description: Point crée avec succès.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: integer
	 *                   description: Id du point. 
	 *                   example: 39 
	 *                 title:
	 *                   type: string
	 *                   description: Titre du nouveau point crée 
	 *                   example: Iut Robert Schuman
	 *                 latitude:
	 *                   type: number
	 *                   format: float
	 *                   description: Latitude du nouveau point crée.
	 *                   example: 48.53088834964869
	 *                 longitude:
	 *                   type: number 
	 *                   format: float                        
	 *                   description: Longitude du nouveau point crée.
	 *                   example: 7.7356207021928824
	 *                 description:
	 *                   type: string 
	 *                   description: Description du nouveau point crée.
	 *                   example: Ecole très répandue au Grand Est
	 *                 category:
	 *                   type: string 
	 *                   description: Catégorie du nouveau point crée.
	 *                   example: Autre
	 *                 createdAt:                    
	 *                   type: string                   
	 *                   description: Date de création du point crée.                   
	 *                   example: 2022-03-17T15:17:42.282Z
	 *                 updateAt:   
	 *                   type: string
	 *                   description: Date de modification du point crée.
	 *                   example: 2022-03-17T15:17:42.282Z
	 *                 TravelId:
	 *                   type: integer 
	 *                   description: Id du voyage. 
	 *                   example: 1                   
	 *                      
	 */


	{
		url: '/point',
		method: 'post',
		func: point_ctrl.create
	},

	/**
	 * @swagger
	 * /point/{point_id}:
	 *   get:
	 *     tags:
	 *     - Point
	 *     summary: Retourne un point dont l'id est passé en paramètre.
	 *     description: Retourne le point demandé d'un voyage avec l'id passé en paramètre.
	 *     parameters:
	 *      - in: path
	 *        name: point_id
	 *        example: 38
	 *        required: true
	 *        schema:
	 *          type: integer     
	 *           
	 *     responses:
	 *       200:
	 *         description: Retourne un point dont l'id est passé en paramètre.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: integer
	 *                   description: Id du point.  
	 *                   example: 33  
	 *                 title: 
	 *                   type: string
	 *                   description: Titre du point.
	 *                   example: Arc de Triomphe
	 *                 latitude:
	 *                   type: number
	 *                   format: float
	 *                   description: Latitude du point.
	 *                   example: 48.87382848822226
	 *                 longitude:
	 *                   type: number 
	 *                   format: float                        
	 *                   description: Longitude du point.
	 *                   example: 2.2950540054083306
	 *                 description: 
	 *                   type: string
	 *                   description: Description du point.
	 *                   example: Arc de triomphe emblématique érigé pour commémorer les victoires de Napoléon, avec plateforme d'observation.
	 *                 category: 
	 *                   type: string                 
	 *                   description: Catégorie du point.
	 *                   example: Monument historique
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
	 *                   description: Id du voyage.
	 *                   example: 1
	 *                     
	 *                      
	 */

	{
		url: '/point/:point_id',
		method: 'get',
		func: point_ctrl.get_by_id
	},

	/**
	 * @swagger
	 * /point/{point_id}:
	 *   put:
	 *     tags:
	 *     - Point
	 *     summary: Update infos point d'intérêt.
	 *     description: Met à jour les infos d'un point d'intérêt dont l'id du point à modifier est passé en paramètre.
	 *     parameters:
	 *      - in: path
	 *        name: point_id
	 *        example: 38
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
	 *                 description: Titre du nouveau point crée 
	 *                 example: Iut Robert Schuman
	 *               latitude:
	 *                 type: number
	 *                 format: float
	 *                 description: Latitude du nouveau point crée.
	 *                 example: 48.53088834964869
	 *               longitude:
	 *                 type: number 
	 *                 format: float                        
	 *                 description: Longitude du nouveau point crée.
	 *                 example: 7.7356207021928824
	 *               description:
	 *                 type: string 
	 *                 description: Description du nouveau point crée.
	 *                 example: Ecole très répandue au Grand Est
	 *               category:
	 *                 type: string 
	 *                 description: Catégorie du nouveau point crée.
	 *                 example: Autre
	 *               TravelId:
	 *                 type: integer 
	 *                 description: Id du voyage. 
	 *                 example: 1  
	 *           
	 *     responses:
	 *       200:
	 *         description: Retourne un point dont l'id est passé en paramètre.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: integer
	 *                   description: Id du point.  
	 *                   example: 33  
	 *                 title: 
	 *                   type: string
	 *                   description: Titre du point.
	 *                   example: Arc de Triomphe
	 *                 latitude:
	 *                   type: number
	 *                   format: float
	 *                   description: Latitude du point.
	 *                   example: 48.87382848822226
	 *                 longitude:
	 *                   type: number 
	 *                   format: float                        
	 *                   description: Longitude du point.
	 *                   example: 2.2950540054083306
	 *                 description: 
	 *                   type: string
	 *                   description: Description du point.
	 *                   example: Arc de triomphe emblématique érigé pour commémorer les victoires de Napoléon, avec plateforme d'observation.
	 *                 category: 
	 *                   type: string                 
	 *                   description: Catégorie du point.
	 *                   example: Monument historique
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
	 *                   description: Id du voyage.
	 *                   example: 1
	 *                     
	 *                      
	 */



	{
		url: '/point/:point_id',
		method: 'put',
		func: point_ctrl.update_by_id
	},

	/**
	 * @swagger
	 * /point/{point_id}:
	 *   delete:
	 *     tags:
	 *     - Point
	 *     summary: Supprime un point d'intérêt.
	 *     description: Supprimer un point d'intérêt dont l'id du point est passé en paramètre.
	 *     parameters:
	 *      - in: path
	 *        name: point_id
	 *        example: 39
	 *        required: true
	 *        schema:
	 *          type: integer   
	 *           
	 *     responses:
	 *       200:
	 *         description: Point d'intérêt supprimé avec succès.
	 *                      
	 */

	{
		url: '/point/:point_id/documents',
		method: 'get',
		func: point_ctrl.get_all_documents_by_point_id
	},

	{
		url: '/point/:point_id',
		method: 'delete',
		func: point_ctrl.delete_by_id
	},
];
