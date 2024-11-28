const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Menu = require('./Menu'); // Import Menu model

const MenuCategory = sequelize.define('MenuCategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { timestamps: true });

MenuCategory.belongsTo(Menu, { foreignKey: 'menu_id' });

module.exports = MenuCategory;
