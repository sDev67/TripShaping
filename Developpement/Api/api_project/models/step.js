const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Step extends Sequelize.Model {
		static associate(db) {
			Step.OneToMany(db.Task, {through : 'TaskStep'} );
			Step.ManyToOne(db.Travel, {through : 'TravelStep'} );
		}
	}

	Step.init({
		title: DataTypes.STRING,
		description: DataTypes.STRING,
		latitude: DataTypes.FLOAT,
		longitude: DataTypes.FLOAT,
		category: DataTypes.STRING

	}, {
		sequelize,
		modelName: 'Step'
	});

	return Step;

};
