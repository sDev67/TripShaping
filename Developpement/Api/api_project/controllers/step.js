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
					throw { status: 404, message: 'Requested Group not found' };
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
					throw { status: 404, message: 'Requested Group not found' };
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
					throw { status: 404, message: 'Requested Group not found' };
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
					throw { status: 404, message: 'Requested Group not found' };
				}
				return step.destroy();
			})
			.then(() => res.status(200).end())
			.catch(next);
	}

};
