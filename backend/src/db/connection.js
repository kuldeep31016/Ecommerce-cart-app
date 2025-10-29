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

  mongoose.connection.on('connected', () => {
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  });
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
  });
  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  connectingPromise = (async () => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Connecting to MongoDB (${attempt}/${retries}) -> ${redactUri(uri)}`);
        await mongoose.connect(uri);
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