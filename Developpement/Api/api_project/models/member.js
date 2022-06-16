const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Member extends Sequelize.Model {
		static associate(db) {
			Member.belongsTo(db.Travel);
			Member.belongsTo(db.User);

			Member.hasMany(db.Expense);
			Member.hasMany(db.JournalEntry);
			Member.hasMany(db.Position);
		}
	}

	Member.init({
		name: DataTypes.STRING,
		userLogin: {
			type: Sequelize.STRING,
			references: {
				model: 'Users',
				key: 'username',
				allowNull: true,
				defaultValue: null,
			}
		},
		balance: {
			type: Sequelize.DOUBLE,
			defaultValue: 0,
		}
	}, {
		sequelize,
		modelName: 'Member'
	});

	return Member;

};
