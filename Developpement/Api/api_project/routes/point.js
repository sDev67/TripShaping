const point_ctrl = require('../controllers/point');

module.exports = [

	{
		url: '/point',
		method: 'get',
		func: point_ctrl.get_all
	},
	{
		url: '/point',
		method: 'post',
		func: point_ctrl.create
	},
	{
		url: '/point/:point_id',
		method: 'get',
		func: point_ctrl.get_by_id
	},
	{
		url: '/point/:point_id',
		method: 'put',
		func: point_ctrl.update_by_id
	},
	{
		url: '/point/:point_id',
		method: 'delete',
		func: point_ctrl.delete_by_id
	}

];
