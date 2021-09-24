'use strict';
const { Model } = require('sequelize');
const { Room } = require('../models');
module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Meeting.belongsTo(models.Room, {
        as: 'room',
        foreignKey: 'roomId',
      });
    }
  }
  Meeting.init(
    {
      reservedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reservedWith: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reservedFrom: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          async reserveMeetingDate() {
            const sameDate = false,
              differentRoom = false;
            const enteredReservedFromDate = new Date(this.reservedFrom);
            const enteredReservedToDate = new Date(this.reservedTo);
            const enteredRoomId = this.roomId;
            console.log(enteredReservedFromDate, enteredReservedToDate);
            const meeting = await Meeting.findAll({
              where: {
                //reservedFrom: this.reservedFrom,
                // roomId: this.roomId,
                reservedBy: this.reservedBy,
                inProgress: 'InProgress',
              },
            });
            for (let i = 0; i < meeting.length; i++) {
              if (
                meeting[i].roomId == enteredRoomId &&
                enteredReservedToDate > meeting[i].reservedFrom &&
                enteredReservedToDate <= meeting[i].reservedTo
              ) {
                throw new Error({
                  error: 'custom',
                  message:
                    'Your meeting time have conflict with other meeting time, we suggest you to please change the meeting time',
                });
              }
              if (
                enteredReservedFromDate >= meeting[i].reservedFrom &&
                enteredReservedFromDate <= meeting[i].reservedTo
              ) {
                if (meeting.roomId != this.roomId) {
                  throw new Error({
                    error: 'custom',
                    message:
                      'You can not reserve the meeting when you already have meeting reserved at the same time in other room',
                  });
                }
                throw new Error({
                  error: 'custom',
                  message:
                    'You can not reserve the meeting in this room at this time, because there is another meeting reserved at this time',
                });
              }
              // if (meeting.length != 0 && meeting[0].roomId != this.roomId) {
              //   throw new Error(
              //     'User can attend or reserve one meeting at a time, please choose different time for meeting'
              //   );
              // }
              // if (
              //   meeting.length != 0 &&
              //   meeting[0].inProgress == 'InProgress'
              // ) {
              //   throw new Error('Meeting already exsits');
              // }
            }
          },
        },
      },
      reservedTo: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      inProgress: {
        type: DataTypes.STRING,
        defaultValue: 'InProgress',
      },
    },
    {
      sequelize,
      tableName: 'meetings',
      modelName: 'Meeting',
      hooks: {
        beforeValidate: (meetings, options) => {
          let check = true;
          meetings.reservedFrom = new Date(meetings.reservedFrom);
          Meeting.reservedFrom = meetings.reservedFrom;
          if (meetings.reservedTo == null) {
            check = false;
            const date = new Date(meetings.reservedFrom);
            const newTime = date.setHours(date.getHours() + 1);
            meetings.reservedTo = new Date(newTime);
            Meeting.reservedTo = meetings.reservedTo;
            console.log(meetings.reservedTo == Meeting.reservedTo);
          }
          if (check) {
            console.log('this condition is running as well');
            meetings.reservedTo = new Date(meetings.reservedTo);
            Meeting.reservedTo = meetings.reservedTo;
          }
        },
      },
    }
  );
  return Meeting;
};
