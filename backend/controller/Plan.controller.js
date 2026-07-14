import { plan } from "../models/Plan.model.js";
import { AppError } from "../middleware/errorhandler.js";

/**
 * Create a new study plan
 * POST /api/v1/plan
 */
export const createPlan = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;
    const { weekStartDate, constraints } = req.body;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    if (!weekStartDate || !constraints) {
      return next(
        new AppError("weekStartDate and constraints are required", 400),
      );
    }

    const newPlan = new plan({
      userId,
      weekStartDate,
      constraints,
    });

    await newPlan.save();

    res.status(201).json({
      success: true,
      message: "Plan created successfully",
      data: newPlan,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all plans for authenticated user
 * GET /api/v1/plan
 */
export const getPlans = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const { limit = 10, skip = 0 } = req.query;

    const plans = await plan
      .find({ userId })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await plan.countDocuments({ userId });

    res.status(200).json({
      success: true,
      data: plans,
      pagination: { total, limit: parseInt(limit), skip: parseInt(skip) },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific plan by ID
 * GET /api/v1/plan/:id
 */
export const getPlanById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const Plan = await plan.findOne({ _id: id, userId });

    if (!Plan) {
      return next(new AppError("Plan not found", 404));
    }

    res.status(200).json({
      success: true,
      data: Plan,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a plan
 * PUT /api/v1/plan/:id
 */
export const updatePlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;
    const { weekStartDate, constraints } = req.body;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const Plan = await plan.findOne({ _id: id, userId });

    if (!Plan) {
      return next(new AppError("Plan not found or unauthorized", 404));
    }

    if (weekStartDate) Plan.weekStartDate = weekStartDate;
    if (constraints) Plan.constraints = constraints;

    await Plan.save();

    res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: Plan,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a plan
 * DELETE /api/v1/plan/:id
 */
export const deletePlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const Plan = await plan.findOneAndDelete({ _id: id, userId });

    if (!Plan) {
      return next(new AppError("Plan not found or unauthorized", 404));
    }

    res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
