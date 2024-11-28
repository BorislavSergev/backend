const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const MenuCategory = require('./MenuCategory'); // Import MenuCategory model

const MenuItem = sequelize.define('MenuItem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, { timestamps: true });

// Define the relationship with the MenuCategory model
MenuItem.belongsTo(MenuCategory, { foreignKey: 'menu_category_id' });

module.exports = MenuItem;
