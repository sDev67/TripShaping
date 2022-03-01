const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class User extends Sequelize.Model {
		static associate(db) {
			// TODO : User.OneToMany(db.Travel, {through : 'UserTravel'} );
		}
	}

	User.init({
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		picture: DataTypes.TEXT

	}, {
		sequelize,
		modelName: 'User'
	});

	return User;

};
