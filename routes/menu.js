const express = require('express');
const router = express.Router();
const { Menu, Restaurant } = require('../models');

/**
 * @swagger
 * /menus:
 *   post:
 *     summary: Create a new menu for a restaurant
 *     description: Create a menu by providing the `restaurant_id` of the restaurant to which the menu belongs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurant_id
 *             properties:
 *               restaurant_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Menu created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 restaurant_id:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Restaurant not found (invalid `restaurant_id`)
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  const { restaurant_id } = req.body;

  try {
    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const menu = await Menu.create({ restaurant_id });
    res.status(201).json(menu);  // Return the created menu
  } catch (error) {
    res.status(500).json({ message: error.message });  // Return error message if something goes wrong
  }
});

/**
 * @swagger
 * /menus/{restaurant_id}:
 *   get:
 *     summary: Get menu by restaurant ID
 *     description: Retrieve the menu of a specific restaurant using its `restaurant_id`.
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         description: The ID of the restaurant to fetch the menu for.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Menu found for the restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 restaurant_id:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Menu not found for the given restaurant ID
 *       500:
 *         description: Internal server error
 */
router.get('/:restaurant_id', async (req, res) => {
  const { restaurant_id } = req.params;

  try {
    const menu = await Menu.findOne({ where: { restaurant_id } });
    
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found for this restaurant' });
    }

    res.status(200).json(menu);  // Return the found menu for the restaurant
  } catch (error) {
    res.status(500).json({ message: error.message });  // Return error message if something goes wrong
  }
});

module.exports = router;
