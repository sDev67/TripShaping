const travel_ctrl = require('../controllers/travel');

module.exports = [

	{
		url: '/travel',
		method: 'get',
		func: travel_ctrl.get_all
	},
	{
		url: '/travel',
		method: 'post',
		func: travel_ctrl.create
	},
	{
		url: '/travel/:travel_id',
		method: 'get',
		func: travel_ctrl.get_by_id
	},
	{
		url: '/travel/:travel_id/points',
		method: 'get',
		func: travel_ctrl.get_points_of_travel
	},
	{
		url: '/travel/:travel_id',
		method: 'put',
		func: travel_ctrl.update_by_id
	},
	{
		url: '/travel/:travel_id',
		method: 'delete',
		func: travel_ctrl.delete_by_id
	}

];
