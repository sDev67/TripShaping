const db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.User.findAll({
			order: ['username']
		})
			.then(user => res.json(user))
			.catch(next);
	},

	load_by_id: (req, res, next) => {
		return db.User.findByPk(req.params.user_id)
			.then(user => {
				if (!user) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				req.user = user;
				return next();
			})
			.catch(next);
	},

	get_by_id: (req, res, next) => {
		return db.User.findByPk(req.params.user_id)
			.then(user => {
				if (!user) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				return res.json(user);
			})
			.catch(next);
	},

	create: (req, res, next) => {
		return db.User.create(req.body)
			.then(user => res.json(user))
			.catch(next);
	},

	update_by_id: (req, res, next) => {
		return db.User.findByPk(req.params.user_id)
			.then(user => {
				if (!user) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				Object.assign(user, req.body);
				return user.save();
			})
			.then(label => res.json(label))
			.catch(next);
	},

	delete_by_id: (req, res, next) => {
		return db.User.findByPk(req.params.user_id)
			.then(user => {
				if (!user) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				return user.destroy();
			})
			.then(() => res.status(200).end())
			.catch(next);
	}

};
