const task_label_ctrl = require("../controllers/TaskLabel");
const task_ctrl = require("../controllers/task");
const label_ctrl = require("../controllers/label");

module.exports = [
	{
		url: '/task/:task_id/label',
		method: 'get',
		func: [task_ctrl.load_by_id ,task_label_ctrl.get_all_label_by_task_id]
	},
	{
		url: '/task/:task_id/label/:label_id',
		method: 'get',
		func: [label_ctrl.load_by_id, task_ctrl.load_by_id ,task_label_ctrl.get_label_id_by_task_id]
	},
	{
		url: '/label/:label_id/task',
		method: 'get',
		func: [label_ctrl.load_by_id ,task_label_ctrl.get_all_task_by_label_id]
	},
	{
		url: '/task/:task_id/label/:label_id',
		method: 'post',
		func: [label_ctrl.load_by_id, task_ctrl.load_by_id, task_label_ctrl.add_label_id_by_task_id]
	},
	{
		url: '/task/:task_id/label/:label_id',
		method: 'delete',
		func: [label_ctrl.load_by_id, task_ctrl.load_by_id, task_label_ctrl.delete_label_id_by_task_id]
	},
];
