const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Label extends Sequelize.Model {
		static associate(db) {
			Label.belongsTo(db.Travel);
			Label.hasMany(db.TaskLabel);
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
