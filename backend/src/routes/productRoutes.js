const express = require('express');
const { getProducts, getProductById, getCategories } = require('../controllers/productController');

const router = express.Router();

// @route   GET /api/products/categories
// @desc    Get all categories
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', getProductById);

module.exports = router;