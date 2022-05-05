const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class Document extends Sequelize.Model {
        static associate(db) {
            Document.belongsTo(db.Step);
            Document.belongsTo(db.Travel);
            Document.belongsTo(db.Route);
            Document.belongsTo(db.Point);
        }
    }

    Document.init({
        title: DataTypes.STRING,
        typeFile: DataTypes.STRING,
        dataFile: DataTypes.BLOB("long")
    }, {
        sequelize,
        modelName: 'Document'
    });

    return Document;

};
