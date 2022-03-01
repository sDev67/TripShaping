const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Task extends Sequelize.Model {
		static associate(db) {
			Task.ManyToMany(db.Label, {through : 'LabelTask'} );
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
