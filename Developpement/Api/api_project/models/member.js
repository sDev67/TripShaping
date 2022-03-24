const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Member extends Sequelize.Model {
		static associate(db) {
			//Task.manyToMany(db.Label, { through: 'LabelTask' });
			Member.belongsTo(db.Travel);
		}
	}

	Member.init({
		lastname: DataTypes.STRING,
        firstname: DataTypes.STRING,
		fictive: DataTypes.BOOLEAN,

	}, {
		sequelize,
		modelName: 'Member'
	});

	return Member;

};
