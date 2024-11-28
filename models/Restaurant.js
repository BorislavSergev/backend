const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Import User model
const Category = require('./Category'); // Import Category model

const Restaurant = sequelize.define('Restaurant', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { timestamps: true });

Restaurant.belongsTo(User, { foreignKey: 'owner_id' });
Restaurant.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Restaurant;
