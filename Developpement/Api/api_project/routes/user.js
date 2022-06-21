const user_ctrl = require("../controllers/user");

function client_is_user_id(req, res, next) {
  if (req.user.id == req.params.user_id) {
    return next();
  } else {
    throw { status: 403, message: "Action is not authorized" };
  }
}

module.exports = [

  /**
   * @swagger
   * components:
   *   schemas: 
   *     User:
   *       type: object
   *       properties:
   *          id:
   *            type: integer
   *            description: Id de l'utilisateur  
   *          username:
   *            type: string
   *            description: Username de l'utilisateur
   *          password:
   *            type: string
   *            description: Mot de passe de l'utilisateur hashé et non renvoyé 
   *          createdAt:
   *            type: string
   *            description: Date de création de l'utilisateur
   *          updateAt:
   *            type: string
   *            description: Date de modification de l'utilisateur
   * 
   *       example:
   *         id: 1
   *         username: vivien
   *         createdAt: 2022-06-03T09:00:31.248Z
   *         updateAt: 2022-06-03T09:00:31.248Z
   * 		
   */

  /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *     - User
   *     summary: Retourne tous les utilisateurs de la base de données.
   *     description: Retourne tous les utilisateurs de la base de données dont l'id est unique.
   *     responses:
   *       200:
   *         description: Retourne tous les utilisateurs de la base de données.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id de l'utilisateur.  
   *                   example: 1
   *                 username: 
   *                   type: string
   *                   description: Titre de l'utilisateur.
   *                   example: Jean
   *                 createdAt:                    
   *                   type: string                   
   *                   description: Date de création de l'utilisateur.                   
   *                   example: 2022-06-03T09:00:31.248Z
   *                 updateAt:   
   *                   type: string
   *                   description: Date de modification de l'utilisateur.
   *                   example: 2022-06-03T09:00:31.248Z
   *                                 
   */

  /**
   * @swagger
   * /user/signup:
   *   post:
   *     tags:
   *     - User
   *     summary: Créer un nouvel utilisateur (formulaire d'inscription).
   *     description: Création du nouvel utilisateur.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 description: Username du nouvel utilisateur 
   *                 example: baptiste
   *               password:
   *                 type: string 
   *                 description: Mot de passe hashé. 
   *                 example: a
   *     responses:
   *       200:
   *         description: Utilisateur crée avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id de l'utilisateur 
   *                   example: 1 
   *                 username:
   *                   type: string
   *                   description: Username de l'utilisateur
   *                   example: baptiste
   *                 createdAt:                    
   *                   type: string                   
   *                   description: Date de création de l'utilisateur.                   
   *                   example: 2022-06-03T09:00:31.248Z
   *                 updateAt:   
   *                   type: string
   *                   description: Date de modification de l'utilisateur.
   *                   example: 2022-06-03T09:00:31.248Z                 
   *       
   *       500:
   *         description: Erreur / Utilisateur existant                 
   */

  /**
   * @swagger
   * /user/signin:
   *   post:
   *     tags:
   *     - User
   *     summary: Créer un nouvel utilisateur (formulaire de connexion).
   *     description: Création du nouvel utilisateur.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 description: Username du nouvel utilisateur 
   *                 example: baptiste
   *               password:
   *                 type: string 
   *                 description: Mot de passe hashé. 
   *                 example: a
   *     responses:
   *       200:
   *         description: Utilisateur crée avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id de l'utilisateur 
   *                   example: 1 
   *                 username:
   *                   type: string
   *                   description: Username de l'utilisateur
   *                   example: baptiste
   *                 createdAt:                    
   *                   type: string                   
   *                   description: Date de création de l'utilisateur.                   
   *                   example: 2022-06-03T09:00:31.248Z
   *                 updateAt:   
   *                   type: string
   *                   description: Date de modification de l'utilisateur.
   *                   example: 2022-06-03T09:00:31.248Z                 
   *       
   *       404:
   *         description: Erreur / Utilisateur inexistant                 
   */

  /**
   * @swagger
   * /user/whoami:
   *   get:
   *     tags:
   *     - User
   *     summary: Retourne l'utilisateur.
   *     description: Retourne l'utilisateur.
   *     responses:
   *       200:
   *         description: Retourne l'utilisateur.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Id de l'utilisateur.  
   *                   example: 1
   *                 username: 
   *                   type: string
   *                   description: Titre de l'utilisateur.
   *                   example: Jean
   *                 createdAt:                    
   *                   type: string                   
   *                   description: Date de création de l'utilisateur.                   
   *                   example: 2022-06-03T09:00:31.248Z
   *                 updateAt:   
   *                   type: string
   *                   description: Date de modification de l'utilisateur.
   *                   example: 2022-06-03T09:00:31.248Z
   *                     
   *       401:
   *         description: Token non-renseigné / invalide.   
   * 
   */

  {
    url: "/users",
    method: "get",
    func: [
      user_ctrl.identify_client,
      user_ctrl.get_all,
    ],
  },
  {
    url: "/user/signup",
    method: "post",
    func: user_ctrl.signup,
  },
  {
    url: "/user/signin",
    method: "post",
    func: user_ctrl.signin,
  },
  {
    url: "/user/whoami",
    method: "get",
    func: [user_ctrl.identify_client, user_ctrl.whoami],
  },
  {
    url: "/user/:user_id",
    method: "get",
    func: [
      user_ctrl.identify_client,
      client_is_user_id,
      user_ctrl.get_by_id,
    ],
  },
  {
    url: "/user/:user_id",
    method: "put",
    func: [
      user_ctrl.identify_client,
      client_is_user_id,
      user_ctrl.update_by_id,
    ],
  },
  {
    url: "/user/:user_id",
    method: "delete",
    func: [
      user_ctrl.identify_client,
      client_is_user_id,
      user_ctrl.delete_by_id,
    ],
  },
];
