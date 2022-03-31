const step_ctrl = require('../controllers/step');

module.exports = [

/**
 * @swagger
 * components:
 *   schemas: 
 *     Step:
 *       type: object
 *       properties:
 *          id:
 *            type: integer
 *            description: Id du point d'étape
 *          title:
 *            type: string
 *            description: Titre du point d'étape
 *          description:
 *            type: string 
 *            description: Description du point d'étape
 *          latitude:
 *            type: number
 *            format: float
 *            description: Latitude du point d'étape
 *          longitude:
 *            type: number 
 *            format: float                        
 *            description: Longitude du point d'étape
 *          duration: 
 *            type: integer
 *            description: Durée du point d'étape
 *          category:
 *            type: string 
 *            description: Catégorie du point d'étape
 *          createdAt:
 *            type: string
 *            description: Date de création du point d'étape
 *          updateAt:
 *            type: string
 *            description: Date de modification du point d'étape
 *          TravelId:
 *            type: integer 
 *            description: Id du voyage
 *       example:
 *         id: 14 
 *         title: Iut Robert Schuman
 *         description: Ecole très répandue au Grand Est
 *         latitude: 48.53088834964869
 *         longitude: 7.7356207021928824
 *         duration: 3
 *         category: Autre
 *         createdAt: 2022-03-17T15:17:42.282Z
 *         updateAt: 2022-03-17T15:17:42.282Z
 *         TravelId: 1
 * 		
 */



/**
 * @swagger
 * /step:
 *   get:
 *     tags:
 *     - Step
 *     summary: Retourne tout les points d'étapes d'un voyage.
 *     description: Retourne tout les points d'étape d'un voyage dont l'id est unique.
 *     responses:
 *       200:
 *         description: Retourne tout les points d'étape d'un voyage.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Id du point.  
 *                   example: 14  
 *                 title: 
 *                   type: string
 *                   description: Titre du point.
 *                   example: Marlenheim
 *                 description: 
 *                   type: string
 *                   description: Description du point.
 *                   example: Ceci un est la description du point de marlenheim.
 *                 latitude:
 *                   type: number
 *                   format: float
 *                   description: Latitude du point.
 *                   example: 48.61821601764363
 *                 longitude:
 *                   type: number 
 *                   format: float                        
 *                   description: Longitude du point.
 *                   example: 7.477853844028344
 *                 duration: 
 *                   type: integer
 *                   description: Durée du point d'étape.
 *                   example: 3
 *                 category: 
 *                   type: string                 
 *                   description: Catégorie du point.
 *                   example: Autre
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
	url: '/step',
	method: 'get',
	func: step_ctrl.get_all
},

/**
 * @swagger
 * /step:
 *   post:
 *     tags:
 *     - Step
 *     summary: Créer un nouveau point d'étape.
 *     description: Création d'un nouveau point d'étape.
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
 *               description:
 *                 type: string 
 *                 description: Description du nouveau point crée.
 *                 example: Ecole très répandue au Grand Est
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
 *               duration: 
 *                 type: integer
 *                 description: Durée du point d'étape.
 *                 example: 3
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
 *         description: Point d'étape crée avec succès.
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
 *                 description:
 *                   type: string 
 *                   description: Description du nouveau point crée.
 *                   example: Ecole très répandue au Grand Est
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
 *                 duration: 
 *                   type: integer
 *                   description: Durée du point d'étape.
 *                   example: 3
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
	url: '/step',
	method: 'post',
	func: step_ctrl.create
},


/**
 * @swagger
 * /step/{step_id}:
 *   get:
 *     tags:
 *     - Step
 *     summary: Retourne un point d'étape dont l'id est passé en paramètre.
 *     description: Retourne le point d'étape demandé d'un voyage avec l'id passé en paramètre.
 *     parameters:
 *      - in: path
 *        name: step_id
 *        example: 1
 *        required: true
 *        schema:
 *          type: integer     
 *           
 *     responses:
 *       200:
 *         description: Retourne un point d'étape dont l'id est passé en paramètre.
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
 *                   example: DisneyLand
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
 *                 duration: 
 *                   type: integer
 *                   description: Durée du point d'étape.
 *                   example: 3
 *                 description: 
 *                   type: string
 *                   description: Description du point.
 *                   example: Super parc à paris.
 *                 category: 
 *                   type: string                 
 *                   description: Catégorie du point.
 *                   example: Parc
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
	url: '/step/:step_id',
	method: 'get',
	func: step_ctrl.get_by_id
},


/**
 * @swagger
 * /step/{step_id}:
 *   put:
 *     tags:
 *     - Step
 *     summary: Update point d'étape.
 *     description: Met à jour les infos d'un point d'étape dont l'id du point à modifier est passé en paramètre.
 *     parameters:
 *      - in: path
 *        name: step_id
 *        example: 14
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
 *               duration: 
 *                 type: integer
 *                 description: Durée du point d'étape.
 *                 example: 3
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
 *                   example: Iut Robert Schuman
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
 *                 duration: 
 *                   type: integer
 *                   description: Durée du point d'étape.
 *                   example: 3
 *                 description: 
 *                   type: string
 *                   description: Description du point.
 *                   example: Grand campus à visiter.
 *                 category: 
 *                   type: string                 
 *                   description: Catégorie du point.
 *                   example: Autre
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
	url: '/step/:step_id',
	method: 'put',
	func: step_ctrl.update_by_id
},


/**
 * @swagger
 * /step/{step_id}:
 *   delete:
 *     tags:
 *     - Step
 *     summary: Supprime un point d'étape.
 *     description: Supprimer un point d'étape dont l'id du point est passé en paramètre.
 *     parameters:
 *      - in: path
 *        name: step_id
 *        example: 14
 *        required: true
 *        schema:
 *          type: integer   
 *           
 *     responses:
 *       200:
 *         description: Point d'étape supprimé avec succès.
 *                      
 */


{
	url: '/step/:step_id',
	method: 'delete',
	func: step_ctrl.delete_by_id
}

];
