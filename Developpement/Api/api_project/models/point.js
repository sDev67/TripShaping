const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Point extends Sequelize.Model {
		static associate(db) {
			Point.ManyToOne(db.Travel, {through : 'TravelPoint'} );
		}
	}

	Point.init({
		title: DataTypes.STRING,
		latitude: DataTypes.FLOAT,
		longitude: DataTypes.FLOAT,
		description : DataTypes.STRING,
		category: DataTypes.STRING

	}, {
		sequelize,
		modelName: 'Point'
	});

	return Point;

};
