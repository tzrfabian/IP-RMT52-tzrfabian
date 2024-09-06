'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Image, { foreignKey: 'userId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: `Username already taken!`
      },
      validate: {
        notNull: {
          msg: 'Username is required!'
        },
        notEmpty: {
          msg: 'Username is required!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exist!'
      },
      validate: {
        notNull: {
          msg: 'Email is required!'
        },
        notEmpty: {
          msg: 'Email is required!'
        },
        isEmail: {
          args: true,
          msg: 'Wrong email format!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required!'
        },
        notEmpty: {
          msg: 'Password is required!'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password);
  });
  return User;
};