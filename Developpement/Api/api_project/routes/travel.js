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
		url: '/travel/:travel_id/steps',
		method: 'get',
		func: travel_ctrl.get_steps_of_travel
	},
	{
		url: '/travel/:travel_id/tasks',
		method: 'get',
		func: travel_ctrl.get_tasks_of_travel
	},
	{
		url: '/travel/:travel_id/labels',
		method: 'get',
		func: travel_ctrl.get_labels_of_travel
	},
	{
		url: '/travel/:travel_id/routes',
		method: 'get',
		func: travel_ctrl.get_routes_of_travel
	},
	{
		url: '/travel/:travel_id/members',
		method: 'get',
		func: travel_ctrl.get_members_of_travel
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
