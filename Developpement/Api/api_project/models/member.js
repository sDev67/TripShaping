const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Member extends Sequelize.Model {
		static associate(db) {
			Member.belongsTo(db.Travel);
			Member.belongsTo(db.User);

			Member.hasMany(db.Expense);
			Member.hasMany(db.JournalEntry);
		}
	}

	Member.init({
		name: DataTypes.STRING,
		fictive: DataTypes.BOOLEAN,

	}, {
		sequelize,
		modelName: 'Member'
	});

	return Member;

};
