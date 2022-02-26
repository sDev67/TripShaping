const label_ctrl = require('../controllers/label');

module.exports = [

	{
		url: '/label',
		method: 'get',
		func: label_ctrl.get_all
	},
	{
		url: '/label',
		method: 'post',
		func: label_ctrl.create
	},
	{
		url: '/label/:label_id',
		method: 'get',
		func: label_ctrl.get_by_id
	},
	{
		url: '/label/:label_id',
		method: 'put',
		func: label_ctrl.update_by_id
	},
	{
		url: '/label/:label_id',
		method: 'delete',
		func: label_ctrl.delete_by_id
	}

];
