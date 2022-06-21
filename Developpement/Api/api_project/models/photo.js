const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class Photo extends Sequelize.Model {
        static associate(db) {
            Photo.belongsTo(db.Step);
            Photo.belongsTo(db.Travel, { onDelete: 'cascade' });
            Photo.belongsTo(db.Route);
            Photo.belongsTo(db.Point);
        }
    }

    Photo.init({
        dataFile1: DataTypes.TEXT,
        dataFile2: DataTypes.TEXT,
        date: DataTypes.STRING,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT
    }, {
        sequelize,
        modelName: 'Photo'
    });

    return Photo;

};
