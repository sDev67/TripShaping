const db = require('../models');

const multer = require("multer")
const fs = require('fs');
const chm = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'resources')
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const checkFileExist = (nameOfFile) => {

    if (fs.readFileSync("resources/" + nameOfFile)) {
        // path exists

        return true;
    } else {
        return false;

    }

}

const checkFileExistRoute = async (req, res, next) => {


    db.Document.findAll({
        attributes: [
            'title'
        ],
        where: {
            title: req.params.document_title
        }
    }).
        then(resp => {
            // si l'id du document souhaité n'existe pas
            if (resp == "") {
                return res.json({ exist: "0" })
            }

            else {
                // on récupère le chemin du fichier 
                var nameOfFile = req.params.document_title;

                if (fs.readFileSync("resources/" + nameOfFile)) {
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
}).single('title')


const get_all = async (req, res, next) => {
    return await db.Document.findAll({
        attributes: { exclude: ['dataFile'] }
    })
        .then(document => res.json(document))
        .catch(next);
};

const get_by_id = async (req, res, next) => {
    return await db.Document.findByPk(req.params.document_id)
        .then(doc => {
            if (!doc) {
                throw { status: 404, message: 'Document inexistant / non trouvé' };
            }
            return res.json(doc);
        })
        .catch(next);
};

const disp_file_by_id = async (req, res, next) => {


    db.Document.findAll({
        attributes: [
            'title'
        ],
        where: {
            id: req.params.document_id
        }
    }).
        then(resp => {
            // si l'id du document souhaité n'existe pas
            if (resp == "") {
                res.status(404).send('Document inexistant');
            }

            else {
                // on récupère le chemin du fichier 
                var filePath = "resources/" + resp[0].title;

                // on récupère son extension afin d'afficher soit un pdf soit une image
                let extension = filePath.substring(filePath.indexOf('.') + 1);


                fs.readFile(filePath, function (err, data) {
                    if (extension == 'pdf' || extension == 'PDF') {
                        res.contentType("application/pdf");
                        res.send(data);
                    }
                    else if (extension == 'png' || extension == 'PNG' ||
                        extension == 'jpg' || extension == 'JPG' ||
                        extension == 'jpeg' || extension == 'JPEG') {
                        res.contentType("image/" + extension);
                        res.send(data);
                    }

                });
            }


        });

};

const create = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.send(`Vous devez sélectionner un fichier !`);
        }

        db.Document.create({
            title: req.file.originalname,
            typeFile: req.file.mimetype,
            dataFile: fs.readFileSync(
                "resources/" + req.file.filename
            ),
            StepId: req.body.StepId,
            TravelId: req.body.TravelId,
            RouteId: req.body.RouteId,
            PointId: req.body.PointId

        })
            .then((image) => {
                // fs.writeFileSync(
                //     "resources/" + image.name,
                //     image.dataFile
                // );
                return res.send(`Fichier importé correctement !`);
            });


    } catch (error) {
        return res.send(`Erreur lors de l'upload du document : ${error}`);
    }
}

const delete_document_by_id = async (req, res, next) => {

    return db.Document.findByPk(req.params.document_id)
        .then(doc => {
            if (!doc) {
                throw { status: 404, message: 'Document inexistant / non trouvé' };
            }
            return doc.destroy();
        })
        .then(resp => {

            let fileName = resp['dataValues'].title;

            if (checkFileExist(fileName) == true) {
                fs.unlink('resources/' + fileName, (err) => {
                    if (err) {
                        throw err;
                    }
                })
                res.status(200).end('Fichier : ' + fileName + ' a été supprimé correctement !')
            }

        }).catch((e) => {
            res.status(404).send('Oups petit problème : ' + e.message);

        })

}

module.exports = {
    get_all,
    checkFileExistRoute,
    create,
    get_by_id,
    disp_file_by_id,
    delete_document_by_id,
    upload

}