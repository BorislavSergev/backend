const express = require('express');
const router = express.Router();
const { Reservation, User, Restaurant, MenuItem } = require('../models');

// Create a new reservation
router.post('/', async (req, res) => {
  try {
    const { user_id, restaurant_id, reservation_date, items } = req.body;

    // Ensure the user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure the restaurant exists
    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Ensure the items exist and calculate total sum
    let total_sum = 0;
    const orderedItems = [];
    for (let item of items) {
      const menuItem = await MenuItem.findByPk(item.menu_item_id);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item with id ${item.menu_item_id} not found` });
      }

      const totalPrice = menuItem.price * item.quantity;
      total_sum += totalPrice;

      // Add ordered item to list
      orderedItems.push({
        menu_item_id: menuItem.id,
        quantity: item.quantity,
        total_price: totalPrice,
      });
    }

    // Create the reservation
    const reservation = await Reservation.create({
      user_id,
      restaurant_id,
      reservation_date,
      total_sum,
      items: orderedItems,  // Store ordered items in the JSON field
    });

    // Add menu items to the reservation
    for (let item of orderedItems) {
      await reservation.addMenuItem(item.menu_item_id, { through: { quantity: item.quantity, total_price: item.total_price } });
    }

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all reservations for a user
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const reservations = await Reservation.findAll({
      where: { user_id },
      include: [{ model: Restaurant }, { model: MenuItem }],
    });

    if (!reservations.length) {
      return res.status(404).json({ message: 'No reservations found' });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
