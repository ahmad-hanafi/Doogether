'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sessions.belongsTo(models.User, {foreignKey: 'userID'})
    }
  };
  Sessions.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        }
    }},
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description cannot be empty"
        }
    }},
    start:  {
      type: DataTypes.DATE,
      validate: {
        ischeckDate() {
          const today = new Date()
          if(this.start <= today) {
            throw new Error("Date must more than today")
          }
        },
    }},
    duration: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Duration cannot be empty"
        }
    }},
    userID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }
  }, {
    sequelize,
    modelName: 'Sessions',
  });
  return Sessions;
};