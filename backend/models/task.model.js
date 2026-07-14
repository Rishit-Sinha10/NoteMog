import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    SubjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    title: {
      required: true,
      default: "",
      type: String,
    },
    date: {
      required: true,
      default: "",
      type: String,
    },
    durationMins: {
      required: true,
      default: "0",
      type: String,
    },
    status: {
      required: true,
      default: "active",
      type: String,
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true },
);

export const Task = mongoose.model("Task", TaskSchema);
