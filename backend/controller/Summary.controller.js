import { Summary } from "../models/Summary.model.js";
import { AppError } from "../middleware/errorhandler.js";

/**
 * Create a new summary (typically from AI processing)
 * POST /api/v1/Summary
 */
export const createSummary = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;
    const { noteId, mode, shortSummary, keyPoints, terms } = req.body;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    if (!noteId || !shortSummary) {
      return next(
        new AppError("noteId and shortSummary are required", 400),
      );
    }

    const newSummary = new Summary({
      UserId: userId,
      noteId,
      mode: mode || "auto",
      ShortSummary: shortSummary,
      KeyPoints: keyPoints || "",
      terms: terms || "",
    });

    await newSummary.save();

    res.status(201).json({
      success: true,
      message: "Summary created successfully",
      data: newSummary,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all summaries for authenticated user
 * GET /api/v1/Summary
 */
export const getSummaries = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const { noteId, limit = 10, skip = 0 } = req.query;

    const filter = { UserId: userId };
    if (noteId) filter.noteId = noteId;

    const summaries = await Summary.find(filter)
      .populate("noteId", "title rawText")
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Summary.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: summaries,
      pagination: { total, limit: parseInt(limit), skip: parseInt(skip) },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific summary by ID
 * GET /api/v1/Summary/:id
 */
export const getSummaryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const summary = await Summary.findOne({ _id: id, UserId: userId })
      .populate("noteId", "title rawText");

    if (!summary) {
      return next(new AppError("Summary not found", 404));
    }

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a summary
 * PUT /api/v1/Summary/:id
 */
export const updateSummary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;
    const { mode, shortSummary, keyPoints, terms } = req.body;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const summary = await Summary.findOne({ _id: id, UserId: userId });

    if (!summary) {
      return next(new AppError("Summary not found or unauthorized", 404));
    }

    if (mode) summary.mode = mode;
    if (shortSummary) summary.ShortSummary = shortSummary;
    if (keyPoints) summary.KeyPoints = keyPoints;
    if (terms) summary.terms = terms;

    await summary.save();

    res.status(200).json({
      success: true,
      message: "Summary updated successfully",
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a summary
 * DELETE /api/v1/Summary/:id
 */
export const deleteSummary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const summary = await Summary.findOneAndDelete({
      _id: id,
      UserId: userId,
    });

    if (!summary) {
      return next(new AppError("Summary not found or unauthorized", 404));
    }

    res.status(200).json({
      success: true,
      message: "Summary deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
