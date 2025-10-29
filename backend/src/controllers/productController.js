const Product = require('../models/Product');

// @desc    Get all products with optional filtering
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort } = req.query;
    let query = {};
    
    // Category filter
    if (category) {
      query.category = { $regex: new RegExp(category, 'i') };
    }
    
    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    let productsQuery = Product.find(query);
    
    // Sorting
    if (sort) {
      switch (sort) {
        case 'price-asc':
          productsQuery = productsQuery.sort({ price: 1 });
          break;
        case 'price-desc':
          productsQuery = productsQuery.sort({ price: -1 });
          break;
        case 'name-asc':
          productsQuery = productsQuery.sort({ title: 1 });
          break;
        case 'name-desc':
          productsQuery = productsQuery.sort({ title: -1 });
          break;
        case 'newest':
          productsQuery = productsQuery.sort({ createdAt: -1 });
          break;
        default:
          break;
      }
    }
    
    const products = await productsQuery;
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      message: 'Server error while fetching products',
      error: error.message 
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    res.status(500).json({ 
      message: 'Server error while fetching product',
      error: error.message 
    });
  }
};

// @desc    Get all available categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      message: 'Server error while fetching categories',
      error: error.message 
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories
};