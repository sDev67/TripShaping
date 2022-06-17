const doc_ctrl = require('../controllers/documents');
const user_ctrl = require("../controllers/user");



module.exports = [

    /**
     * @swagger
     * components:
     *   schemas: 
     *     Document:
     *       type: object
     *       properties:
     *          id:
     *            type: integer
     *            description: Id du document  
     *          title:
     *            type: string
     *            description: Nom du document
     *          typeFile:
     *            type: string
     *            description: Extension du document
     *          dataFile:
     *            type: object
     *            properties:
     *              type: 
     *                 type: string
     *              data: 
     *                 type: array   
     *                 items:
     *                   type: integer
     *                   example: 1         
     *          createdAt:
     *            type: string
     *            description: Date d'import du document
     *          updateAt:
     *            type: string
     *            description: Date de modification du document
     *          StepId:
     *            type: integer 
     *            description: Id du point d'étape associé
     *          TravelId:
     *            type: integer 
     *            description: Id du voyage associé
     *          RouteId:
     *            type: integer 
     *            description: Id de la route associé
     *          PointId:
     *            type: integer 
     *            description: Id du point d'intérêt associé
     * 
     *       example:
     *         id: 1
     *         title: nodejs.png
     *         typeFile: image/png
     *         StepId: null
     *         TravelId: 1
     *         RouteId: null
     *         PointId: null
     * 		
     */

    /**
     * @swagger
     * /document:
     *   get:
     *     tags:
     *     - Document
     *     summary: Retourne tout les documents de la base de données.
     *     description: Retourne tout les documents (png, jpg, jpeg et pdf) de la base de données.
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
     *                   description: Id du document
     *                   example: 1  
     *                 title:
     *                   type: string
     *                   description: Nom du document
     *                   example: nodejs.png
     *                 typeFile:
     *                   type: string
     *                   description: Extension du document
     *                   example: image/png
     *                 createdAt:
     *                   type: string
     *                   description: Date d'import du document
     *                 updateAt:
     *                   type: string
     *                   description: Date de modification du document
     *                 StepId:
     *                   type: integer 
     *                   description: Id du point d'étape associé
     *                   example: 1
     *                 TravelId:
     *                   type: integer 
     *                   description: Id du voyage associé
     *                   example: 1
     *                 RouteId:
     *                   type: integer 
     *                   description: Id de la route associé
     *                   example: null
     *                 PointId:
     *                   type: integer 
     *                   description: Id du point d'intérêt associé
     *                   example: null
     *                     
     *                      
     */

    /**
     * @swagger
     * /document/check/{document_title}:
     *   get:
     *     tags:
     *     - Document
     *     summary: Retourne si le fichier existe dans le répertoire BDD.
     *     description: Retourne si le fichier existe dans le répertoire BDD.
     *     parameters:
     *      - in: path
     *        name: document_title
     *        example: nodejs.pdf
     *        required: true
     *        schema:
     *          type: string
     *     responses:
     *       200:
     *         description: Retourne 1 si le fichier existe 0 si non.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 exist:
     *                   type: string
     *                   description: Boolean indiquant si le fichier existe.
     *                   example: 1                    
     *                      
     */

    /**
     * @swagger
     * /document/{document_id}:
     *   get:
     *     tags:
     *     - Document
     *     summary: Retourne les infos d'un fichier.
     *     description: Retourne les infos d'un fichier.
     *     parameters:
     *      - in: path
     *        name: document_title
     *        example: nodejs.pdf
     *        required: true
     *        schema:
     *          type: string
     *     responses:
     *       200:
     *         description: Retourne les infos d'un fichier.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   description: Id du document
     *                   example: 1  
     *                 title:
     *                   type: string
     *                   description: Nom du document
     *                   example: nodejs.png
     *                 typeFile:
     *                   type: string
     *                   description: Extension du document
     *                   example: image/png
     *                 dataFile:
     *                    type: object
     *                    properties:
     *                      type: 
     *                         type: string
     *                      data: 
     *                         type: array   
     *                         items:
     *                           type: integer
     *                           example: 1                           
     *                 createdAt:
     *                   type: string
     *                   description: Date d'import du document
     *                 updateAt:
     *                   type: string
     *                   description: Date de modification du document
     *                 StepId:
     *                   type: integer 
     *                   description: Id du point d'étape associé
     *                   example: 1
     *                 TravelId:
     *                   type: integer 
     *                   description: Id du voyage associé
     *                   example: 1
     *                 RouteId:
     *                   type: integer 
     *                   description: Id de la route associé
     *                   example: null
     *                 PointId:
     *                   type: integer 
     *                   description: Id du point d'intérêt associé
     *                   example: null               
     *                      
     */

    /**
     * @swagger
     * /document/{document_id}:
     *   delete:
     *     tags:
     *     - Document
     *     summary: Supprime un document.
     *     description: Supprime un document du répertoire Resource et de la base.
     *     parameters:
     *      - in: path
     *        name: document_id
     *        example: 2
     *        required: true
     *        schema:
     *          type: integer
     *
     *     responses:
     *       200:
     *         description: Document supprimé avec succès.
     *       
     *       404:
     *         description: Le document demandé n'existe pas.
     */


    {
        url: '/document',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            doc_ctrl.get_all,
        ],
    },
    {
        url: '/document/file/:document_id',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            doc_ctrl.disp_file_by_id,
        ],
    },
    {
        url: '/document/check/:document_title',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            doc_ctrl.checkFileExistRoute,
        ],
    },
    {
        url: '/document',
        method: 'post',
        func: [
            user_ctrl.identify_client,
            doc_ctrl.upload,
            doc_ctrl.create
        ],
    },
    {
        url: '/document/:document_id',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            doc_ctrl.get_by_id,
        ],
    },
    {
        url: '/document/:document_id',
        method: 'delete',
        func: [
            user_ctrl.identify_client,
            doc_ctrl.delete_document_by_id,
        ],
    },

];



