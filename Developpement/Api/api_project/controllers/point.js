const db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Point.findAll({
			order: ['title']
		})
			.then(point => res.json(point))
			.catch(next);
	},

	load_by_id: (req, res, next) => {
		return db.Point.findByPk(req.params.point_id)
			.then(point => {
				if (!point) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				req.point = point;
				return next();
			})
			.catch(next);
	},

	get_by_id: (req, res, next) => {
		return db.Point.findByPk(req.params.point_id)
			.then(point => {
				if (!point) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				return res.json(point);
			})
			.catch(next);
	},

	create: (req, res, next) => {
		return db.Point.create(req.body)
			.then(point => res.json(point))
			.catch(next);
	},

	update_by_id: (req, res, next) => {
		return db.Point.findByPk(req.params.point_id)
			.then(point => {
				if (!point) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				Object.assign(point, req.body);
				return point.save();
			})
			.then(point => res.json(point))
			.catch(next);
	},

	delete_by_id: (req, res, next) => {
		return db.Point.findByPk(req.params.point_id)
			.then(point => {
				if (!point) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				return point.destroy();
			})
			.then(() => res.status(200).end())
			.catch(next);
	},

	get_all_documents_by_point_id: async (req, res, next) => {
		return db.Point.findByPk(req.params.point_id)
			.then(point => {
				if (!point) {
					throw { status: 404, message: 'Point not found' };
				}
				return point.getDocuments({
					attributes: { exclude: ['dataFile'] } // dans le retour en json on enleve le champs dataFile, pour ne pas avoir tout le bordel
				});
			})
			.then(steps => res.json(steps))
			.catch(err => next(err));
	},

};
