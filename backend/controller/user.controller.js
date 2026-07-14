import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
/**
 * Register a new user with Clerk
 * Clerk handles authentication, we store user data in MongoDB
 */
export const register = async (req, res, next) => {
  try {
    const { email, username, clerkId } = req.body;
    // Validate required fields
    if (!email || !username || !clerkId) {
      return res.status(400).json({
        success: false,
        message: "Email, username, and clerkId are required",
      });
    }
    // Check if user already exists in database
    const existingUser = await User.findOne({
      $or: [{ email }, { Username: username }, { clerkId }],
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email or username",
      });
    }
    // Create new user in MongoDB
    const newUser = new User({
      Username: username,
      email,
      clerkId,
      password: "", // Clerk handles password, not stored in our DB
      notifications: {
        emailNotifications: true,
        pushNotifications: false,
        marketingEmails: false,
        dataCollection: true,
      },
    });
    // Save user to database
    await newUser.save();
    // Generate JWT token for backend session
    const token = jwt.sign(
      { userId: newUser._id, clerkId, email },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "7d" },
    );
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.Username,
        email: newUser.email,
        clerkId: newUser.clerkId,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    next(error);
  }
};
/**
 * Login user (Clerk handles the auth, we verify and issue JWT)
 * This endpoint is called after Clerk verifies the user
 */
export const login = async (req, res, next) => {
  try {
    const { clerkId, email } = req.body;

    // Validate required fields
    if (!clerkId || !email) {
      return res.status(400).json({
        success: false,
        message: "Clerk ID and email are required",
      });
    }
    // Find user in database by clerkId
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }
    // Verify email matches
    if (user.email !== email) {
      return res.status(401).json({
        success: false,
        message: "Email mismatch",
      });
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, clerkId, email: user.email },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "7d" },
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.Username,
        email: user.email,
        clerkId: user.clerkId,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};
/**
 * Get user profile
 */
export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?.userId; // From JWT middleware
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    next(error);
  }
};
/**
 * Update user profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user?.userId; // From JWT middleware
    const { username, notifications } = req.body;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const updateData = {};
    if (username) {
      // Check if username is already taken by another user
      const existingUser = await User.findOne({
        Username: username,
        _id: { $ne: userId },
      });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Username already taken",
        });
      }
      updateData.Username = username;
    }
    if (notifications) {
      updateData.notifications = {
        ...notifications,
      };
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    next(error);
  }
};

/**
 * Logout user (mainly for frontend cleanup)
 */
export const logout = async (req, res, next) => {
  try {
    // JWT is stateless, logout is handled on frontend by removing token
    // Optionally, you can invalidate token on backend using a blacklist

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    next(error);
  }
};
