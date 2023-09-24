"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenUtils_1 = __importDefault(require("../utils/tokenUtils"));
const ngoAuthorization = (req, res, next) => {
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            let token = req.headers.authorization.split(" ")[1];
            const { role, id } = tokenUtils_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
            if (role == "ngo") {
                req.userInfo = { id, role };
                next();
            }
            else {
                return res.status(403).json({ message: "Un-Authorized, access forbidden" });
            }
        }
        else {
            return res.status(401).json({ message: "No authorization token found" });
        }
    }
    catch (err) {
        return res.status(403).json({ message: "Access forbidden, Invalid token" });
    }
};
exports.default = ngoAuthorization;
