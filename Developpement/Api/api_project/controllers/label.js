const db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Label.findAll({
			order: ['title']
		})
			.then(label => res.json(label))
			.catch(next);
	},

	load_by_id: (req, res, next) => {
		return db.Label.findByPk(req.params.label_id)
			.then(label => {
				if (!label) {
					throw { status: 404, message: 'Label inexistant / introuvable' };
				}
				res.locals.label = label;
				return next();
			})
			.catch(next);
	},

	get_by_id: (req, res, next) => {
		return db.Label.findByPk(req.params.label_id)
			.then(label => {
				if (!label) {
					throw { status: 404, message: 'Label inexistant / introuvable' };
				}
				return res.json(label);
			})
			.catch(next);
	},

	create: (req, res, next) => {
		return db.Label.create(req.body)
			.then(label => res.json(label))
			.catch(next);
	},

	update_by_id: (req, res, next) => {
		return db.Label.findByPk(req.params.label_id)
			.then(label => {
				if (!label) {
					throw { status: 404, message: 'Label inexistant / introuvable' };
				}
				Object.assign(label, req.body);
				return label.save();
			})
			.then(label => res.json(label))
			.catch(next);
	},

	delete_by_id: (req, res, next) => {
		return db.Label.findByPk(req.params.label_id)
			.then(label => {
				if (!label) {
					throw { status: 404, message: 'Label inexistant / introuvable' };
				}
				return label.destroy();
			})
			.then(() => res.status(200).end())
			.catch(next);
	}

};
