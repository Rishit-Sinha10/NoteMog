import { Note } from "../models/note.model.js";
import { AppError } from "../middleware/errorhandler.js";
/**
 * Create a new note
 * POST /api/v1/edit/note
 */
export const createNote = async (req, res, next) => {
  try {
    const userId = req.auth?.userId; // From Clerk middleware
    const { title, subjectId, rawText, durationmins } = req.body;
    // Validate required fields
    if (!title || !rawText) {
      return next(new AppError("Title and content are required", 400));
    }
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }
    const newNote = new Note({
      userId,
      subjectId: subjectId || null,
      title,
      rawText,
      durationmins: durationmins || 0,
      status: "active",
      date: new Date().getTime(),
    });
    await newNote.save();
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: newNote,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Get all notes for authenticated user
 * GET /api/v1/edit/note
 */
export const getNotes = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }
    const { subjectId, status, limit = 10, skip = 0 } = req.query;
    const filter = { userId };
    if (subjectId) filter.subjectId = subjectId;
    if (status) filter.status = status;
    const notes = await Note.find(filter)
      .populate("subjectId", "Subject color")
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });
    const total = await Note.countDocuments(filter);
    res.status(200).json({
      success: true,
      data: notes,
      pagination: { total, limit: parseInt(limit), skip: parseInt(skip) },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific note by ID
 * GET /api/v1/edit/note/:id
 */
export const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const note = await Note.findOne({ _id: id, userId })
      .populate("subjectId", "Subject color");

    if (!note) {
      return next(new AppError("Note not found", 404));
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a note
 * PUT /api/v1/edit/note/:id
 */
export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;
    const { title, rawText, subjectId, status, durationmins } = req.body;
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }
    const note = await Note.findOne({ _id: id, userId });
    if (!note) {
      return next(new AppError("Note not found or unauthorized", 404));
    }
    // Update fields
    if (title) note.title = title;
    if (rawText) note.rawText = rawText;
    if (subjectId) note.subjectId = subjectId;
    if (status) note.status = status;
    if (durationmins !== undefined) note.durationmins = durationmins;
    await note.save();
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a note
 * DELETE /api/v1/edit/note/:id
 */
export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;
    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }
    const note = await Note.findOneAndDelete({ _id: id, userId });
    if (!note) {
      return next(new AppError("Note not found or unauthorized", 404));
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
