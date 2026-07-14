import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    title: {
      required: true,
      default: "",
      type: String,
      lowercase: true,
      index: true,
    },
    date: {
      required: true,
      default: 0,
      type: Number,
    },
    durationmins: {
      required: true,
      default: 0,
      type: Number,
    },
    status: {
      required: true,
      default: "active",
      type: String,
      enum: ["active", "inactive"],
    },
    rawText: {
      required: true,
      default: "",
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Note = mongoose.model("Note", NoteSchema);
