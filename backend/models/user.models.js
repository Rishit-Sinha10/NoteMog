import bcrypt from "bcrypt";
import mongoose, { Mongoose } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    Username: {
      required: true,
      unique: true,
      lowercase: true,
      type: String,
      default: "",
    },
    email: {
      required: true,
      unique: true,
      lowercase: true,
      type: String,
      default: "",
    },
    password: {
      required: false,
      type: String,
      default: "",
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    notifications: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      pushNotifications: {
        type: Boolean,
        default: false,
      },
      marketingEmails: {
        type: Boolean,
        default: false,
      },
      dataCollection: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true },
);
export const User = mongoose.model("User", userSchema);
