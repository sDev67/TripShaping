const photo_ctrl = require('../controllers/photo');

module.exports = [

    {
        url: '/photo',
        method: 'get',
        func: photo_ctrl.get_all
    },
    {
        url: '/photo/file/:photo_id',
        method: 'get',
        func: photo_ctrl.disp_file_by_id
    },
    {
        url: '/photo/check/:photo_title',
        method: 'get',
        func: photo_ctrl.checkFileExistRoute
    },
    {
        url: '/photo',
        method: 'post',
        func: [photo_ctrl.upload, photo_ctrl.create]
    },
    {
        url: '/photo/:photo_id',
        method: 'get',
        func: photo_ctrl.get_by_id
    },
    {
        url: '/photo/:photo_id',
        method: 'delete',
        func: photo_ctrl.delete_photo_by_id
    }
];
