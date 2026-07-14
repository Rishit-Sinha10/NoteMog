import { Task } from "../models/task.model.js";
import { AppError } from "../middleware/errorhandler.js";

/**
 * Create a new task
 * POST /api/v1/Task
 */
export const createTask = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;
    const { title, date, durationMins, subjectId, status } = req.body;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    if (!title || !date) {
      return next(new AppError("Title and date are required", 400));
    }

    const newTask = new Task({
      UserId: userId,
      SubjectId: subjectId || null,
      title,
      date,
      durationMins: durationMins || "0",
      status: status || "active",
    });

    await newTask.save();

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all tasks for authenticated user
 * GET /api/v1/Task
 */
export const getTasks = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const { subjectId, status, limit = 10, skip = 0 } = req.query;

    const filter = { UserId: userId };
    if (subjectId) filter.SubjectId = subjectId;
    if (status) filter.status = status;

    const tasks = await Task.find(filter)
      .populate("SubjectId", "Subject color")
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ date: 1 }); // Sort by date

    const total = await Task.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: tasks,
      pagination: { total, limit: parseInt(limit), skip: parseInt(skip) },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific task by ID
 * GET /api/v1/Task/:id
 */
export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const task = await Task.findOne({ _id: id, UserId: userId })
      .populate("SubjectId", "Subject color");

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a task
 * PUT /api/v1/Task/:id
 */
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;
    const { title, date, durationMins, subjectId, status } = req.body;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const task = await Task.findOne({ _id: id, UserId: userId });

    if (!task) {
      return next(new AppError("Task not found or unauthorized", 404));
    }

    if (title) task.title = title;
    if (date) task.date = date;
    if (durationMins) task.durationMins = durationMins;
    if (subjectId) task.SubjectId = subjectId;
    if (status) task.status = status;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a task
 * DELETE /api/v1/Task/:id
 */
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const task = await Task.findOneAndDelete({ _id: id, UserId: userId });

    if (!task) {
      return next(new AppError("Task not found or unauthorized", 404));
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
