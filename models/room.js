'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reservedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reservedWith: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reservedFrom: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      reservedTo: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'rooms',
      modelName: 'Room',
    }
  );
  return Room;
};
