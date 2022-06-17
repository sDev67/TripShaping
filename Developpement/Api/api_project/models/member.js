const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Member extends Sequelize.Model {
		static associate(db) {
			Member.belongsTo(db.Travel, { onDelete: 'cascade' });
			Member.belongsTo(db.User, { onDelete: 'cascade' });

			Member.hasMany(db.Expense, { onDelete: 'cascade' });
			Member.hasMany(db.JournalEntry, { onDelete: 'cascade' });
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
