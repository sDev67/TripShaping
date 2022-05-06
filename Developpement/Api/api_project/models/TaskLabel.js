const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class TaskLabel extends Sequelize.Model {
        static associate(db) {
            TaskLabel.belongsTo(db.Task);
            TaskLabel.belongsTo(db.Label);
        }
    }

    TaskLabel.init({
    }, {
        sequelize,
        modelName: 'TaskLabel'
    });

    return TaskLabel;

};
