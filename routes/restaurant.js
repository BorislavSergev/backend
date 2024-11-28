const express = require('express');
const router = express.Router();
const { Restaurant, User, Category } = require('../models');

// Create a new restaurant
router.post('/', async (req, res) => {
  const { name, address, owner_id, category_id } = req.body;

  try {
    const user = await User.findByPk(owner_id);
    const category = await Category.findByPk(category_id);
    
    if (!user || !category) {
      return res.status(404).json({ message: 'User or Category not found' });
    }

    const restaurant = await Restaurant.create({ name, address, owner_id, category_id });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
