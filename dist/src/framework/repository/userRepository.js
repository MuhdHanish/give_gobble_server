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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryEmpl = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepositoryEmpl = (userModel) => {
    const findByUsernameAndEmail = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userModel.find({ $or: [{ username }, { email }] }, { password: 0 }).exec();
            return users.length > 0 ? users[0].toObject() : null;
        }
        catch (error) {
            console.error("Error finding user by username and email:", error);
            return null;
        }
    });
    const findByUsernameOrEmailAndPassword = (usernameOrEmail, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel
                .findOne({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            })
                .exec();
            if (user) {
                const passwordMatch = bcryptjs_1.default.compareSync(password, user.password);
                if (passwordMatch) {
                    const _a = user.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
                    return userWithoutPassword;
                }
            }
            return null;
        }
        catch (error) {
            console.error("Error finding user by username or email and password:", error);
            return null;
        }
    });
    const findByUsernameOrEmail = (usernameOrEmail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel
                .findOne({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            })
                .exec();
            if (user) {
                const _b = user.toObject(), { password } = _b, userWithoutPassword = __rest(_b, ["password"]);
                return userWithoutPassword;
            }
            return null;
        }
        catch (error) {
            console.error("Error finding user by username or email and password:", error);
            return null;
        }
    });
    const findByUserEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel.findOne({ email }).exec();
            return user ? user.toObject() : null;
        }
        catch (error) {
            console.error("Error finding user by email:", error);
            return null;
        }
    });
    const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel.findById(userId).exec();
            if (user) {
                const _c = user.toObject(), { password } = _c, userWithoutPassword = __rest(_c, ["password"]);
                return userWithoutPassword;
            }
            return null;
        }
        catch (error) {
            console.error("Error finding restaurant by Id:", error);
            return null;
        }
    });
    const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashPass = bcryptjs_1.default.hashSync(user.password, 12);
            const newUser = {
                username: user.username,
                email: user.email,
                password: hashPass,
                location: user.location,
            };
            const createdUser = yield userModel.create(newUser);
            if (createdUser) {
                const _d = createdUser.toObject(), { password } = _d, restoredUser = __rest(_d, ["password"]);
                return restoredUser;
            }
            return null;
        }
        catch (error) {
            console.error("Error creating user:", error);
            return null;
        }
    });
    const resetUserPassword = (usernameOrEmail, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashPass = bcryptjs_1.default.hashSync(newPassword, 12);
            const user = yield userModel
                .findOneAndUpdate({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            }, { $set: { password: hashPass } }, { new: true })
                .exec();
            if (user) {
                const _e = user.toObject(), { password } = _e, restoredUser = __rest(_e, ["password"]);
                return restoredUser;
            }
            return null;
        }
        catch (error) {
            console.error("Error finding user by username or email and password:", error);
            return null;
        }
    });
    return {
        findByUsernameOrEmailAndPassword,
        findByUsernameOrEmail,
        findByUsernameAndEmail,
        resetUserPassword,
        findByUserEmail,
        findUserById,
        createUser,
    };
};
exports.userRepositoryEmpl = userRepositoryEmpl;
