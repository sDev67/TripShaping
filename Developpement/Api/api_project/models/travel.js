const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Travel extends Sequelize.Model {
		static associate(db) {

			Travel.hasMany(bd.Task, {onDelete: 'cascade'});
			Travel.hasMany(db.Label, {onDelete: 'cascade'});
			Travel.hasMany(db.Point, { onDelete: 'cascade' });
			Travel.hasMany(db.Step, { onDelete: 'cascade' });
			Travel.hasMany(db.Route, { onDelete: 'cascade' });
			Travel.hasMany(db.Member, { onDelete: 'cascade' });
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
