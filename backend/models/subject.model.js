import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    color: {
      required: true,
      type: String,
      default: "",
    },
    Subject: {
      required: true,
      type: String,
      default: "",
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true },
);

export const Subject = mongoose.model("Subject", subjectSchema);
