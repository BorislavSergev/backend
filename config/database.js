const { Sequelize } = require('sequelize');
require('dotenv').config(); // Loads environment variables from .env file

// Get the values from environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres', // Set the dialect to PostgreSQL
  logging: false, // Disable logging of SQL queries (optional)
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  }
});

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

module.exports = sequelize;
