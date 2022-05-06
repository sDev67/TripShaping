const photo_ctrl = require('../controllers/photo');

module.exports = [

    {
        url: '/photo',
        method: 'get',
        func: photo_ctrl.get_all
    },
    {
        url: '/photo',
        method: 'post',
        func: photo_ctrl.create
    },
    {
        url: '/photo/:photo_id',
        method: 'get',
        func: photo_ctrl.get_by_id
    },
    {
        url: '/photo/:photo_id',
        method: 'put',
        func: photo_ctrl.update_by_id
    },
    {
        url: '/photo/:photo_id',
        method: 'delete',
        func: photo_ctrl.delete_by_id
    }

];
