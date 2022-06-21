const db = require("../models");

module.exports = {

  get_all: (req, res, next) => {
    return db.Travel.findAll({
      order: ["name"],
    })
      .then((travel) => res.json(travel))
      .catch(next);
  },
  get_published: (req, res, next) => {
    return db.Travel.findAll({
      where: {
        toPublish: 1,
      },
      order: ["name"],
    })
      .then((travel) => res.json(travel))
      .catch(next);
  },

  load_by_id: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        req.travel = travel;
        return next();
      })
      .catch(next);
  },

  get_by_id: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        var userId = req.user['dataValues'].id;

        checkAuthorization(req.params.travel_id, userId)
          .then((authorized) => {
            if (!authorized) {
              if (travel['dataValues'].toPublish == false) {
                throw { status: 404, message: "Vous ne faites pas partie de ce voyage" };
              }
            }
            return res.json(travel);
          })
          .catch(next)
      })
      .catch(next);
  },

  get_points_of_travel: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        return travel.getPoints();
      })
      .then((points) => res.json(points))
      .catch((err) => next(err));
  },

  get_steps_of_travel: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        return travel.getSteps();
      })
      .then((steps) => res.json(steps))
      .catch((err) => next(err));
  },
  get_last_ten_published_travel: (req, res, next) => {
    return db.Travel.findAll({
      where: {
        toPublish: 1,
      },
      order: ["startDate"],
      limit: 10
    })
      .then((travels) => {

        if (!travels) {
          throw { status: 404, message: "Aucun voyage récent." };
        }
        else {

          res.json(travels);
        }
      })

      .catch((err) => next(err));
  },
  get_tasks_of_travel: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        return travel.getTasks();
      })
      .then((tasks) => res.json(tasks))
      .catch((err) => next(err));
  },
  get_labels_of_travel: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        return travel.getLabels();
      })
      .then((steps) => res.json(steps))
      .catch((err) => next(err));
  },
  get_routes_of_travel: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        return travel.getRoutes();
      })
      .then((steps) => res.json(steps))
      .catch((err) => next(err));
  },
  get_in_preparation_travel: (req, res, next) => {
    return db.Travel.findAll({
      where: {
        status: 0,
      },
      order: ["name"],
    })
      .then((travel) => res.json(travel))
      .catch(next);
  },
  get_current_travel: (req, res, next) => {
    return db.Travel.findAll({
      where: {
        status: 1,
      },
      order: ["name"],
    })
      .then((travel) => res.json(travel))
      .catch(next);
  },
  get_finish_travel: (req, res, next) => {
    return db.Travel.findAll({
      where: {
        status: 2,
      },
      order: ["name"],
    })
      .then((travel) => res.json(travel))
      .catch(next);
  },
  get_members_of_travel: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        return travel.getMembers();
      })
      .then((members) => res.json(members))
      .catch((err) => next(err));
  },
  get_expenses_of_travel: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        return travel.getExpenses({ order: [["date", "DESC"]] });
      })
      .then((expenses) => res.json(expenses))
      .catch((err) => next(err));
  },
  get_journalEntries_of_travel: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        return travel.getJournalEntries();
      })
      .then((journalEntries) => res.json(journalEntries))
      .catch((err) => next(err));
  },
  get_all_documents_by_travel_id: async (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        return travel.getDocuments({
          attributes: { exclude: ["dataFile"] }, // dans le retour en json on enleve le champs dataFile, pour ne pas avoir tout le bordel
        });
      })
      .then((steps) => res.json(steps))
      .catch((err) => next(err));
  },

  get_all_photos_by_travel_id: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        return travel.getPhotos();
      })
      .then((photos) => res.json(photos))
      .catch((err) => next(err));
  },

  create: (req, res, next) => {
    return db.Travel.create(req.body)
      .then((travel) => res.json(travel))
      .catch(next);
  },

  update_by_id: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        var userId = req.user['dataValues'].id;

        checkAuthorization(req.params.travel_id, userId)
          .then((authorized) => {
            if (!authorized) {
              throw { status: 404, message: "Vous ne faites pas partie de ce voyage" };
            }
            Object.assign(travel, req.body);
            travel.save();
            return res.json(travel);
          })
          .catch(next)
      })
      .catch(next);
  },

  delete_by_id: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
        return travel.destroy();
      })
      .then(() => res.status(200).end())
      .catch(next);
  },
  copyTravel: (req, res, next) => {
    db.Travel.findOne({
      include: [
        { model: db.Point },
        {
          model: db.Step,
          include: [{ model: db.Point }],
        },
        { model: db.Route },
      ],
      where: {
        id: req.body.TravelId,
      },
      order: [[db.Step, "id"]],
    })
      .then((travel) => {
        if (travel) {
          let resTravel = {
            name: travel.name,
            UserId: req.body.UserId,
          };

          db.Travel.create(resTravel).then((newTravel) => {
            travel.Points.map((point) => {
              if (point.StepId == null) {
                let resPoint = {
                  title: point.title,
                  longitude: point.longitude,
                  latitude: point.latitude,
                  description: point.description,
                  category: point.category,
                  TravelId: newTravel.id,
                };
                db.Point.create(resPoint);
              }
            });

            var tabSteps = [];
            travel.Steps.map((step) => {
              var resStep = {
                title: step.title,
                longitude: step.longitude,
                latitude: step.latitude,
                description: step.description,
                duration: step.duration,
                TravelId: newTravel.id,
              };

              db.Step.create(resStep).then((newStep) => {
                if (step.Points.length > 0) {
                  step.Points.map((point) => {
                    let resPoint = {
                      title: point.title,
                      longitude: point.longitude,
                      latitude: point.latitude,
                      description: point.description,
                      category: point.category,
                      StepId: newStep.id,
                      day: point.day,
                      TravelId: newTravel.id,
                    };
                    db.Point.create(resPoint);
                  });
                }
              });

              tabSteps.push(resStep);
            });

            copyTravelRoutes(req.body.TravelId, newTravel["dataValues"].id);
            res.json(newTravel);
          });
        } else {
          throw { status: 404, message: "Voyage inexistant / introuvable" };
        }
      })
      .catch(next);
  },
};

