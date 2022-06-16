const route_ctrl = require('../controllers/route');

module.exports = [

    /**
     * @swagger
     * components:
     *   schemas: 
     *     Route:
     *       type: object
     *       properties:
     *          id:
     *            type: integer
     *            description: Id de la route
     *          travelType:
     *            type: string
     *            description: Type de transport
     *          createdAt:
     *            type: string
     *            description: Date de création de la route
     *          updateAt:
     *            type: string
     *            description: Date de modification de la route
     *          start:
     *            type: integer 
     *            description: Id du point de départ
     *          finish:
     *            type: integer 
     *            description: Id du point de fin
     *          TravelId:
     *            type: integer 
     *            description: Id du voyage
     * 
     *       example:
     *         id: 14 
     *         travelType: Autre
     *         createdAt: 2022-03-17T15:17:42.282Z
     *         updateAt: 2022-03-17T15:17:42.282Z
     *         start: 1
     *         finish: 2
     *         TravelId: 1
     * 		
     */

    /**
     * @swagger
     * /route:
     *   get:
     *     tags:
     *     - Route
     *     summary: Retourne toutes les routes de la base de données.
     *     description: Retourne toutes les routes de la base de données.
     *     responses:
     *       200:
     *         description: Retourne toutes les routes de la base de données.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   description: Id de la route
     *                   example: 10  
     *                 travelType: 
     *                   type: string
     *                   description: Type de transport
     *                   example: ""
     *                 createdAt:                    
     *                   type: string                   
     *                   description: Date de création de la route                 
     *                   example: 2022-03-17T15:17:42.282Z
     *                 updateAt:   
     *                   type: string
     *                   description: Date de modification de la route
     *                   example: 2022-03-17T15:17:42.282Z
     *                 start:    
     *                   type: integer 
     *                   description: Id du point de départ
     *                   example: 13
     *                 finish:    
     *                   type: integer 
     *                   description: Id du point de fin
     *                   example: 14                
     *                 TravelId:    
     *                   type: integer 
     *                   description: Id du voyage
     *                   example: 1  
     *                      
     */

    /**
     * @swagger
     * /route/{route_id}:
     *   get:
     *     tags:
     *     - Route
     *     summary: Retourne la route dont l'id est passé en paramètre.
     *     description: Retourne la route demandé avec l'id passé en paramètre.
     *     parameters:
     *      - in: path
     *        name: route_id
     *        example: 1
     *        required: true
     *        schema:
     *          type: integer     
     *           
     *     responses:
     *       200:
     *         description: Retourne la route dont l'id est passé en paramètre.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   description: Id de la route
     *                   example: 10  
     *                 travelType: 
     *                   type: string
     *                   description: Type de transport
     *                   example: ""
     *                 createdAt:                    
     *                   type: string                   
     *                   description: Date de création de la route                 
     *                   example: 2022-03-17T15:17:42.282Z
     *                 updateAt:   
     *                   type: string
     *                   description: Date de modification de la route
     *                   example: 2022-03-17T15:17:42.282Z
     *                 start:    
     *                   type: integer 
     *                   description: Id du point de départ
     *                   example: 13
     *                 finish:    
     *                   type: integer 
     *                   description: Id du point de fin
     *                   example: 14                
     *                 TravelId:    
     *                   type: integer 
     *                   description: Id du voyage
     *                   example: 1
     * 
     *       404:
     *         description: Route non trouvé.
     *                      
     */

    /**
     * @swagger
     * /route/{route_id}/documents:
     *   get:
     *     tags:
     *     - Route
     *     summary: Retourne le document associé à la route.
     *     description: Retourne le document associé à la route.
     *     parameters:
     *      - in: path
     *        name: route_id
     *        example: 8
     *        required: true
     *        schema:
     *          type: integer     
     *           
     *     responses:
     *       200:
     *         description: Retourne le document associé à la route.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   description: Id du document
     *                   example: 4
     *                 title: 
     *                   type: string
     *                   description: Titre du document
     *                   example: menu_resto.png
     *                 typeFile: 
     *                   type: string
     *                   description: Description du document
     *                   example: image/png
     *                 createdAt:                    
     *                   type: string                   
     *                   description: Date de création du point                  
     *                   example: 2022-03-17T15:17:42.282Z
     *                 updateAt:   
     *                   type: string
     *                   description: Date de modification du point
     *                   example: 2022-03-17T15:17:42.282Z
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
     *                   example: 8
     *                 PointId:    
     *                   type: integer 
     *                   description: Id point d'intérêt
     *                   example: null
     *                     
     *                      
     */




    {
        url: '/route',
        method: 'get',
        func: route_ctrl.get_all
    },
    {
        url: '/route',
        method: 'post',
        func: route_ctrl.create
    },
    {
        url: '/route/:route_id',
        method: 'get',
        func: route_ctrl.get_by_id
    },
    {
        url: '/route/:route_id',
        method: 'put',
        func: route_ctrl.update_by_id
    },
    {
        url: '/route/:route_id/documents',
        method: 'get',
        func: route_ctrl.get_all_documents_by_route_id
    },
    {
        url: '/route/:route_id',
        method: 'delete',
        func: route_ctrl.delete_by_id
    }

];
