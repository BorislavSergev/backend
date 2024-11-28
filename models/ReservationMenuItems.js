const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReservationMenuItems = sequelize.define('ReservationMenuItems', {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, { timestamps: false });  // No need for timestamps in junction table

module.exports = ReservationMenuItems;
