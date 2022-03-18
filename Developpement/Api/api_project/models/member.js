const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Member extends Sequelize.Model {

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
