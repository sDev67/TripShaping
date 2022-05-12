const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class JournalEntry extends Sequelize.Model {
        static associate(db) {
            JournalEntry.belongsTo(db.Travel);
            JournalEntry.belongsTo(db.Member);
            JournalEntry.belongsTo(db.Step);
            JournalEntry.belongsTo(db.Point);
        }
    }

    JournalEntry.init({
        date: DataTypes.STRING,
        text: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'JournalEntry'
    });

    return JournalEntry;

};
