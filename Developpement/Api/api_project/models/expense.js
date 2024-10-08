const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class Expense extends Sequelize.Model {
        static associate(db) {
            Expense.belongsTo(db.Travel, { onDelete: 'cascade' });
            Expense.belongsTo(db.Member);
        }
    }

    Expense.init({
        cost: DataTypes.DOUBLE,
        to: DataTypes.STRING,
        category: DataTypes.STRING,
        date: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Expense'
    });

    return Expense;

};