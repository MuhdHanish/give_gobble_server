"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controllers
const loginController_1 = __importDefault(require("../controllers/ngo/ngoAuthnetication/loginController"));
const removeAccountController_1 = __importDefault(require("../controllers/ngo/ngoAuthnetication/removeAccountController"));
const stepOneController_1 = __importDefault(require("../controllers/ngo/ngoAuthnetication/signupController/stepOneController"));
const stepTwoController_1 = __importDefault(require("../controllers/ngo/ngoAuthnetication/signupController/stepTwoController"));
const resetNgoPasswordController_1 = __importDefault(require("../controllers/ngo/ngoAuthnetication/resetNgoPasswordController"));
const getRequestsController_1 = require("../controllers/foodRequestManage/getRequestsController");
const manageRequestsController_1 = require("../controllers/foodRequestManage/manageRequestsController");
const forgotNgoPasswordController_1 = __importDefault(require("../controllers/ngo/ngoAuthnetication/forgotNgoPasswordController"));
// middlewares
const otpAuthMiddleware_1 = __importDefault(require("../../middleware/otpAuthMiddleware"));
const otpPasswordVerifyMiddelware_1 = __importDefault(require("../../middleware/otpPasswordVerifyMiddelware"));
// validator middlewares
const requestValidator_1 = require("../../middleware/requestValidator");
const middleware_1 = require("../../middleware");
const getAllAcceptedNgosControlle_1 = __importDefault(require("../controllers/ngo/getAllAcceptedNgosControlle"));
const messageController_1 = require("../controllers/message/messageController");
const router = (0, express_1.Router)();
// POST signup
router.post("/register/stepone", requestValidator_1.signupValidatorOne, stepOneController_1.default);
router.post("/register/steptwo/:id", requestValidator_1.ngoSignupTow, otpAuthMiddleware_1.default, stepTwoController_1.default);
// POST login
router.post("/login", requestValidator_1.loginValidator, loginController_1.default);
// GET get requests
router.get("/get/pending/requests", middleware_1.ngoAuthorization, getRequestsController_1.getPendingRequestsContorller);
router.get("/get/accepted/requests", middleware_1.ngoAuthorization, getRequestsController_1.getAcceptedRequestsController);
router.get("/get/completed/requests", middleware_1.ngoAuthorization, getRequestsController_1.getCompletedRequestsController);
router.get("/get/all/accepted/ngos", middleware_1.ngoAuthorization, getAllAcceptedNgosControlle_1.default);
// GET messages
router.get("/get/all/messages", middleware_1.ngoAuthorization, messageController_1.getAllMessagesController);
// POST message
router.post("/post/new/message", middleware_1.ngoAuthorization, requestValidator_1.sendMessageValidator, messageController_1.sendMessageController);
router.get("/get/selected/request/:id([0-9a-fA-F]{24})", middleware_1.ngoAuthorization, getRequestsController_1.getSelectedRequestController);
// PATCH account
router.patch("/remove/account/:id([0-9a-fA-F]{24})", middleware_1.ngoAuthorization, removeAccountController_1.default);
// PATCH requests
router.patch("/accept/request/:id([0-9a-fA-F]{24})", middleware_1.ngoAuthorization, manageRequestsController_1.acceptRequestController);
router.patch("/complete/request/:id([0-9a-fA-F]{24})", middleware_1.ngoAuthorization, manageRequestsController_1.completeRequestController);
// POST Forgot password request
router.post("/forgot/password", requestValidator_1.forgotPasswordValidator, forgotNgoPasswordController_1.default);
// POST Verify password request
router.post("/verify/password/request/:id", otpPasswordVerifyMiddelware_1.default);
// PATCH Reset Password
router.patch("/reset/password", requestValidator_1.loginValidator, resetNgoPasswordController_1.default);
exports.default = router;
