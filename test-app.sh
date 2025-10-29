#!/bin/bash

echo "🔍 Testing Vibe Commerce Application..."
echo ""

# Test if MongoDB is running
echo "1️⃣ Checking MongoDB connection..."
if mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB is not running. Please start MongoDB first."
    echo "   Run: mongod or brew services start mongodb-community"
    exit 1
fi

# Test backend API
echo ""
echo "2️⃣ Testing Backend API..."
if curl -s http://localhost:5001/api/health > /dev/null; then
    echo "✅ Backend API is running on port 5001"
    
    # Test products endpoint
    PRODUCTS=$(curl -s http://localhost:5001/api/products | jq length 2>/dev/null)
    if [ "$PRODUCTS" -gt 0 ]; then
        echo "✅ Products API working - $PRODUCTS products available"
    else
        echo "⚠️  Products API responding but no products found"
    fi
else
    echo "❌ Backend API is not running on port 5001"
    echo "   Please start with: cd backend && npm run dev"
fi

# Test frontend
echo ""
echo "3️⃣ Testing Frontend..."
if curl -s http://localhost:5174 > /dev/null; then
    echo "✅ Frontend is running on port 5174"
else
    echo "❌ Frontend is not running on port 5174"
    echo "   Please start with: cd frontend && npm run dev"
fi

echo ""
echo "🎉 Testing complete!"
echo "Visit your app at: http://localhost:5174"