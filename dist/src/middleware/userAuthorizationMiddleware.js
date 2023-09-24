"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenUtils_1 = __importDefault(require("../utils/tokenUtils"));
const userAuthorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            let token = req.headers.authorization.split(" ")[1];
            const { id, role } = tokenUtils_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
            if (role === "user" || "restaurant") {
                req.userInfo = { id, role };
                next();
            }
            else {
                return res.status(403).json({ message: "Access Forbidden" });
            }
        }
        catch (err) {
            return res.status(403).json({ message: "Access Forbidden" });
        }
    }
    else {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
});
exports.default = userAuthorization;
