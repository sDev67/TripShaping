
const db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Travel.findAll({
			order: ['name']
		})
			.then(travel => res.json(travel))
			.catch(next);
	},
	get_published: (req, res, next) => {
		return db.Travel.findAll({			
			where:
			{
				finished:'true',
				toPublish:'true'
			},
			order: ['name']
		})
			.then(travel => res.json(travel))
			.catch(next);
	},

	load_by_id: (req, res, next) => {
		return db.Travel.findByPk(req.params.travel_id)
			.then(travel => {
				if (!travel) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				req.travel = travel;
				return next();
			})
			.catch(next);
	},

	get_by_id: (req, res, next) => {
		return db.Travel.findByPk(req.params.travel_id)
			.then(travel => {
				if (!travel) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				return res.json(travel);
			})
			.catch(next);
	},

	get_points_of_travel: (req, res, next) => {
		return db.Travel.findByPk(req.params.travel_id)
			.then(travel => {
				if (!travel) {
					throw { status: 404, message: 'Travel not found' };
				}
				return travel.getPoints();
			})
			.then(points => res.json(points))
			.catch(err => next(err));
	},

	get_steps_of_travel: (req, res, next) => {
		return db.Travel.findByPk(req.params.travel_id)
			.then(travel => {
				if (!travel) {
					throw { status: 404, message: 'Travel not found' };
				}
				return travel.getSteps();
			})
			.then(steps => res.json(steps))
			.catch(err => next(err));
	},
	get_tasks_of_travel: (req, res, next) => {
		return db.Travel.findByPk(req.params.travel_id)
			.then(travel => {
				if (!travel) {
					throw { status: 404, message: 'Travel not found' };
				}
				return travel.getTasks();
			})
			.then(tasks => res.json(tasks))
			.catch(err => next(err));
	},
	get_labels_of_travel: (req, res, next) => {
		return db.Travel.findByPk(req.params.travel_id)
			.then(travel => {
				if (!travel) {
					throw { status: 404, message: 'Travel not found' };
				}
				return travel.getLabels();
			})
			.then(steps => res.json(steps))
			.catch(err => next(err));
	},
	get_routes_of_travel: (req, res, next) => {
		return db.Travel.findByPk(req.params.travel_id)
			.then(travel => {
				if (!travel) {
					throw { status: 404, message: 'Travel not found' };
				}
				return travel.getRoutes();
			})
			.then(steps => res.json(steps))
			.catch(err => next(err));
	},

	get_members_of_travel: (req, res, next) => {
		return db.Travel.findByPk(req.params.travel_id)
			.then(travel => {
				if (!travel) {
					throw { status: 404, message: 'Travel not found' };
				}
				return travel.getMembers();
			})
			.then(members => res.json(members))
			.catch(err => next(err));
	},

	create: (req, res, next) => {
		return db.Travel.create(req.body)
			.then(travel => res.json(travel))
			.catch(next);
	},

	update_by_id: (req, res, next) => {
		return db.Travel.findByPk(req.params.travel_id)
			.then(travel => {
				if (!travel) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				Object.assign(travel, req.body);
				return travel.save();
			})
			.then(travel => res.json(travel))
			.catch(next);
	},

	delete_by_id: (req, res, next) => {
		return db.Travel.findByPk(req.params.travel_id)
			.then(travel => {
				if (!travel) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				return travel.destroy();
			})
			.then(() => res.status(200).end())
			.catch(next);
	}

};