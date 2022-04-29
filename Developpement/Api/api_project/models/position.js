const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class Position extends Sequelize.Model {
        static associate(db) {
            Position.belongsTo(db.Travel);
        }
    }

    Position.init({
        date: DataTypes.DATE,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'Position'
    });

    return Position;

};
