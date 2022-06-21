const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Step extends Sequelize.Model {
		static associate(db) {
			//Step.OneToMany(db.Task, {through : 'TaskStep'} );
			Step.belongsTo(db.Travel, { onDelete: 'cascade' });
			Step.hasMany(db.Point, { onDelete: 'cascade' });
			Step.hasMany(db.Document, { onDelete: 'cascade' });
			Step.hasMany(db.Photo, { onDelete: 'cascade' });
		}
	}

	Step.init({
		title: DataTypes.STRING,
		description: DataTypes.STRING,
		descriptionHTML: DataTypes.TEXT,
		latitude: DataTypes.FLOAT,
		longitude: DataTypes.FLOAT,
		duration: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: 'Step'
	});

	return Step;

};

