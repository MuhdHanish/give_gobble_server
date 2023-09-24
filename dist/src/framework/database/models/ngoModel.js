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
exports.ngoModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ngoSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "ngo" },
    isVerified: { type: Boolean, required: true, default: false },
    status: { type: Boolean, required: true, default: true },
    ngoType: { type: String, required: true },
    pincode: { type: Number, required: true },
    address: { type: String, required: true },
    isRejected: { type: Boolean, required: true, default: false },
    profile: {
        type: String,
        required: true,
        default: "https://cdn-icons-png.flaticon.com/128/3842/3842881.png",
    },
});
exports.ngoModel = mongoose_1.default.connection.model("Ngo", ngoSchema);
