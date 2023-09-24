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
exports.ngoRepositroyEmpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ngoRepositroyEmpl = (ngoModel) => {
    const findByUsernameAndEmail = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield ngoModel.find({ $or: [{ username }, { email }] }, { password: 0 }).exec();
        return users.length > 0 ? users[0].toObject() : null;
    });
    const findByUsernameOrEmailAndPassword = (usernameOrEmail, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield ngoModel.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        }).exec();
        if (user) {
            const passwordMatch = bcryptjs_1.default.compareSync(password, user.password);
            if (passwordMatch) {
                const _a = user.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
                return userWithoutPassword;
            }
        }
        return null;
    });
    const getAllAcceptedNgos = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield ngoModel
            .find({
            $and: [
                { isVerified: true },
                { isRejected: false },
                { _id: { $ne: new mongoose_1.default.Types.ObjectId(id) } },
            ],
        }, { password: 0 })
            .exec();
        return users.length > 0 ? users : null;
    });
    const findByUsernameOrEmail = (usernameOrEmail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ngo = yield ngoModel
                .findOne({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            })
                .exec();
            if (ngo) {
                const _b = ngo.toObject(), { password } = _b, ngoWithoutPassword = __rest(_b, ["password"]);
                return ngoWithoutPassword;
            }
            return null;
        }
        catch (error) {
            console.error("Error finding user by username or email and password:", error);
            return null;
        }
    });
    const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const hashPass = bcryptjs_1.default.hashSync(user.password, 12);
        const newNgo = {
            username: user.username,
            email: user.email,
            password: hashPass,
            address: user.address,
            ngoType: user.ngoType,
            pincode: user.pincode,
        };
        const createdNgo = yield ngoModel.create(newNgo);
        if (createdNgo) {
            const _c = createdNgo.toObject(), { password } = _c, restoredUser = __rest(_c, ["password"]);
            return restoredUser;
        }
        return null;
    });
    const getNotVerifiedNgos = () => __awaiter(void 0, void 0, void 0, function* () {
        const notVerifiedNgos = yield ngoModel.find({ isVerified: false }, { password: 0 }).exec();
        if (notVerifiedNgos) {
            return notVerifiedNgos.map(ngo => ngo.toObject());
        }
        return null;
    });
    const acceptNgo = (ngoId) => __awaiter(void 0, void 0, void 0, function* () {
        const acceptedNgo = yield ngoModel.findByIdAndUpdate(ngoId, { isVerified: true, isReject: false }, { new: true }).exec();
        if (acceptedNgo) {
            const _d = acceptedNgo.toObject(), { password } = _d, ngoWithoutPassword = __rest(_d, ["password"]);
            return ngoWithoutPassword;
        }
        else {
            return null;
        }
    });
    const rejectNgo = (ngoId) => __awaiter(void 0, void 0, void 0, function* () {
        const rejectedNgo = yield ngoModel.findByIdAndUpdate(ngoId, { isVerified: true, isRejected: true }, { new: true }).exec();
        if (rejectedNgo) {
            const _e = rejectedNgo.toObject(), { password } = _e, ngoWithoutPassword = __rest(_e, ["password"]);
            return ngoWithoutPassword;
        }
        else {
            return null;
        }
    });
    const removeNgoAccount = (ngoId) => __awaiter(void 0, void 0, void 0, function* () {
        const removedNgoAccount = yield ngoModel.findByIdAndDelete(ngoId, { password: 0 }).exec();
        if (removedNgoAccount) {
            return removedNgoAccount.toObject();
        }
        else {
            return null;
        }
    });
    const resetNgoPassword = (usernameOrEmail, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashPass = bcryptjs_1.default.hashSync(newPassword, 12);
            const user = yield ngoModel
                .findOneAndUpdate({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            }, { $set: { password: hashPass } }, { new: true })
                .exec();
            if (user) {
                const _f = user.toObject(), { password } = _f, restoredUser = __rest(_f, ["password"]);
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
        findByUsernameAndEmail,
        findByUsernameOrEmailAndPassword,
        findByUsernameOrEmail,
        getAllAcceptedNgos,
        getNotVerifiedNgos,
        createUser,
        acceptNgo,
        rejectNgo,
        removeNgoAccount,
        resetNgoPassword,
    };
};
exports.ngoRepositroyEmpl = ngoRepositroyEmpl;
