const doc_ctrl = require('../controllers/documents');



module.exports = [

    {
        url: '/document',
        method: 'get',
        func: doc_ctrl.get_all
    },
    {
        url: '/document/file/:document_id',
        method: 'get',
        func: doc_ctrl.disp_file_by_id
    },
    {
        url: '/document/check/:document_title',
        method: 'get',
        func: doc_ctrl.checkFileExistRoute
    },
    {
        url: '/document',
        method: 'post',
        func: [doc_ctrl.upload, doc_ctrl.create]
    },
    {
        url: '/document/:document_id',
        method: 'get',
        func: doc_ctrl.get_by_id
    },
    {
        url: '/document/:document_id',
        method: 'delete',
        func: doc_ctrl.delete_document_by_id
    },

];



