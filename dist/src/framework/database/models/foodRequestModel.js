"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodRequestModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const foodRequestSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, required: true },
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    userRole: { type: String, required: true },
    isAccepted: { type: Boolean, required: true, default: false },
    status: { type: String, required: true, default: "Pending" },
    image: {
        type: String,
        required: true,
        default: "https://sandinmysuitcase.com/wp-content/uploads/2021/01/Popular-Indian-Food-Dishes.jpg.webp",
    },
});
exports.foodRequestModel = mongoose_1.default.connection.model("FoodRequest", foodRequestSchema);
