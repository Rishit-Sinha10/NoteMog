# 🚀 NoteMog - AI-Powered Study Planning Platform
> Transform your study routine with intelligent note organization, smart task scheduling, and AI-driven learning insights.
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](https://github.com)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-green?style=flat-square)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.6-green?style=flat-square)](https://www.mongodb.com)
[![Last Commit](https://img.shields.io/badge/last%20commit-June%202024-important?style=flat-square)](https://github.com)
---

## 📖 Overview

**NoteMog** is a modern, AI-powered study planning application designed to help students optimize their learning journey. Built with the **MERN stack** (MongoDB, Express.js, React, Node.js), NoteMog combines intelligent study plan generation, seamless note management, and real-time progress tracking into a single, intuitive platform.
Whether you're preparing for exams, organizing coursework, or building a personalized study schedule, NoteMog leverages **AI-driven insights** to create optimized learning paths tailored to your unique goals.

### 🎯 Key Highlights

- ⚡ **Lightning-fast UI** built with React + Vite
- 🤖 **AI-powered study plan generation** for personalized learning paths
- 📊 **Real-time progress tracking** with interactive dashboards
- 🔐 **Enterprise-grade authentication** using Clerk
- 🎨 **Responsive design** that works seamlessly across all devices
- 📱 **Mobile-friendly interface** for learning on-the-go

---

## ✨ Features

### 📝 **Smart Note Management**

- Create, organize, and categorize notes by subject
- Rich text editing with intuitive interface
- Quick search and filtering capabilities
- AI-generated summaries from your notes

### 📅 **Intelligent Study Planner**

- Drag-and-drop task management
- Calendar-based scheduling with visual indicators
- Priority-based task organization
- Deadline tracking and reminders
- Automatic study plan generation powered by AI

### 📊 **Progress & Analytics Dashboard**

- Real-time performance metrics
- Study time statistics
- Task completion tracking
- Visual charts and graphs for insights
- AI-driven performance suggestions

### 🎓 **Subject Management**

- Organize studies by subject or course
- Track progress per subject
- Allocate study time efficiently
- Subject-specific recommendations

### 🤖 **AI Integration**

- Automatic study plan generation based on goals
- Intelligent task prioritization
- Smart summary creation from notes
- Personalized learning recommendations

### 🔐 **Secure Authentication**

- OAuth integration with Clerk
- JWT-based session management
- Password encryption with bcrypt
- Secure user profile management

---

## 🛠️ Tech Stack

### Frontend

| Technology       | Version | Purpose                 |
| ---------------- | ------- | ----------------------- |
| **React**        | 19.2    | UI framework            |
| **Vite**         | 8.0     | Build tool & dev server |
| **Tailwind CSS** | 3.4     | Utility-first styling   |
| **React Router** | 7.15    | Client-side routing     |
| **FullCalendar** | 6.1     | Calendar widget         |
| **Chart.js**     | 4.5     | Data visualization      |
| **Clerk**        | 6.6     | Authentication          |
| **Lucide Icons** | 1.16    | Icon library            |

### Backend

| Technology        | Version     | Purpose             |
| ----------------- | ----------- | ------------------- |
| **Node.js**       | 16+         | Runtime environment |
| **Express.js**    | Latest      | REST API framework  |
| **MongoDB**       | Atlas/Local | NoSQL database      |
| **Mongoose**      | 9.6         | MongoDB ODM         |
| **JWT**           | 9.0         | Token-based auth    |
| **Bcrypt**        | 6.0         | Password hashing    |
| **Winston**       | 3.19        | Logging             |
| **Clerk Express** | 2.1         | Auth middleware     |

### Development Tools

- **ESLint** - Code quality
- **Nodemon** - Auto-reload for backend
- **PostCSS & Autoprefixer** - CSS processing

---
## ⚙️ Installation & Setup
### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**
### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/notemog.git
cd notemog
```
### Step 2: Backend Setup
```bash
# Navigate to backend directory
cd backend
# Install dependencies
npm install
# Create .env file
cp .env.example .env
# Configure environment variables (see section below)
# Edit .env with your MongoDB URI, JWT secret, etc.
# Start backend development server
npm run dev
```
The backend server will run on `http://localhost:5000` (or configured port)
### Step 3: Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend
# Install dependencies
npm install
# Create .env file (if needed)
cp .env.example .env
# Start frontend development server
npm run dev
```
The frontend will run on `http://localhost:5173` (Vite default)
### Step 4: Verify Installation
- Frontend: Open http://localhost:5173 in your browser
- Backend API: Test with `curl http://localhost:5000/api/health`
- MongoDB: Verify connection in backend console logs
---
## 🔑 Environment Variables
### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notemog
MONGODB_LOCAL=mongodb://localhost:27017/notemog
# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRY=7d
BCRYPT_ROUNDS=10
# Clerk Authentication
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_public_key
# API Configuration
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
# Logging
LOG_LEVEL=debug
LOG_DIR=./logs
# AI Integration (Future)
OPENAI_API_KEY=your_openai_api_key
AI_MODEL=gpt-3.5-turbo
```
### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=NoteMog
# Clerk Configuration
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_public_key
# Environment
VITE_ENV=development
```
**⚠️ Important:** Never commit `.env` files to version control. Add `.env` to `.gitignore`
---
## 📂 Project Structure
```
notemog/
├── frontend/                    # React + Vite frontend application
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── common/          # Navbar, Sidebar, etc.
│   │   │   ├── pages/           # Dashboard, Planner, etc.
│   │   │   ├── Landing/         # Landing page components
│   │   │   └── planner/         # Study planner components
│   │   ├── pages/               # Full page components
│   │   ├── styles/              # Global CSS & Tailwind
│   │   ├── assets/              # Images, icons, fonts
│   │   ├── App.jsx              # Main App component
│   │   └── main.jsx             # Entry point
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS config
│   └── eslint.config.js         # ESLint rules
│
├── backend/                     # Node.js + Express backend
│   ├── config/
│   │   └── config.js            # Database & app config
│   ├── models/                  # Mongoose schemas
│   │   ├── user.models.js
│   │   ├── note.model.js
│   │   ├── Plan.model.js
│   │   ├── Task.model.js
│   │   ├── Subject.model.js
│   │   └── Summary.model.js
│   ├── controllers/             # Route handlers/business logic
│   │   ├── user.controller.js
│   │   ├── note.controller.js
│   │   ├── Plan.controller.js
│   │   ├── Task.controller.js
│   │   ├── subject.controller.js
│   │   └── Summary.controller.js
│   ├── routes/                  # API route definitions
│   │   ├── user.route.js
│   │   ├── note.route.js
│   │   ├── Plan.route.js
│   │   ├── Task.route.js
│   │   ├── subject.route.js
│   │   └── Summary.route.js
│   ├── middleware/              # Custom middleware
│   │   ├── Auth.middleware.js   # JWT verification
│   │   ├── Validate.middleware.js # Input validation
│   │   └── errorhandler.js      # Error handling
│   ├── utils/
│   │   └── logger.js            # Winston logging setup
│   ├── logs/                    # Application logs
│   ├── app.js                   # Express app setup
│   ├── server.js                # Server entry point
│   ├── package.json             # Backend dependencies
│   └── .env.example             # Environment variables template
│
├── README.md                    # This file
├── PROJECT_STATUS.md            # Development progress
├── API_TEST_DATA.md             # API testing endpoints
└── ACTION_PLAN.md               # Development roadmap
```
### Folder Explanation
| Folder                      | Purpose                                        |
| --------------------------- | ---------------------------------------------- |
| **frontend/src/components** | Reusable UI components (Navbar, Cards, Modals) |
| **backend/models**          | Database schema definitions for all entities   |
| **backend/controllers**     | Business logic for handling API requests       |
| **backend/routes**          | API endpoint definitions and routing           |
| **backend/middleware**      | Authentication, validation, and error handling |
| **backend/config**          | Configuration files (DB connection, constants) |
---
## 🚀 Deployment
### Deploying Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel
# Deploy
cd frontend
vercel
```
**Vercel Environment Variables:**
```
VITE_API_URL=https://your-backend-api.com/api
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_key
```
### Deploying Frontend (Netlify)
```bash
# Build the frontend
npm run build
# Deploy (using Netlify CLI or drag-and-drop)
netlify deploy --prod --dir=dist
```
### Deploying Backend (Render / Railway)
#### Render
1. Connect your GitHub repository
2. Create new Web Service
3. Set Build Command: `npm install`
4. Set Start Command: `npm run dev` or `node server.js`
5. Add environment variables in Render dashboard
6. Deploy
#### Railway
```bash
# Install Railway CLI
npm i -g @railway/cli
# Login and deploy
railway login
railway link
railway up
```
### Deploying with Docker
#### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]
```
#### Docker Compose (for local development)
```yaml
version: "3.8"
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
```
Run with: `docker-compose up`
### Database Hosting
- **MongoDB Atlas** (Recommended - Cloud)
  - Create cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
  - Get connection string and add to `.env`
  - Free tier: 512MB storage
- **MongoDB Local** (Development only)
  - [Download MongoDB](https://www.mongodb.com/try/download/community)
  - Start MongoDB service
  - Connection: `mongodb://localhost:27017/notemog`
---
## 🤝 Contributing Guidelines
We welcome contributions from the community! Follow these steps to contribute:
### How to Contribute
1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/notemog.git
   cd notemog
   ```
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Keep commits atomic and descriptive
4. **Test your changes**
   - Frontend: `npm run lint`
   - Backend: Test API endpoints manually
5. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**
   - Describe what you changed and why
   - Link any related issues
   - Wait for review
---
<div align="center">
Made with ❤️ by [Rishit Sinha]
⭐ Star this repo if you find it helpful!
</div>
---
