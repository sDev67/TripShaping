const db = require('../models');

module.exports = {

    get_all: (req, res, next) => {
        return db.Position.findAll({
            order: ['date']
        })
            .then(positions => res.json(positions))
            .catch(next);
    },

    load_by_id: (req, res, next) => {
        return db.Position.findByPk(req.params.position_id)
            .then(position => {
                if (!position) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                req.position = position;
                return next();
            })
            .catch(next);
    },

    get_by_id: (req, res, next) => {
        return db.Position.findByPk(req.params.position_id)
            .then(position => {
                if (!position) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                return res.json(position);
            })
            .catch(next);
    },

    create: (req, res, next) => {
        return db.Position.create(req.body)
            .then(position => res.json(position))
            .catch(next);
    },

    update_by_id: (req, res, next) => {
        return db.Position.findByPk(req.params.position_id)
            .then(position => {
                if (!position) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                Object.assign(position, req.body);
                return position.save();
            })
            .then(position => res.json(position))
            .catch(next);
    },

    delete_by_id: (req, res, next) => {
        return db.Position.findByPk(req.params.position_id)
            .then(position => {
                if (!position) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                return position.destroy();
            })
            .then(() => res.status(200).end())
            .catch(next);
    }

};