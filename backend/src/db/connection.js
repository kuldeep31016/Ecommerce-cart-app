const mongoose = require('mongoose');

let connectingPromise = null;

function redactUri(uri) {
  if (!uri) return '<undefined>';
  try {
    const u = new URL(uri);
    if (u.password) u.password = '***';
    return `${u.protocol}//${u.username ? u.username + ':***@' : ''}${u.host}${u.pathname}`;
  } catch {
    return '<redacted>';
  }
}

const connectDB = async (retries = 5, delayMs = 1000) => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (connectingPromise) return connectingPromise;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is not set. Please define it in backend/.env');
    process.exit(1);
  }

  // Enhanced connection options for stability
  const options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 5,
    maxIdleTimeMS: 30000,
  };

  mongoose.connection.on('connected', () => {
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  // Handle process termination gracefully
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });

  connectingPromise = (async () => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Connecting to MongoDB (${attempt}/${retries}) -> ${redactUri(uri)}`);
        await mongoose.connect(uri, options);
        connectingPromise = null;
        return mongoose.connection;
      } catch (error) {
        console.error(`MongoDB connect failed (${attempt}):`, error.message);
        if (attempt === retries) {
          console.error('Exceeded MongoDB connection retries. Exiting.');
          process.exit(1);
        }
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  })();

  return connectingPromise;
};

module.exports = connectDB;