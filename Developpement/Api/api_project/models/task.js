const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Task extends Sequelize.Model {
		static associate(db) {
			Task.belongsTo(db.Travel);
			Task.hasMany(db.TaskLabel);
		}
	}

	Task.init({
		title: DataTypes.STRING,
		date: DataTypes.DATEONLY,

	}, {
		sequelize,
		modelName: 'Task'
	});

	return Task;

};