/****
 *        FONCTION PERSO
 */

const checkAuthorization = (travelId, userId) => {
  var authorized = { oui: false };
  return db.Member.findOne({
    where: {
      TravelId: travelId,
      UserId: userId
    }
  }).then((member) => {
    if (member && member['dataValues'].TravelId == travelId && member['dataValues'].UserId == userId) {
      authorized.oui = true;
    } else {
      authorized.oui = false;
    }
    return authorized.oui;
  })
};

const copyTravelRoutes = async (OldTravelId, NewTravelId) => {
  var newSteps = await db.Step.findAll({
    where: {
      TravelId: NewTravelId,
    },
  });

  var oldSteps = await db.Step.findAll({
    where: {
      TravelId: OldTravelId,
    },
  });

  var oldRoutes = await db.Route.findAll({
    where: {
      TravelId: OldTravelId,
    },
  });

  oldRoutes.map((route) => {
    var oldStepStart = oldSteps.filter(
      (step) => step["dataValues"].id == route.start
    )[0]["dataValues"];
    var oldStepFinish = oldSteps.filter(
      (step) => step["dataValues"].id == route.finish
    )[0]["dataValues"];

    var newStepStartId = newSteps.filter(
      (step) =>
        step["dataValues"].latitude == oldStepStart.latitude &&
        step["dataValues"].longitude == oldStepStart.longitude
    )[0]["dataValues"].id;
    var newStepFinishId = newSteps.filter(
      (step) =>
        step["dataValues"].latitude == oldStepFinish.latitude &&
        step["dataValues"].longitude == oldStepFinish.longitude
    )[0]["dataValues"].id;

    let newRoute = {
      TravelId: NewTravelId,
      start: newStepStartId,
      finish: newStepFinishId,
      travelType: route.travelType,
    };
    db.Route.create(newRoute);
  });
};