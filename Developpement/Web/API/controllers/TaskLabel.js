const db = require('../models');

module.exports = {

	get_all_label_by_task_id: (req, res, next) => {

        return req.task.getLabels({
            order: ['title'],
            where
        })
            .then(labels => res.json(labels))
            .catch(next);
    },

	get_all_task_by_label_id: (req, res, next) => {
		return req.label.getTasks({
			order: ['title']
		})
			.then(label => res.json(label))
			.catch(next);
	},

	add_label_id_by_task_id: (req, res, next) => 
    {
		return req.task.addLabel(req.label)
			.then(res.status(200).send("Label ajouté"))
			.catch(next);
	},

	delete_label_id_by_task_id: (req, res, next) => {
		return req.person.removeLabel(req.label)

			.then(res.status(200).send("Label supprimé"))
			.catch(next);
	},


};
