import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    noteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
    mode: {
      required: true,
      default: "auto",
      lowercase: true,
      type: String,
    },
    ShortSummary: {
      required: true,
      default: "",
      lowercase: true,
      type: String,
    },
    KeyPoints: {
      required: true,
      default: "",
      lowercase: true,
      type: String,
    },
    terms: {
      required: true,
      default: "",
      lowercase: true,
      type: String,
    },
  },
  { timestamps: true },
);

export const Summary = mongoose.model("Summary", SummarySchema);
