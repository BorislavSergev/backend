const express = require('express');
const router = express.Router();
const { Category } = require('../models');

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category by providing a name and an optional image URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Food"
 *               image_url:
 *                 type: string
 *                 example: "https://example.com/image.png"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Food"
 *                 image_url:
 *                   type: string
 *                   example: "https://example.com/image.png"
 *       400:
 *         description: Bad request (missing required fields)
 *       500:
 *         description: Internal server error
 */
// Create Category
router.post('/', async (req, res) => {
  const { name, image_url } = req.body;

  try {
    const category = await Category.create({ name, image_url });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories.
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *               example:
 *                 - id: 1
 *                   name: "Food"
 *                   description: "All food-related categories"
 *                 - id: 2
 *                   name: "Drinks"
 *                   description: "All drink-related categories"
 */
// Get All Categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
