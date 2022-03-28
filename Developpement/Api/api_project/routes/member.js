const member_ctrl = require('../controllers/member');

module.exports = [

	{
		url: '/members',
		method: 'get',
		func: member_ctrl.get_all
	},
	{
		url: '/member',
		method: 'post',
		func: member_ctrl.create
	},
	{
		url: '/member/:member_id',
		method: 'get',
		func: member_ctrl.get_by_id
	},
	{
		url: '/member/:member_id',
		method: 'put',
		func: member_ctrl.update_by_id
	},
	{
		url: '/member/:member_id',
		method: 'delete',
		func: member_ctrl.delete_by_id
	}

];
