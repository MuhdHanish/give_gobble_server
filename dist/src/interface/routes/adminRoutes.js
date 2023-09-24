"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controllers
const loginController_1 = __importDefault(require("../controllers/admin/adminAuthentication/loginController"));
const ngoVerifyController_1 = require("../controllers/admin/ngoVerifyController");
const getRequestedNgosController_1 = __importDefault(require("../controllers/admin/getRequestedNgosController"));
// middlewares
const middleware_1 = require("../../middleware");
// validator middlewares
const requestValidator_1 = require("../../middleware/requestValidator");
const router = (0, express_1.Router)();
// POST login
router.post("/login", requestValidator_1.loginValidator, loginController_1.default);
// GET 
router.get("/get/ngo/requests", middleware_1.adminAuthorization, getRequestedNgosController_1.default);
// PATCH 
router.patch("/accept/ngo/:id([0-9a-fA-F]{24})", middleware_1.adminAuthorization, ngoVerifyController_1.acceptNgoController);
router.patch("/reject/ngo/:id([0-9a-fA-F]{24})", middleware_1.adminAuthorization, ngoVerifyController_1.rejectNgoController);
exports.default = router;
