const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Travel extends Sequelize.Model {
		static associate(db) {

			/*
			* Travel.OneToMany(db.Point, {through : 'TravelPoint'} );
			* Travel.OneToMany(db.Task, {through : 'TravelTask'} );
			* Travel.OneToMany(db.Step, {through : 'TravelStep'} );
			* Travel.OneToMany(db.Label, {through : 'TravelLabel'} );
			.....
			*/
		}
	}

	Travel.init({
		name: DataTypes.STRING,
        picture: DataTypes.TEXT,
		activated: DataTypes.BOOLEAN,
		budget: DataTypes.DOUBLE,
		infos: DataTypes.STRING,
		finished: DataTypes.BOOLEAN

	}, {
		sequelize,
		modelName: 'Travel'
	});

	return Travel;

};
