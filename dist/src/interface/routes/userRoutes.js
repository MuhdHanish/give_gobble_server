"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controllers
const stepOneController_1 = __importDefault(require("../controllers/user/userAuthenticationControllers/signupController/stepOneController"));
const stepTwoController_1 = __importDefault(require("../controllers/user/userAuthenticationControllers/signupController/stepTwoController"));
const resetUserPasswordController_1 = __importDefault(require("../controllers/user/userAuthenticationControllers/resetUserPasswordController"));
const loginController_1 = __importDefault(require("../controllers/user/userAuthenticationControllers/loginController"));
const postRequestController_1 = __importDefault(require("../controllers/foodRequestManage/postRequestController"));
const forgotUserPasswordController_1 = __importDefault(require("../controllers/user/userAuthenticationControllers/forgotUserPasswordController"));
const historyController_1 = require("../controllers/foodRequestManage/historyController/historyController");
// middlewares
const middleware_1 = require("../../middleware");
const otpAuthMiddleware_1 = __importDefault(require("../../middleware/otpAuthMiddleware"));
const otpPasswordVerifyMiddelware_1 = __importDefault(require("../../middleware/otpPasswordVerifyMiddelware"));
// validator middlewares
const requestValidator_1 = require("../../middleware/requestValidator");
const router = (0, express_1.Router)();
// GET Inital get
router.get("/", (req, res) => { return res.sendStatus(200); });
// POST user signup
router.post("/register/stepone", requestValidator_1.signupValidatorOne, stepOneController_1.default);
router.post("/register/steptwo/:id", requestValidator_1.signupValidatorTwo, otpAuthMiddleware_1.default, stepTwoController_1.default);
// POST login
router.post("/login", requestValidator_1.loginValidator, loginController_1.default);
// POST Food Requeset
router.post("/post/food/request", middleware_1.userAuthorization, postRequestController_1.default);
// POST Forgot password request
router.post("/forgot/password", requestValidator_1.forgotPasswordValidator, forgotUserPasswordController_1.default);
// POST Verify password request
router.post("/verify/password/request/:id", otpPasswordVerifyMiddelware_1.default);
// PATCH Reset Password
router.patch("/reset/password", requestValidator_1.loginValidator, resetUserPasswordController_1.default);
// GET Request history
router.get("/get/request/history/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, historyController_1.getRequestHistoryController);
// DELETE Remove request
router.delete("/delete/request/history/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, historyController_1.removeRequestFromHistoryController);
router.delete("/delete/all/request/history/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, historyController_1.removeAllRequestFromHistoryController);
exports.default = router;
