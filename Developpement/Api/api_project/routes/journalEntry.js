const journal_entry_ctrl = require('../controllers/journal_entry');

module.exports = [

    {
        url: '/journal_entry',
        method: 'get',
        func: journal_entry_ctrl.get_all
    },
    {
        url: '/journal_entry',
        method: 'post',
        func: journal_entry_ctrl.create
    },
    {
        url: '/journal_entry/:journal_entry_id',
        method: 'get',
        func: journal_entry_ctrl.get_by_id
    },
    {
        url: '/journal_entry/:journal_entry_id',
        method: 'put',
        func: journal_entry_ctrl.update_by_id
    },
    {
        url: '/journal_entry/:journal_entry_id',
        method: 'delete',
        func: journal_entry_ctrl.delete_by_id
    }

];
