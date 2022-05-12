const bcrypt = require("bcrypt");
const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Sequelize.Model {
    static associate(db) {

      User.hasMany(db.Travel);
      User.hasMany(db.Member, { onDelete: 'cascade' });

    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: DataTypes.STRING
    }, {
    sequelize,
    modelName: 'User'
  });

  User.generate_hash = (password) => bcrypt.hashSync(password, 10);

  User.prototype.toJSON = function () {
    const data = Object.assign({}, this.get());
    delete data.password;
    return data;
  };

  User.prototype.check_password = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
