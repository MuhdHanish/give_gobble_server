"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngoSignupTow = exports.restaurantSignupTwo = exports.signupValidatorTwo = exports.signupValidatorOne = exports.sendMessageValidator = exports.forgotPasswordValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidator = [
    (0, express_validator_1.body)("identifier").notEmpty().withMessage("Identifier is required (username or email)"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
];
exports.forgotPasswordValidator = [
    (0, express_validator_1.body)("identifier").notEmpty().withMessage("Identifier is required (username or email)"),
];
exports.sendMessageValidator = [
    (0, express_validator_1.body)("message").notEmpty().withMessage("Message is required"),
];
exports.signupValidatorOne = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email address"),
];
exports.signupValidatorTwo = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email address"),
    (0, express_validator_1.body)("location").notEmpty().withMessage("Location is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
];
exports.restaurantSignupTwo = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Restaurant username is required"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email address"),
    (0, express_validator_1.body)("location").notEmpty().withMessage("Location is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
];
exports.ngoSignupTow = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Restaurant username is required"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email address"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.body)("ngoType").notEmpty().withMessage("Ngo Type is required"),
    (0, express_validator_1.body)("address").notEmpty().withMessage("Descripton is required"),
    (0, express_validator_1.body)("pincode").notEmpty().withMessage("Pincode is required")
];
