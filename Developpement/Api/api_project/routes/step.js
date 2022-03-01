const step_ctrl = require('../controllers/step');

module.exports = [

	{
		url: '/step',
		method: 'get',
		func: step_ctrl.get_all
	},
	{
		url: '/step',
		method: 'post',
		func: step_ctrl.create
	},
	{
		url: '/step/:step_id',
		method: 'get',
		func: step_ctrl.get_by_id
	},
	{
		url: '/step/:step_id',
		method: 'put',
		func: step_ctrl.update_by_id
	},
	{
		url: '/step/:step_id',
		method: 'delete',
		func: step_ctrl.delete_by_id
	}

];
