const position_ctrl = require('../controllers/position');
const user_ctrl = require("../controllers/user");

module.exports = [

    {
        url: '/position',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            position_ctrl.get_all,
        ],
    },
    {
        url: '/position',
        method: 'post',
        func: [
            user_ctrl.identify_client,
            position_ctrl.create,
        ],
    },
    {
        url: '/position/:position_id',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            position_ctrl.get_by_id,
        ],
    },
    {
        url: '/position/:position_id',
        method: 'put',
        func: [
            user_ctrl.identify_client,
            position_ctrl.update_by_id,
        ],
    },
    {
        url: '/position/:position_id',
        method: 'delete',
        func: [
            user_ctrl.identify_client,
            position_ctrl.delete_by_id,
        ],
    }

];
