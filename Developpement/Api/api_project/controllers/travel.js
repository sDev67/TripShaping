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
        status: 2,
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
          throw { status: 404, message: "Requested Group not found" };
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
          throw { status: 404, message: "Requested Group not found" };
        }
        return res.json(travel);
      })
      .catch(next);
  },

  get_points_of_travel: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Travel not found" };
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
          throw { status: 404, message: "Travel not found" };
        }
        return travel.getSteps();
      })
      .then((steps) => res.json(steps))
      .catch((err) => next(err));
  },
  get_tasks_of_travel: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Travel not found" };
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
          throw { status: 404, message: "Travel not found" };
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
          throw { status: 404, message: "Travel not found" };
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
          throw { status: 404, message: "Travel not found" };
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
          throw { status: 404, message: "Travel not found" };
        }
        return travel.getExpenses({ order: ["date", "DESC"] });
      })
      .then((expenses) => res.json(expenses))
      .catch((err) => next(err));
  },
  get_journalEntries_of_travel: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Travel not found" };
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
          throw { status: 404, message: "Travel not found" };
        }
        return travel.getDocuments({
          attributes: { exclude: ["dataFile"] }, // dans le retour en json on enleve le champs dataFile, pour ne pas avoir tout le bordel
        });
      })
      .then((steps) => res.json(steps))
      .catch((err) => next(err));
  },

  get_all_journal_entries_by_travel_id: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Travel not found" };
        }
        return travel.getJournalEntries();
      })
      .then((journalEntries) => res.json(journalEntries))
      .catch((err) => next(err));
  },

  get_all_photos_by_travel_id: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Travel not found" };
        }
        return travel.getPhotos();
      })
      .then((photos) => res.json(photos))
      .catch((err) => next(err));
  },
  // get_all_documents_by_travel_point_id: async (req, res, next) => {
  // 	return db.Travel.findByPk(req.params.travel_id)
  // 		.then(travel => {
  // 			if (!travel) {
  // 				throw { status: 404, message: 'Travel not found' };
  // 			}
  // 			return travel.getDocuments({
  // 				attributes: { exclude: ['dataFile'] }
  // 			});
  // 		})
  // 		.then(steps => res.json(steps))
  // 		.catch(err => next(err));
  // },
  create: (req, res, next) => {
    return db.Travel.create(req.body)
      .then((travel) => res.json(travel))
      .catch(next);
  },

  update_by_id: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Requested Group not found" };
        }
        Object.assign(travel, req.body);
        return travel.save();
      })
      .then((travel) => res.json(travel))
      .catch(next);
  },

  delete_by_id: (req, res, next) => {
    return db.Travel.findByPk(req.params.travel_id)
      .then((travel) => {
        if (!travel) {
          throw { status: 404, message: "Requested Group not found" };
        }
        return travel.destroy();
      })
      .then(() => res.status(200).end())
      .catch(next);
  },
};
