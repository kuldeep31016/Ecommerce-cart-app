const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const seedProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    category: "Electronics",
    stock: 50
  },
  {
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    description: "Comfortable, breathable organic cotton t-shirt in various colors.",
    category: "Clothing",
    stock: 100
  },
  {
    name: "Stainless Steel Water Bottle",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
    description: "Eco-friendly stainless steel water bottle that keeps drinks cold for 24 hours.",
    category: "Lifestyle",
    stock: 75
  },
  {
    name: "Smartphone Stand",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=500&h=500&fit=crop",
    description: "Adjustable aluminum smartphone stand for desk and bedside use.",
    category: "Electronics",
    stock: 200
  },
  {
    name: "Yoga Mat",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
    description: "Non-slip yoga mat with extra cushioning for comfort during workouts.",
    category: "Fitness",
    stock: 60
  },
  {
    name: "Coffee Mug Set",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop",
    description: "Set of 4 ceramic coffee mugs with elegant design and comfortable grip.",
    category: "Kitchen",
    stock: 80
  },
  {
    name: "LED Desk Lamp",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    description: "Adjustable LED desk lamp with USB charging port and touch controls.",
    category: "Home",
    stock: 40
  },
  {
    name: "Wireless Charging Pad",
    price: 25.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    category: "Electronics",
    stock: 90
  },
  {
    name: "Canvas Backpack",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    description: "Durable canvas backpack with multiple compartments and laptop sleeve.",
    category: "Accessories",
    stock: 35
  },
  {
    name: "Essential Oil Diffuser",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=500&h=500&fit=crop",
    description: "Ultrasonic essential oil diffuser with LED lights and timer settings.",
    category: "Home",
    stock: 55
  }
];

const seedDatabase = async () => {
  // Only connect/close if we weren't already connected
  const wasDisconnected = mongoose.connection.readyState === 0; // 0 = disconnected
  try {
    if (wasDisconnected) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to MongoDB (seed)');
    }

    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log(`Database already has ${existingProducts} products. Skipping seed.`);
      return;
    }

    // Insert seed products
    await Product.insertMany(seedProducts);
    console.log('Database seeded successfully with products!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (wasDisconnected) {
      await mongoose.connection.close();
      console.log('Closed MongoDB connection (seed)');
    }
  }
};

// Run seed if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;