#!/bin/bash

echo "🚀 Sumou Education Complex - Deployment Script"
echo "=============================================="
echo ""

echo "📦 Installing server dependencies..."
npm install

echo "📦 Installing client dependencies..."
cd client && npm install && cd ..

echo "🗄️ Initializing database..."
node server/scripts/initDb.js

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "  Terminal 1: npm run dev"
echo "  Terminal 2: npm run client"
echo ""
echo "Server: http://localhost:5000"
echo "Client: http://localhost:5173"
echo ""
echo "📧 Default Login:"
echo "  Email: admin@sumou.edu"
echo "  Password: Admin123!"
