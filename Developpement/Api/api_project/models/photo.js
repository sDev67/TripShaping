const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class Photo extends Sequelize.Model {
        static associate(db) {
            Photo.belongsTo(db.Step);
            Photo.belongsTo(db.Travel);
            Photo.belongsTo(db.Route);
            Photo.belongsTo(db.Point);
        }
    }

    Photo.init({
        title: DataTypes.STRING,
        typeFile: DataTypes.STRING,
        date: DataTypes.DATE,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT,
        dataFile: DataTypes.BLOB("long")
    }, {
        sequelize,
        modelName: 'Photo'
    });

    return Photo;

};
