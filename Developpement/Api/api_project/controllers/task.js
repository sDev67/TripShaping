const db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Task.findAll({
			order: ['title']
		})
			.then(task => res.json(task))
			.catch(next);
	},

	load_by_id: (req, res, next) => {
		return db.Task.findByPk(req.params.task_id)
			.then(task => {
				if (!task) {
					throw { status: 404, message: 'Tâche inexistante / introuvable' };
				}
				res.locals.task = task;
				return next();
			})
			.catch(next);
	},

	get_by_id: (req, res, next) => {
		return db.Task.findByPk(req.params.task_id)
			.then(task => {
				if (!task) {
					throw { status: 404, message: 'Tâche inexistante / introuvable' };
				}
				return res.json(task);
			})
			.catch(next);
	},

	create: (req, res, next) => {
		return db.Task.create(req.body)
			.then(task => res.json(task))
			.catch(next);
	},

	update_by_id: (req, res, next) => {
		return db.Task.findByPk(req.params.task_id)
			.then(task => {
				if (!task) {
					throw { status: 404, message: 'Tâche inexistante / introuvable' };
				}
				Object.assign(task, req.body);
				return task.save();
			})
			.then(task => res.json(task))
			.catch(next);
	},

	delete_by_id: (req, res, next) => {
		return db.Task.findByPk(req.params.task_id)
			.then(task => {
				if (!task) {
					throw { status: 404, message: 'Tâche inexistante / introuvable' };
				}
				return task.destroy();
			})
			.then(() => res.status(200).end())
			.catch(next);
	}

};
