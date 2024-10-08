const db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Step.findAll({
			order: ['title']
		})
			.then(step => res.json(step))
			.catch(next);
	},

	load_by_id: (req, res, next) => {
		return db.Step.findByPk(req.params.step_id)
			.then(step => {
				if (!step) {
					throw { status: 404, message: 'Point d\'étape inexistant / introuvable' };
				}
				req.step = step;
				return next();
			})
			.catch(next);
	},

	get_by_id: (req, res, next) => {
		return db.Step.findByPk(req.params.step_id)
			.then(step => {
				if (!step) {
					throw { status: 404, message: 'Point d\'étape inexistant / introuvable' };
				}
				return res.json(step);
			})
			.catch(next);
	},

	create: (req, res, next) => {
		return db.Step.create(req.body)
			.then(step => res.json(step))
			.catch(next);
	},

	update_by_id: (req, res, next) => {
		return db.Step.findByPk(req.params.step_id)
			.then(step => {
				if (!step) {
					throw { status: 404, message: 'Point d\'étape inexistant / introuvable' };
				}
				Object.assign(step, req.body);
				return step.save();
			})
			.then(step => res.json(step))
			.catch(next);
	},

	delete_by_id: (req, res, next) => {
		return db.Step.findByPk(req.params.step_id)
			.then(step => {
				if (!step) {
					throw { status: 404, message: 'Point d\'étape inexistant / introuvable' };
				}
				return step.destroy();
			})
			.then(() => res.status(200).end())
			.catch(next);
	},

	get_all_documents_by_step_id: async (req, res, next) => {
		return db.Step.findByPk(req.params.step_id)
			.then(step => {
				if (!step) {
					throw { status: 404, message: 'Point d\'étape inexistant / introuvable' };
				}
				return step.getDocuments({
					attributes: { exclude: ['dataFile'] } // dans le retour en json on enleve le champs dataFile, pour ne pas avoir tout le bordel
				});
			})
			.then(steps => res.json(steps))
			.catch(err => next(err));
	},

	get_points_of_step: (req, res, next) => {
		return db.Step.findByPk(req.params.step_id)
			.then(step => {
				if (!step) {
					throw { status: 404, message: 'Point d\'étape inexistant / introuvable' };
				}
				return step.getPoints();
			})
			.then(points => res.json(points))
			.catch(err => next(err));
	},

};
