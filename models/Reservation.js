const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Restaurant = require('./Restaurant');
const MenuItem = require('./MenuItem');  // Import MenuItem model

const Reservation = sequelize.define('Reservation', {
  reservation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reservation_made_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW, // Automatically sets the date when reservation is made
  },
  total_sum: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON,  // Store ordered menu items and their quantities in a JSON format
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',  // Status can be "pending", "confirmed", "cancelled"
  },
}, { timestamps: true });

// Relationships
Reservation.belongsTo(User, { foreignKey: 'user_id' });
Reservation.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
Reservation.belongsToMany(MenuItem, { through: 'ReservationMenuItems', foreignKey: 'reservation_id' });

module.exports = Reservation;
