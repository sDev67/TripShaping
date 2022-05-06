const position_ctrl = require('../controllers/position');

module.exports = [

    {
        url: '/position',
        method: 'get',
        func: position_ctrl.get_all
    },
    {
        url: '/position',
        method: 'post',
        func: position_ctrl.create
    },
    {
        url: '/position/:position_id',
        method: 'get',
        func: position_ctrl.get_by_id
    },
    {
        url: '/position/:position_id',
        method: 'put',
        func: position_ctrl.update_by_id
    },
    {
        url: '/position/:position_id',
        method: 'delete',
        func: position_ctrl.delete_by_id
    }

];
