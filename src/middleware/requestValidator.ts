import { body } from "express-validator";

export const loginValidator = [
  body("identifier").notEmpty().withMessage("Identifier is required (name or email)"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const signupValidatorOne = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email address"),
];

export const signupValidatorTwo = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("location").notEmpty().withMessage("Location is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const restaurantSignupOne = [
  body("restaurantname").notEmpty().withMessage("restaurant is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email address"),
];

export const restaurantSignupTwo = [
  body("restaurantname").notEmpty().withMessage("restaurant is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("location").notEmpty().withMessage("Location is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
