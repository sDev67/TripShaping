const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Label extends Sequelize.Model {
		static associate(db) {
			Label.belongsTo(db.Travel);
			Label.belongsToMany(db.Task,  {through : 'TaskLabel'}, { onDelete: 'cascade' });
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
