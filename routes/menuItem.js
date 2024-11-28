const express = require('express');
const router = express.Router();
const { MenuItem, MenuCategory } = require('../models');

// Create a new menu item
router.post('/', async (req, res) => {
  const { name, price, description, image, menu_category_id } = req.body;

  try {
    const category = await MenuCategory.findByPk(menu_category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const menuItem = await MenuItem.create({ name, price, description, image, menu_category_id });
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get menu items by category ID
router.get('/:menu_category_id', async (req, res) => {
  const { menu_category_id } = req.params;

  try {
    const menuItems = await MenuItem.findAll({ where: { menu_category_id } });
    if (menuItems.length === 0) {
      return res.status(404).json({ message: 'No items found for this category' });
    }

    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
