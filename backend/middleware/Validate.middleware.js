// Backend/middleware/validation.js
import { body, validationResult } from "express-validator";
import { AppError } from "./errorhandler.js";

/**
 * Validate user registration with Clerk
 * Clerk handles password validation, we only validate username & email
 */
export const validateRegister = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Username must be 2-50 characters")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Username can only contain letters, numbers, underscore, and hyphen",
    ),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("clerkId").trim().notEmpty().withMessage("Clerk ID required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        new AppError(
          errors
            .array()
            .map((e) => e.msg)
            .join("; "),
          400,
        ),
      );
    } else {
      next();
    }
  },
];

/**
 * Validate user login with Clerk
 * Only validate email and clerkId (Clerk handles password)
 */
export const validateLogin = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email required")
    .normalizeEmail(),

  body("clerkId").trim().notEmpty().withMessage("Clerk ID required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        new AppError(
          errors
            .array()
            .map((e) => e.msg)
            .join("; "),
          400,
        ),
      );
    } else {
      next();
    }
  },
];

export const validateExpense = [
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description required")
    .isLength({ max: 500 })
    .withMessage("Max 500 characters"),

  body("amount")
    .isFloat({ min: 0.01, max: 1000000 })
    .withMessage("Valid amount required"),

  body("categoryId")
    .notEmpty()
    .withMessage("Category required")
    .isMongoId()
    .withMessage("Invalid category"),

  body("date").optional().isISO8601().withMessage("Valid date required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        new AppError(
          errors
            .array()
            .map((e) => e.msg)
            .join("; "),
          400,
        ),
      );
    } else {
      next();
    }
  },
];
