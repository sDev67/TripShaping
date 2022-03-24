const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Member extends Sequelize.Model {
		static associate(db) {
			//Task.manyToMany(db.Label, { through: 'LabelTask' });
		}
	}

	Member.init({
		lastname: DataTypes.STRING,
        firstname: DataTypes.STRING

	}, {
		sequelize,
		modelName: 'Member'
	});

	return Member;

};
