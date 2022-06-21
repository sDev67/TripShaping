const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class Position extends Sequelize.Model {
        static associate(db) {
            Position.belongsTo(db.Member, { onDelete: 'cascade' });
            Position.belongsTo(db.Travel, { onDelete: 'cascade' });
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
