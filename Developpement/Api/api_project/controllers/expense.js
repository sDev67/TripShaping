const db = require('../models');

module.exports = {

    get_all: (req, res, next) => {
        return db.Expense.findAll({
            order: ['date']
        })
            .then(expenses => res.json(expenses))
            .catch(next);
    },

    load_by_id: (req, res, next) => {
        return db.Expense.findByPk(req.params.expense_id)
            .then(expense => {
                if (!expense) {
                    throw { status: 404, message: 'Dépense inexistante / introuvable' };
                }
                req.expense = expense;
                return next();
            })
            .catch(next);
    },

    get_by_id: (req, res, next) => {
        return db.Expense.findByPk(req.params.expense_id)
            .then(expense => {
                if (!expense) {
                    throw { status: 404, message: 'Dépense inexistante / introuvable' };
                }
                return res.json(expense);
            })
            .catch(next);
    },

    create: (req, res, next) => {
        return db.Expense.create(req.body)
            .then(expense => res.json(expense))
            .catch(next);
    },

    update_by_id: (req, res, next) => {
        return db.Expense.findByPk(req.params.expense_id)
            .then(expense => {
                if (!expense) {
                    throw { status: 404, message: 'Dépense inexistante / introuvable' };
                }
                Object.assign(expense, req.body);
                return expense.save();
            })
            .then(expense => res.json(expense))
            .catch(next);
    },

    delete_by_id: (req, res, next) => {
        return db.Expense.findByPk(req.params.expense_id)
            .then(expense => {
                if (!expense) {
                    throw { status: 404, message: 'Dépense inexistante / introuvable' };
                }
                return expense.destroy();
            })
            .then(() => res.status(200).end())
            .catch(next);
    }

};