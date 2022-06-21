const photo_ctrl = require('../controllers/photo');
const user_ctrl = require("../controllers/user");

module.exports = [

    {
        url: '/photo',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            photo_ctrl.get_all,
        ],
    },
    {
        url: '/photo/file/:photo_id',
        method: 'get',
        func: [
            photo_ctrl.disp_file_by_id,
        ],
    },
    {
        url: '/photo/check/:photo_title',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            photo_ctrl.checkFileExistRoute,
        ],
    },
    {
        url: '/photo',
        method: 'post',
        func: [
            user_ctrl.identify_client,
            photo_ctrl.upload,
            photo_ctrl.create
        ],
    },
    {
        url: '/photo/:photo_id',
        method: 'get',
        func: [
            user_ctrl.identify_client,
            photo_ctrl.get_by_id,
        ],
    },
    {
        url: '/photo/:photo_id',
        method: 'delete',
        func: [
            user_ctrl.identify_client,
            photo_ctrl.delete_photo_by_id,
        ],
    }
];
