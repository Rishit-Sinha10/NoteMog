import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    weekStartDate: {
      type: Number,
      default: 0,
      required: true,
    },
    constraints: {
      type: String,
      default: "",
      required: true,
    },
  },
  { timestamps: true },
);

export const plan = mongoose.model("Plan", planSchema);
