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
        dataFile: DataTypes.BLOB("long"),
        date: DataTypes.STRING,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT
    }, {
        sequelize,
        modelName: 'Photo'
    });

    return Photo;

};
