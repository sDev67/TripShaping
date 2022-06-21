const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class JournalEntry extends Sequelize.Model {
        static associate(db) {
            JournalEntry.belongsTo(db.Travel, { onDelete: 'cascade' });
            JournalEntry.belongsTo(db.Member, { onDelete: 'cascade' });
            JournalEntry.belongsTo(db.Step, { onDelete: 'cascade' });
            JournalEntry.belongsTo(db.Point, { onDelete: 'cascade' });
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
