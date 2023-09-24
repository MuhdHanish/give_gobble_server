"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRoute = exports.ngoRoutes = exports.restaurantRotues = exports.adminRoutes = exports.userRoutes = void 0;
const userRoutes_1 = __importDefault(require("./userRoutes"));
exports.userRoutes = userRoutes_1.default;
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
exports.adminRoutes = adminRoutes_1.default;
const restaurantRoutes_1 = __importDefault(require("./restaurantRoutes"));
exports.restaurantRotues = restaurantRoutes_1.default;
const ngoRoutes_1 = __importDefault(require("./ngoRoutes"));
exports.ngoRoutes = ngoRoutes_1.default;
const tokenRoutes_1 = __importDefault(require("./tokenRoutes"));
exports.tokenRoute = tokenRoutes_1.default;
