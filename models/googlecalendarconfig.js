'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GoogleCalendarConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GoogleCalendarConfig.init(
    {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      calendarId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'googleCalendarConfigs',
      modelName: 'GoogleCalendarConfig',
    }
  );
  return GoogleCalendarConfig;
};
