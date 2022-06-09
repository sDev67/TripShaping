const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Travel extends Sequelize.Model {
		static associate(db) {

			Travel.hasMany(db.Task, { onDelete: 'cascade' });
			Travel.hasMany(db.Label, { onDelete: 'cascade' });
			Travel.hasMany(db.Point, { onDelete: 'cascade' });
			Travel.hasMany(db.Step, { onDelete: 'cascade' });
			Travel.hasMany(db.Route, { onDelete: 'cascade' });
			Travel.hasMany(db.Member, { onDelete: 'cascade' });
			Travel.hasMany(db.Expense, { onDelete: 'cascade' });
			Travel.hasMany(db.Document, { onDelete: 'cascade' });
			Travel.hasMany(db.Photo, { onDelete: 'cascade' });
			Travel.hasMany(db.Position, { onDelete: 'cascade' });
			Travel.hasMany(db.JournalEntry, { onDelete: 'cascade' });
		}
	}

	Travel.init({
		name: DataTypes.STRING,
		picture: DataTypes.TEXT,
		status: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
		},
		infos: DataTypes.STRING,
		infosHTML: DataTypes.TEXT,
		toPublish: {
			type: Sequelize.BOOLEAN,
			defaultValue: 1,
		},
		positionAgree: {
			type: Sequelize.BOOLEAN,
			defaultValue: 1,
		},
		startDate: DataTypes.DATE
	}, {
		sequelize,
		modelName: 'Travel'
	});

	return Travel;

};
