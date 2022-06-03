const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Task extends Sequelize.Model {
		static associate(db) {
			Task.belongsTo(db.Travel);
			Task.belongsToMany(db.Label, { through: 'TaskLabel' })
		}
	}

	Task.init({
		title: DataTypes.STRING,
		date: DataTypes.DATEONLY,
		isDone: {
			type: Sequelize.BOOLEAN,
			defaultValue: 0,
		},

	}, {
		sequelize,
		modelName: 'Task'
	});

	return Task;

};
