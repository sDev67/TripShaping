const db = require('../models');

module.exports = {

    get_all: (req, res, next) => {
        return db.Photo.findAll({
            order: ['date']
        })
            .then(photos => res.json(photos))
            .catch(next);
    },

    load_by_id: (req, res, next) => {
        return db.Photo.findByPk(req.params.photo_id)
            .then(photo => {
                if (!photo) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                req.photo = photo;
                return next();
            })
            .catch(next);
    },

    get_by_id: (req, res, next) => {
        return db.Photo.findByPk(req.params.photo_id)
            .then(photo => {
                if (!photo) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                return res.json(photo);
            })
            .catch(next);
    },

    create: (req, res, next) => {
        return db.Photo.create(req.body)
            .then(photo => res.json(photo))
            .catch(next);
    },

    update_by_id: (req, res, next) => {
        return db.Photo.findByPk(req.params.photo_id)
            .then(photo => {
                if (!photo) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                Object.assign(photo, req.body);
                return photo.save();
            })
            .then(photo => res.json(photo))
            .catch(next);
    },

    delete_by_id: (req, res, next) => {
        return db.Photo.findByPk(req.params.photo_id)
            .then(photo => {
                if (!photo) {
                    throw { status: 404, message: 'Requested Group not found' };
                }
                return photo.destroy();
            })
            .then(() => res.status(200).end())
            .catch(next);
    }

};