import express from "express";
import cors from "cors";
import Noteroute from "./route/note.route.js";
import Planroute from "./route/Plan.route.js";
import Subjectroute from "./route/subject.route.js";
import Taskroute from "./route/Task.route.js";
import Userroute from "./route/user.route.js";
import Summaryroute from "./route/Summary.route.js";
import { errorHandler } from "./middleware/errorhandler.js";
import mongoose from "mongoose";
import { clerkMiddleware } from "../backend/middleware/Auth.middleware.js";

export const app = express();

// CORS configuration for development
const corsOptions = {
  origin: [
    "http://localhost:5173", // Vite default
    "http://localhost:3000", // Backend port
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    process.env.FRONTEND_URL || "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk middleware for authentication
app.use(clerkMiddleware());

// Debug middleware - log all incoming requests
app.use((req, res, next) => {
  console.log(`📨 [BACKEND] ${req.method} ${req.originalUrl}`);
  console.log(`   Headers:`, {
    auth: req.headers.authorization ? "✅ Present" : "❌ Missing",
    contentType: req.headers["content-type"],
  });
  next();
});

// API Routes - v1
app.use("/api/v1/auth", Userroute);
app.use("/api/v1/notes", Noteroute);
app.use("/api/v1/plans", Planroute);
app.use("/api/v1/subjects", Subjectroute);
app.use("/api/v1/tasks", Taskroute);
app.use("/api/v1/summaries", Summaryroute);

// Root route - API welcome
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NoteMog API - Backend Service",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/v1/auth",
      notes: "/api/v1/notes",
      tasks: "/api/v1/tasks",
      plans: "/api/v1/plans",
      subjects: "/api/v1/subjects",
      summaries: "/api/v1/summaries",
    },
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NoteMog API is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 handler - must be before error handler
app.use((req, res) => {
  console.error(`❌ [404] Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: {
      health: "GET /api/health",
      auth: "GET|POST /api/v1/auth/*",
      notes: "GET|POST|PUT|DELETE /api/v1/notes*",
      tasks: "GET|POST|PUT|DELETE /api/v1/tasks*",
      plans: "GET|POST|PUT|DELETE /api/v1/plans*",
      subjects: "GET|POST|PUT|DELETE /api/v1/subjects*",
      summaries: "GET|POST|PUT|DELETE /api/v1/summaries*",
    },
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);
