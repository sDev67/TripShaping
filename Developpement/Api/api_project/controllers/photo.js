const db = require('../models');

const multer = require("multer")
const fs = require('fs');
const chm = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'photos')
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const checkFileExist = (nameOfFile) => {
    if (fs.readFileSync("photos/" + nameOfFile)) {
        // path exists
        return true;
    } else {
        return false;
    }
}

const checkFileExistRoute = async (req, res, next) => {
    db.Photo.findAll({
        attributes: [
            'title'
        ],
        where: {
            title: req.params.photo_title
        }
    }).
        then(resp => {
            // si l'id du document souhaité n'existe pas
            if (resp == "") {
                return res.json({ exist: "0" })
            }
            else {
                // on récupère le chemin du fichier 
                var nameOfFile = req.params.photo_title;
                if (fs.readFileSync("photos/" + nameOfFile)) {
                    // path exists
                    // true 1
                    return res.json({ exist: "1" })
                } else {
                    // false 0
                    return res.json({ exist: "0" })
                }
            }
        }
        ).catch(next);
}

const upload = multer({
    storage: storage,
    limits: { fieldSize: 2 * 1024 * 1024 }
}).single('title')

const get_all = async (req, res, next) => {
    return await db.Photo.findAll({})
        .then(photo => res.json(photo))
        .catch(next);
};

const get_by_id = async (req, res, next) => {
    return await db.Photo.findByPk(req.params.photo_id)
        .then(photo => {
            if (!photo) {
                throw { status: 404, message: 'Requested Photo not found' };
            }
            return res.json(photo);
        })
        .catch(next);
};

const disp_file_by_id = async (req, res, next) => {
    db.Photo.findAll({
        attributes: [
            'title'
        ],
        where: {
            id: req.params.photo_id
        }
    }).
        then(resp => {
            // si l'id du document souhaité n'existe pas
            if (resp == "") {
                res.status(404).send('Id of Photo does not exist');
            }
            else {
                // on récupère le chemin du fichier 
                var filePath = "photos/" + resp[0].title;
                // on récupère son extension
                let extension = filePath.substring(filePath.indexOf('.') + 1);
                fs.readFile(filePath, function (err, data) {
                    if (extension == 'pdf') {
                        res.contentType("application/pdf");
                        res.send(data);
                    }
                    else if (extension == 'png' || extension == 'PNG' || extension == 'jpg' || extension == 'JPG' || extension == 'jpeg' || extension == 'JPEG') {
                        res.contentType("image/" + extension);
                        res.send(data);
                    }
                });
            }
        });
};

const create = async (req, res) => {
    try {
        db.Photo.create({
            dataFile: req.body.dataFile,
            StepId: req.body.StepId,
            TravelId: req.body.TravelId,
            RouteId: req.body.RouteId,
            PointId: req.body.PointId,
            date: req.body.date,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        })
            .then((image) => {
                return res.send(`Photo has been uploaded.`);
            });
    } catch (error) {
        return res.send(`Error when trying upload photos: ${error}`);
    }
}

const delete_photo_by_id = async (req, res, next) => {
    return db.Photo.findByPk(req.params.photo_id)
        .then(photo => {
            if (!photo) {
                throw { status: 404, message: 'Requested Photo not found' };
            }
            return photo.destroy();
        })
        .then(resp => {
            let fileName = resp['dataValues'].title;
            if (checkFileExist(fileName) == true) {
                fs.unlink('photos/' + fileName, (err) => {
                    if (err) {
                        throw err;
                    }
                })
                res.status(200).end('Photo : ' + fileName + ' was deleted successfully')
            }
        }).catch((e) => {
            res.status(404).send('Probleme here : ' + e.message);
        })
}


module.exports = {
    get_all,
    checkFileExistRoute,
    create,
    get_by_id,
    disp_file_by_id,
    delete_photo_by_id,
    upload
};