"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAuthorization = exports.ngoAuthorization = exports.adminAuthorization = exports.userAuthorization = exports.otpAuthMiddleware = void 0;
const otpAuthMiddleware_1 = __importDefault(require("./otpAuthMiddleware"));
exports.otpAuthMiddleware = otpAuthMiddleware_1.default;
const userAuthorizationMiddleware_1 = __importDefault(require("./userAuthorizationMiddleware"));
exports.userAuthorization = userAuthorizationMiddleware_1.default;
const adminAuthorizationMiddleware_1 = __importDefault(require("./adminAuthorizationMiddleware"));
exports.adminAuthorization = adminAuthorizationMiddleware_1.default;
const ngoAuthorization_1 = __importDefault(require("./ngoAuthorization"));
exports.ngoAuthorization = ngoAuthorization_1.default;
const refreshAuthorization_1 = __importDefault(require("./refreshAuthorization"));
exports.refreshAuthorization = refreshAuthorization_1.default;
