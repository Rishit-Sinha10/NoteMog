import { Subject } from "../models/subject.model.js";
import { AppError } from "../middleware/errorhandler.js";

/**
 * Create a new subject
 * POST /api/v1/Subject
 */
export const createSubject = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;
    const { Subject: subjectName, color } = req.body;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    if (!subjectName || !color) {
      return next(new AppError("Subject name and color are required", 400));
    }

    const newSubject = new Subject({
      userId,
      Subject: subjectName,
      color,
    });

    await newSubject.save();

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: newSubject,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all subjects for authenticated user
 * GET /api/v1/Subject
 */
export const getSubjects = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const { limit = 10, skip = 0 } = req.query;

    const subjects = await Subject.find({ userId })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Subject.countDocuments({ userId });

    res.status(200).json({
      success: true,
      data: subjects,
      pagination: { total, limit: parseInt(limit), skip: parseInt(skip) },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific subject by ID
 * GET /api/v1/Subject/:id
 */
export const getSubjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const subject = await Subject.findOne({ _id: id, userId });

    if (!subject) {
      return next(new AppError("Subject not found", 404));
    }

    res.status(200).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a subject
 * PUT /api/v1/Subject/:id
 */
export const updateSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;
    const { Subject: subjectName, color } = req.body;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const subject = await Subject.findOne({ _id: id, userId });

    if (!subject) {
      return next(new AppError("Subject not found or unauthorized", 404));
    }

    if (subjectName) subject.Subject = subjectName;
    if (color) subject.color = color;

    await subject.save();

    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a subject
 * DELETE /api/v1/Subject/:id
 */
export const deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const subject = await Subject.findOneAndDelete({ _id: id, userId });

    if (!subject) {
      return next(new AppError("Subject not found or unauthorized", 404));
    }

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
