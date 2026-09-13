#!/bin/bash

set -e

echo ""
echo "╔═══════════════════════════════════════════════════╗"
echo "║  🎓 مجمع سمو التعليم - Setup Script             ║"
echo "║  Sumou Education Complex - Installation          ║"
echo "╚═══════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo "✅ npm $(npm --version) detected"
echo ""

# Create .env if not exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env created successfully"
else
    echo "✅ .env already exists"
fi

echo ""
echo "📦 Installing server dependencies..."
npm install

echo ""
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo ""
echo "📁 Creating necessary directories..."
mkdir -p database
mkdir -p uploads

echo ""
echo "🗄️ Initializing database..."
node server/scripts/initDb.js

echo ""
echo "╔═══════════════════════════════════════════════════╗"
echo "║          ✨ Setup Completed Successfully! ✨        ║"
echo "╚═══════════════════════════════════════════════════╝"
echo ""
echo "🚀 To start the application:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   $ npm run dev"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   $ npm run client"
echo ""
echo "📍 Access the application:"
echo "   Frontend:  http://localhost:5173"
echo "   Backend:   http://localhost:5000"
echo ""
echo "🔑 Default Credentials:"
echo "   Email:     admin@sumou.edu"
echo "   Password:  Admin123!"
echo ""
echo "📚 Documentation:"
echo "   Quick Start: QUICKSTART.md"
echo "   Full Docs:   DOCUMENTATION.md"
echo ""
