const journal_entry_ctrl = require('../controllers/journalEntry');
const user_ctrl = require("../controllers/user");

module.exports = [
    /**
     * @swagger
     * components:
     *   schemas: 
     *     JournalEntry:
     *       type: object
     *       properties:
     *          id:
     *            type: integer
     *            description: Id du message  
     *          date:
     *            type: string
     *            description: Date d'envoi du mail au format jj/mm/aaaa hh:mm
     *          text:
     *            type: string 
     *            description: Message indiqué dans le journal
     *          createdAt:
     *            type: 
     *              string /
     *              null
     *            description: Date du message
     *          updateAt:
     *            type: 
     *              string /
     *              null
     *            description: Date de modification du message 
     *          TravelId:
     *            type: integer 
     *            description: Id du voyage
     *          MemberId:
     *            type: integer
     *            description: Id du membre ayant envoyé le message
     *          StepId:
     *            type: 
     *              integer /
     *              null
     *            description: Id du point d'étape associé au message
     *          PointId:
     *            type: 
     *              integer /
     *              null
     *            description: Id du point d'intérêt associé au message
     *       example:
     *         id: 1
     *         date: 12/05/2022 15:18
     *         text: Ce lieu est incroyable
     *         TravelId: 2 
     *         MemberId: 1
     *         StepId: 6
     *         PointId: null
     *         createdAt: null
     *         updateAt: null 
     * 		
     */

    /**
     * @swagger
     * /journal_entry:
     *   get:
     *     tags:
     *     - JournalEntry
     *     summary: Retourne tout les entrées de journal de la base de données.
     *     description: Retourne tout les entrées de journal de la base de données dont l'id est unique.
     *     responses:
     *       200:
     *         description: Retourne tout les entrées de journal de la base de données.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   description: Id du message.  
     *                   example: 33  
     *                 date: 
     *                   type: string
     *                   description: Date d'envoi du mail au format jj/mm/aaaa hh:mm.
     *                   example: 12/05/2022 15:18
     *                 text:
     *                   type: string 
     *                   description: Message indiqué dans le journal
     *                   example: Subjugué par ce paysage
     *                 createdAt:                    
     *                   type: string                   
     *                   description: Date de création du message.                   
     *                   example: 2022-03-17T15:17:42.282Z
     *                 updateAt:   
     *                   type: string
     *                   description: Date de modification du message.
     *                   example: 2022-03-17T15:17:42.282Z
     *                 TravelId:    
     *                   type: integer 
     *                   description: Id du voyage.
     *                   example: 1
     *                 MemberId:    
     *                   type: integer
     *                   description: Id du membre ayant envoyé le message.
     *                   example: 1
     *                 StepId:    
     *                   type: integer
     *                   description: Id du point d'étape associé au message.
     *                   example: null
     *                 PointId:    
     *                   type: integer
     *                   description: Id du point d'intérêt associé au message.
     *                   example: null
     *                     
     *                      
     */

    /**
    * @swagger
    * /journal_entry:
    *   post:
    *     tags:
    *     - JournalEntry
    *     summary: Créer un nouveau message.
    *     description: Créer un nouveau message.
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               date:
    *                 type: string
    *                 description: Date d'envoi du mail au format jj/mm/aaaa hh:mm.
    *                 example: 12/05/2022 15:18
    *               text:
    *                 type: string
    *                 description: Contenu du message envoyé.
    *                 example: Je n'ai plus les mots devant cette oeuvre d'art
    *               TravelId:
    *                 type: integer
    *                 description: Id du voyage.
    *                 example: 1
    *               MemberId:
    *                 type: integer
    *                 description: Id du membre ayant envoyé le message.
    *                 example: 1
    *               StepId:
    *                 type: 
    *                   integer /
    *                   null
    *                 description: Id du point d'étape associé au message. 
    *                 example: null
    *               PointId:
    *                 type: 
    *                   integer /
    *                   null 
    *                 description: Id du point d'intérêt associé au message. 
    *                 example: null
    *     responses:
    *       201:
    *         description: Message envoyé avec succès.
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 id:
    *                   type: integer
    *                   description: Id du message. 
    *                   example: 39 
    *                 date:
    *                   type: string
    *                   description: Date d'envoi du mail au format jj/mm/aaaa hh:mm.
    *                   example: 12/05/2022 15:18
    *                 text:
    *                   type: string
    *                   description: Contenu du message envoyé.
    *                   example: Je n'ai plus les mots devant cette oeuvre d'art
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
    *                 MemberId:
    *                   type: integer 
    *                   description: Id du membre ayant envoyé le message. 
    *                   example: 1
    *                 StepId:
    *                   type: 
    *                     integer /
    *                     null 
    *                   description: Id du point d'étape associé au message. 
    *                   example: null
    *                 PointId:
    *                   type: 
    *                     integer /
    *                     null
    *                   description: Id du point d'intérêt associé au message. 
    *                   example: null        
    *                                    
    *                      
    */

    /**
    * @swagger
    * /journal_entry/{journal_entry_id}:
    *   get:
    *     tags:
    *     - JournalEntry
    *     summary: Retourne le message dont l'id est passé en paramètre.
    *     description: Retourne le message demandé d'un voyage avec l'id passé en paramètre.
    *     parameters:
    *      - in: path
    *        name: journal_entry_id
    *        example: 2
    *        required: true
    *        schema:
    *          type: integer     
    *           
    *     responses:
    *       200:
    *         description: Retourne le message dont l'id est passé en paramètre.
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 id:
    *                   type: integer
    *                   description: Id du message. 
    *                   example: 39 
    *                 date:
    *                   type: string
    *                   description: Date d'envoi du mail au format jj/mm/aaaa hh:mm.
    *                   example: 12/05/2022 15:18
    *                 text:
    *                   type: string
    *                   description: Contenu du message envoyé.
    *                   example: Je n'ai plus les mots devant cette oeuvre d'art
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
    *                 MemberId:
    *                   type: integer 
    *                   description: Id du membre ayant envoyé le message. 
    *                   example: 1
    *                 StepId:
    *                   type: 
    *                     integer /
    *                     null 
    *                   description: Id du point d'étape associé au message. 
    *                   example: null
    *                 PointId:
    *                   type: 
    *                     integer /
    *                     null
    *                   description: Id du point d'intérêt associé au message. 
    *                   example: null
    *                     
    *       404:
    *         description: L'id de l'entrée du journal n'existe pas.
    * 
    */

    {
        url: '/journal_entry',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            journal_entry_ctrl.get_all,
        ],
    },
    {
        url: '/journal_entry',
        method: 'post',
        func: [
            user_ctrl.identify_client,
            journal_entry_ctrl.create,
        ],
    },
    {
        url: '/journal_entry/:journal_entry_id',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            journal_entry_ctrl.get_by_id,
        ],
    },
    {
        url: '/journal_entry/:journal_entry_id',
        method: 'put',
        func: [
            user_ctrl.identify_client,
            journal_entry_ctrl.update_by_id,
        ],
    },
    {
        url: '/journal_entry/:journal_entry_id',
        method: 'delete',
        func: [
            user_ctrl.identify_client,
            journal_entry_ctrl.delete_by_id,
        ],
    }

];
