const User = require('./User');
const Restaurant = require('./Restaurant');
const Category = require('./Category');
const Menu = require('./Menu');
const MenuCategory = require('./MenuCategory');
const MenuItem = require('./MenuItem');
const sequelize = require('../config/database');

// Define associations

// Restaurant and User (a Restaurant belongs to a User, i.e., the owner)
Restaurant.belongsTo(User, { foreignKey: 'owner_id' });
User.hasMany(Restaurant, { foreignKey: 'owner_id' }); // Optional: if you want to reference all restaurants of a user

// Restaurant and Category (a Restaurant belongs to a Category)
Restaurant.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Restaurant, { foreignKey: 'category_id' }); // Optional: if you want to reference all restaurants of a category

// Menu and Restaurant (a Menu belongs to a Restaurant)
Menu.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
Restaurant.hasMany(Menu, { foreignKey: 'restaurant_id' }); // Optional: if you want to reference all menus of a restaurant

// MenuCategory and Menu (a MenuCategory belongs to a Menu)
MenuCategory.belongsTo(Menu, { foreignKey: 'menu_id' });
Menu.hasMany(MenuCategory, { foreignKey: 'menu_id' }); // Optional: if you want to reference all categories of a menu

// MenuItem and MenuCategory (a MenuItem belongs to a MenuCategory)
MenuItem.belongsTo(MenuCategory, { foreignKey: 'menu_category_id' });
MenuCategory.hasMany(MenuItem, { foreignKey: 'menu_category_id' }); // Optional: if you want to reference all menu items in a category

// Optional: define many-to-many relationships if necessary (for example, for reservations and menu items)

module.exports = {
  User,
  Restaurant,
  Category,
  Menu,
  MenuCategory,
  MenuItem,
  sequelize,
};
