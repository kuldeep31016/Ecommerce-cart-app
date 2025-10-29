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
    category: "men's clothing",
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
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.",
    category: "Electronics",
    stock: 25
  },
  {
    name: "Nike Air Max Sneakers",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    description: "Comfortable running shoes with air cushioning technology.",
    category: "men's clothing",
    stock: 80
  },
  {
    name: "MacBook Pro 14-inch",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
    description: "Powerful laptop with M3 chip, 16GB RAM, and 512GB SSD.",
    category: "Electronics",
    stock: 15
  },
  {
    name: "Women's Leather Handbag",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
    description: "Elegant leather handbag with multiple compartments and adjustable strap.",
    category: "women's clothing",
    stock: 45
  },
  {
    name: "Gaming Mechanical Keyboard",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop",
    description: "RGB backlit mechanical keyboard with blue switches for gaming.",
    category: "Electronics",
    stock: 60
  },
  {
    name: "Diamond Engagement Ring",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
    description: "Beautiful 1-carat diamond ring in 14k white gold setting.",
    category: "jewelery",
    stock: 5
  },
  {
    name: "Wireless Gaming Mouse",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    description: "High-precision wireless gaming mouse with customizable RGB lighting.",
    category: "Electronics",
    stock: 90
  },
  {
    name: "Women's Summer Dress",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop",
    description: "Flowy summer dress perfect for casual outings and events.",
    category: "women's clothing",
    stock: 70
  },
  {
    name: "Men's Leather Wallet",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop",
    description: "Premium leather wallet with RFID blocking and multiple card slots.",
    category: "men's clothing",
    stock: 120
  },
  {
    name: "Smart Watch Series 9",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500&h=500&fit=crop",
    description: "Advanced smartwatch with health monitoring and GPS tracking.",
    category: "Electronics",
    stock: 40
  },
  {
    name: "Vintage Gold Necklace",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
    description: "Elegant vintage-style gold necklace with intricate design.",
    category: "jewelery",
    stock: 20
  },
  {
    name: "Men's Denim Jeans",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    description: "Classic straight-fit denim jeans in dark wash.",
    category: "men's clothing",
    stock: 85
  },
  {
    name: "Wireless Earbuds Pro",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
    description: "True wireless earbuds with active noise cancellation and wireless charging.",
    category: "Electronics",
    stock: 95
  },
  {
    name: "Women's High Heels",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop",
    description: "Elegant high heel shoes perfect for formal occasions.",
    category: "women's clothing",
    stock: 35
  },
  {
    name: "Silver Bracelet",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
    description: "Sterling silver bracelet with modern minimalist design.",
    category: "jewelery",
    stock: 30
  },
  {
    name: "Gaming Headset",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=500&fit=crop",
    description: "Professional gaming headset with 7.1 surround sound and noise-canceling mic.",
    category: "Electronics",
    stock: 55
  },
  {
    name: "Men's Casual Shirt",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
    description: "Comfortable cotton casual shirt available in multiple colors.",
    category: "men's clothing",
    stock: 110
  },
  {
    name: "4K Webcam",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&h=500&fit=crop",
    description: "Ultra HD 4K webcam with auto-focus and built-in microphone.",
    category: "Electronics",
    stock: 40
  }
];
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