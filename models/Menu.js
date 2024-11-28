const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Restaurant = require('./Restaurant'); // Import Restaurant model

const Menu = sequelize.define('Menu', {
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { timestamps: true });

Menu.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

module.exports = Menu;
