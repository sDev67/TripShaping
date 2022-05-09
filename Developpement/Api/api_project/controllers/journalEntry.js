const db = require('../models');

module.exports = {

    get_all: (req, res, next) => {
        return db.JournalEntry.findAll({
            order: ['date']
        })
            .then(journalEntrys => res.json(journalEntrys))
            .catch(next);
    },

    load_by_id: (req, res, next) => {
        return db.JournalEntry.findByPk(req.params.journalEntry_id)
            .then(journalEntry => {
                if (!journalEntry) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                req.journalEntry = journalEntry;
                return next();
            })
            .catch(next);
    },

    get_by_id: (req, res, next) => {
        return db.JournalEntry.findByPk(req.params.journalEntry_id)
            .then(journalEntry => {
                if (!journalEntry) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                return res.json(journalEntry);
            })
            .catch(next);
    },

    create: (req, res, next) => {
        return db.JournalEntry.create(req.body)
            .then(journalEntry => res.json(journalEntry))
            .catch(next);
    },

    update_by_id: (req, res, next) => {
        return db.JournalEntry.findByPk(req.params.journalEntry_id)
            .then(journalEntry => {
                if (!journalEntry) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                Object.assign(journalEntry, req.body);
                return journalEntry.save();
            })
            .then(journalEntry => res.json(journalEntry))
            .catch(next);
    },

    delete_by_id: (req, res, next) => {
        return db.JournalEntry.findByPk(req.params.journalEntry_id)
            .then(journalEntry => {
                if (!journalEntry) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                return journalEntry.destroy();
            })
            .then(() => res.status(200).end())
            .catch(next);
    }

};