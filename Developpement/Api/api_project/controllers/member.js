const db = require("../models");
const position = require("../models/position");

module.exports = {
  get_all: (req, res, next) => {
    return db.Member.findAll({
      order: ["name"],
    })
      .then((member) => res.json(member))
      .catch(next);
  },

  load_by_id: (req, res, next) => {
    return db.Member.findByPk(req.params.member_id)
      .then((member) => {
        if (!member) {
          throw { status: 404, message: "Membre inexistant / introuvable" };
        }
        req.member = member;
        return next();
      })
      .catch(next);
  },

  get_by_id: (req, res, next) => {
    return db.Member.findByPk(req.params.member_id)
      .then((member) => {
        if (!member) {
          throw { status: 404, message: "Membre inexistant / introuvable" };
        }
        return res.json(member);
      })
      .catch(next);
  },

  get_positions: (req, res, next) => {
    return db.Member.findByPk(req.params.member_id)
      .then((member) => {
        if (!member) {
          throw { status: 404, message: "Membre inexistant / introuvable" };
        }
        return member.getPositions();
      })
      .then(positions => res.json(positions))
      .catch(next);
  },

  create: (req, res, next) => {
    if (req.body.userLogin !== "") {
      db.User.findAll({
        attributes: ["username", "id"],
        where: {
          username: req.body.userLogin,
        },
      }).then((resp) => {
        if (resp == "") {
          return res.status(404).send("Nom d'utilisateur inexistant / introuvable");
        }
        else {
          db.Member.findOne({
            where: {
              userLogin: req.body.userLogin,
              TravelId: req.body.TravelId
            }
          })
            .then(member => {
              if (member) {
                return res.status(404).send("Cet utilisateur est déjà membre de ce voyage.")
              }
              else {
                return db.Member.create({ name: req.body.name, UserId: resp[0].id, TravelId: req.body.TravelId, userLogin: req.body.userLogin })
                  .then((member) => res.json(member))
                  .catch(next);
              }
            })
        }
      });
    }
    else {
      return db.Member.create({ name: req.body.name, UserId: null, TravelId: req.body.TravelId, userLogin: null })
        .then((member) => res.json(member))
        .catch(next);
    }
  },

  update_by_id: (req, res, next) => {
    return db.Member.findByPk(req.params.member_id)
      .then((member) => {
        if (!member) {
          throw { status: 404, message: "Membre inexistant / introuvable" };
        }
        Object.assign(member, req.body);
        return member.save();
      })
      .then((member) => res.json(member))
      .catch(next);
  },

  delete_by_id: (req, res, next) => {
    return db.Member.findByPk(req.params.member_id)
      .then((member) => {
        if (!member) {
          throw { status: 404, message: "Membre inexistant / introuvable" };
        }
        return member.destroy();
      })
      .then(() => res.status(200).end())
      .catch(next);
  },
};
