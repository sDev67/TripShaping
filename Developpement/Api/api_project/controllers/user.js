const jsonwebtoken = require("jsonwebtoken"),
  expressjwt = require("express-jwt"),
  db = require("../models");

const secret = "buiVUTY,676:88b&hj%cgF*Chi";

module.exports = {
  get_all: (req, res, next) => {
    return db.User.findAll({
      order: ["username"],
    })
      .then((users) => res.json(users))
      .catch((err) => next(err));
  },

  get_by_id: (req, res, next) => {
    return db.User.findByPk(req.params.user_id)
      .then((user) => {
        if (!user) {
          throw { status: 404, message: "Requested User not found" };
        }
        return res.json(user);
      })
      .catch((err) => next(err));
  },

  signup: (req, res, next) => {
    const data = {
      username: req.body.username || "",
      password: db.User.generate_hash(req.body.password) || "",
    };
    return db.User.create(data)
      .then((user) => res.json(user))
      .catch((err) => next(err));
  },

  update_by_id: (req, res, next) => {
    return db.User.findByPk(req.params.user_id)
      .then((user) => {
        if (!user) {
          throw { status: 404, message: "Requested User not found" };
        }
        delete req.body.password;
        Object.assign(user, req.body);
        return user.save();
      })
      .then((user) => res.json(user))
      .catch((err) => next(err));
  },

  delete_by_id: (req, res, next) => {
    return db.User.findByPk(req.params.user_id)
      .then((user) => {
        if (!user) {
          throw { status: 404, message: "Requested User not found" };
        }
        return user.destroy();
      })
      .then(() => res.status(200).end())
      .catch((err) => next(err));
  },

  signin: (req, res, next) => {
    const username = req.body.username || "";
    const password = req.body.password || "";

    db.User.findOne({
      where: { username },
    })
      .then((user) => {
        if (!user) {
          throw { status: 404, message: "Requested User not found" };
        }
        if (!user.check_password(password)) {
          throw { status: 401, message: "Wrong password" };
        }

        const token = jsonwebtoken.sign({ id: user.id }, secret, {
          algorithm: "HS256",
          expiresIn: 60 * 60 * 12,
        });

        return res.json({ user, token });
      })
      .catch((err) => next(err));
  },

  whoami: (req, res, next) => {
    try
    {

      return res.json(req.user);
    }
    catch(err)
    {
      next(err);
    }

  },
  load_by_id: (req, res, next) => {
		return db.User.findByPk(req.params.user_id)
			.then(user => {
				if (!user) {
					throw { status: 404, message: 'User not found' };
				}
				res.locals.user = user;
				return next();
			})
			.catch(next);
	},

  identify_client: [
    expressjwt({ secret, algorithms: ["HS256"] }),
    (req, res, next) => {
      db.User.findByPk(req.user.id).then((user) => {
        if (!user) {
          throw { status: 404, message: "Requested User not found" };
        }
        req.user = user;
        return next();
      }).catch((err) => next(err));
    },
  ],
};
