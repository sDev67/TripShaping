const task_ctrl = require('../controllers/task');

module.exports = [

	{
		url: '/task',
		method: 'get',
		func: task_ctrl.get_all
	},
	{
		url: '/task',
		method: 'post',
		func: task_ctrl.create
	},
	{
		url: '/task/:task_id',
		method: 'get',
		func: task_ctrl.get_by_id
	},
	{
		url: '/task/:task_id',
		method: 'put',
		func: task_ctrl.update_by_id
	},
	{
		url: '/task/:task_id',
		method: 'delete',
		func: task_ctrl.delete_by_id
	}

];
