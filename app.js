const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const restaurantRoutes = require('./routes/restaurant');
const menuRoutes = require('./routes/menu');
const menuCategoryRoutes = require('./routes/menuCategory');
const menuItemRoutes = require('./routes/menuItem');
const reservationRoutes = require('./routes/reservation');  // Add reservation routes

dotenv.config();

const app = express();

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant API',
      version: '1.0.0',
      description: 'API documentation for the Restaurant Management System',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the route files (with JSDoc comments)
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Use Swagger UI for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Allow frontend origin

// Routes
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/menus', menuRoutes);
app.use('/menu-categories', menuCategoryRoutes);
app.use('/menu-items', menuItemRoutes);
app.use('/reservations', reservationRoutes);  // Add reservations routes

// Sync database and start server
sequelize.sync({ alter: true })
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.error('Database sync error:', err));
