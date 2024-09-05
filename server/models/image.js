'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Image.init({
    imgName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'imgName cannot be empty!'
        },
        notEmpty: {
          msg: 'imgName cannot be empty!'
        }
      }
    },
    imgUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    prompt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};