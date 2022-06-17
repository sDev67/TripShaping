const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class Route extends Sequelize.Model {
        static associate(db) {
            Route.belongsTo(db.Step, { foreignKey: 'start' }, { onDelete: 'cascade' });
            Route.belongsTo(db.Step, { foreignKey: 'finish' }, { onDelete: 'cascade' });
            Route.belongsTo(db.Travel, { foreignKey: 'TravelId' });

            Route.hasMany(db.Document, { onDelete: 'cascade' });
            Route.hasMany(db.Photo, { onDelete: 'cascade' });


        }
    }

    Route.init({
        travelType: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Route'
    });

    return Route;

};