const express = require('express');
const router = express.Router();
const { MenuCategory, Menu } = require('../models');

// Create a new menu category
router.post('/', async (req, res) => {
  const { name, menu_id } = req.body;

  try {
    const menu = await Menu.findByPk(menu_id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    const menuCategory = await MenuCategory.create({ name, menu_id });
    res.status(201).json(menuCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get menu categories by menu ID
router.get('/:menu_id', async (req, res) => {
  const { menu_id } = req.params;

  try {
    const categories = await MenuCategory.findAll({ where: { menu_id } });
    if (categories.length === 0) {
      return res.status(404).json({ message: 'No categories found for this menu' });
    }

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
