const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Point extends Sequelize.Model {
		static associate(db) {
			Point.belongsTo(db.Travel, { onDelete: 'cascade' });
			Point.belongsTo(db.Step);

			Point.hasMany(db.Document, { onDelete: 'cascade' });
			Point.hasMany(db.Photo, { onDelete: 'cascade' });

		}
	}

	Point.init({
		title: DataTypes.STRING,
		latitude: DataTypes.FLOAT,
		longitude: DataTypes.FLOAT,
		description: DataTypes.STRING,
		descriptionHTML: DataTypes.TEXT,
		category: DataTypes.STRING,
		day: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Point'
	});

	return Point;

};
