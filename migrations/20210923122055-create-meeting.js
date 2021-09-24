'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('meetings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      },
      reservedTo: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      inProgress: {
        type: DataTypes.STRING,
        defaultValue: 'InProgress',
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'rooms',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('meetings');
  },
};
