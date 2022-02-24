const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Label extends Sequelize.Model {
		static associate(db) {
			Label.ManyToMany(db.Task, {through : 'LabelTask'} );
		}
	}

	Label.init({
		title: DataTypes.STRING,

	}, {
		sequelize,
		modelName: 'Label'
	});

	return Label;

};
