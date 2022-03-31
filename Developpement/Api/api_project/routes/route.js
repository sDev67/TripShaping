const route_ctrl = require('../controllers/route');

module.exports = [

    {
        url: '/route',
        method: 'get',
        func: route_ctrl.get_all
    },
    {
        url: '/route',
        method: 'post',
        func: route_ctrl.create
    },
    {
        url: '/route/:route_id',
        method: 'get',
        func: route_ctrl.get_by_id
    },
    {
        url: '/route/:route_id',
        method: 'put',
        func: route_ctrl.update_by_id
    },
    {
        url: '/route/:route_id',
        method: 'delete',
        func: route_ctrl.delete_by_id
    }

];