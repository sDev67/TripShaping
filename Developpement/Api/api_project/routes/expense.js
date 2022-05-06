const expense_ctrl = require('../controllers/expense');

module.exports = [

    {
        url: '/expense',
        method: 'get',
        func: expense_ctrl.get_all
    },
    {
        url: '/expense',
        method: 'post',
        func: expense_ctrl.create
    },
    {
        url: '/expense/:expense_id',
        method: 'get',
        func: expense_ctrl.get_by_id
    },
    {
        url: '/expense/:expense_id',
        method: 'put',
        func: expense_ctrl.update_by_id
    },
    {
        url: '/expense/:expense_id',
        method: 'delete',
        func: expense_ctrl.delete_by_id
    }

];
