const expense_ctrl = require('../controllers/expense');
const user_ctrl = require("../controllers/user");

module.exports = [

    {
        url: '/expense',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            expense_ctrl.get_all,
        ],
    },
    {
        url: '/expense',
        method: 'post',
        func: [
            user_ctrl.identify_client,
            expense_ctrl.create,
        ],
    },
    {
        url: '/expense/:expense_id',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            expense_ctrl.get_by_id,
        ],
    },
    {
        url: '/expense/:expense_id',
        method: 'put',
        func: [
            user_ctrl.identify_client,
            expense_ctrl.update_by_id,
        ],
    },
    {
        url: '/expense/:expense_id',
        method: 'delete',
        func: [
            user_ctrl.identify_client,
            expense_ctrl.delete_by_id,
        ],
    }

];
