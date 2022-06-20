const expense_ctrl = require('../controllers/expense');
const user_ctrl = require("../controllers/user");

module.exports = [

    /**
     * @swagger
     * components:
     *   schemas: 
     *     Expense:
     *       type: object
     *       properties:
     *          id:
     *           type: integer
     *           description: Id du membre
     *           example: 5
     *          cost:
     *           type: string
     *           description: Cout de la depense
     *           example: Serkan
     *          to:
     *           type: string
     *           description: ID des destinataires
     *           example: Sdev
     *          category:
     *           type: string
     *           description: Category de la depense
     *           example: Logement
     *          date:
     *           type: string
     *           description: Date oû la depense a été effectué
     *           example: 2022-07-03T16:23:43.272Z
     *          createdAt:
     *           type: string
     *           description: Date de création de la depense
     *           example: 2022-03-17T15:17:42.282Z
     *          updateAt:
     *           type: string
     *           description: Date de modification de la depense
     *           example: 2022-03-17T15:17:42.282Z
     *          TravelId:
     *           type: integer
     *           description: Id du voyage
     *           example: 1
     *          MemberId:
     *           type: integer
     *           description: Id de l'utilisateur
     *           example: 1
     * 
     *       example:
     *         id: 1
     *         cost: 52
     *         to: sDev
     *         category: Nourritures
     *         date: 10/08/22    
     *         createdAt: 2022-06-02T12:49:08.133Z
     *         updateAt: 2022-06-02T12:49:08.133Z
     *         TravelId: 1
     *         UserId: 1
     * 		
     */

    /**
     * @swagger
     * /expense:
     *   post:
     *     tags:
     *     - Expense
     *     summary: Créé une nouvelle dépense.
     *     description: Création d'une nouvelle dépense.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *                 cost:
     *                   type: integer
     *                   description: Cout de la depense
     *                   example: 52
     *                 to:
     *                   type: string
     *                   description: ID des destinataires
     *                   example: 1, 5, 7
     *                 category:
     *                   type: string
     *                   description: Category de la depense
     *                   example: Logement
     *                 date:
     *                   type: DateTime
     *                   description: Date oû la depense a été effectué
     *                   example: 2022-07-03T16:23:43.272Z
     *                 TravelId:
     *                   type: integer 
     *                   description: Id du voyage
     *                   example: 1
     *                 MemberId:
     *                   type: integer 
     *                   description: Id de l'utilisateur
     *                   example: 1 
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
     *                   example: 1
     *                 cost:
     *                   type: integer
     *                   description: Cout de la depense
     *                   example: 52
     *                 to:
     *                   type: string
     *                   description: ID des destinataires
     *                   example: 1, 5, 7
     *                 category:
     *                   type: string
     *                   description: Category de la depense
     *                   example: Logement
     *                 date:
     *                   type: DateTime
     *                   description: Date oû la depense a été effectué
     *                   example: 2022-07-03T16:23:43.272Z
     *                 createdAt:
     *                   type: string
     *                   description: Date de création de la dépense
     *                   example: 2022-06-03T15:23:42.282Z
     *                 updateAt:
     *                   type: string
     *                   description: Date de modification de la dépense
     *                   example: 2022-06-03T15:23:42.282Z
     *                 TravelId:
     *                   type: integer 
     *                   description: Id du voyage
     *                   example: 1
     *                 MemberId:
     *                   type: integer 
     *                   description: Id de l'utilisateur
     *                   example: 1                  
     *                      
     */

    {
        url: '/expense',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            expense_ctrl.get_all,
        ],
    },
    {
        url: '/expense',
        method: 'post',
        func: [
            user_ctrl.identify_client,
            expense_ctrl.create,
        ],
    },
    {
        url: '/expense/:expense_id',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            expense_ctrl.get_by_id,
        ],
    },
    {
        url: '/expense/:expense_id',
        method: 'put',
        func: [
            user_ctrl.identify_client,
            expense_ctrl.update_by_id,
        ],
    },
    {
        url: '/expense/:expense_id',
        method: 'delete',
        func: [
            user_ctrl.identify_client,
            expense_ctrl.delete_by_id,
        ],
    }

];
