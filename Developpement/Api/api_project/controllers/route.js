const db = require('../models');

module.exports = {

    get_all: (req, res, next) => {
        return db.Route.findAll({
            order: ['id']
        })
            .then(route => res.json(route))
            .catch(next);
    },

    load_by_id: (req, res, next) => {
        return db.Route.findByPk(req.params.route_id)
            .then(route => {
                if (!route) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                req.route = route;
                return next();
            })
            .catch(next);
    },

    get_by_id: (req, res, next) => {
        return db.Route.findByPk(req.params.route_id)
            .then(route => {
                if (!route) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                return res.json(route);
            })
            .catch(next);
    },

    create: (req, res, next) => {
        return db.Route.create(req.body)
            .then(route => res.json(route))
            .catch(next);
    },

    update_by_id: (req, res, next) => {
        return db.Route.findByPk(req.params.route_id)
            .then(route => {
                if (!route) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                Object.assign(route, req.body);
                return route.save();
            })
            .then(route => res.json(route))
            .catch(next);
    },

    delete_by_id: (req, res, next) => {
        return db.Route.findByPk(req.params.route_id)
            .then(route => {
                if (!route) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                return route.destroy();
            })
            .then(() => res.status(200).end())
            .catch(next);
    }

};