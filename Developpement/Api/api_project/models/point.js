const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Point extends Sequelize.Model {
		static associate(db) {
			Point.belongsTo(db.Travel);
		}
	}

	Point.init({
		title: DataTypes.STRING,
		latitude: DataTypes.FLOAT,
		longitude: DataTypes.FLOAT,
		description: DataTypes.STRING,
		category: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Point'
	});

	return Point;

};
