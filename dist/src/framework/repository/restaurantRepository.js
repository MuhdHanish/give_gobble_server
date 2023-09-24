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
exports.restaurantRespositoryEmpl = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const restaurantRespositoryEmpl = (restaurantModel) => {
    const findByUsernameAndEmail = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const restaurant = yield restaurantModel.findOne({ $or: [{ username }, { email }] }, { password: 0 }).exec();
            return restaurant ? restaurant.toObject() : null;
        }
        catch (error) {
            console.error("Error finding restaurant by username and email:", error);
            return null;
        }
    });
    const findByUsernameOrEmailAndPassword = (usernameOrEmail, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const restaurant = yield restaurantModel
                .findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] })
                .exec();
            if (restaurant) {
                const passwordMatch = bcryptjs_1.default.compareSync(password, restaurant.password);
                if (passwordMatch) {
                    const _a = restaurant.toObject(), { password } = _a, restaurantWithoutPassword = __rest(_a, ["password"]);
                    return restaurantWithoutPassword;
                }
            }
            return null;
        }
        catch (error) {
            console.error("Error finding restaurant by username or email and password:", error);
            return null;
        }
    });
    const findByUsernameOrEmail = (usernameOrEmail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const restaurant = yield restaurantModel
                .findOne({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            })
                .exec();
            if (restaurant) {
                const _b = restaurant.toObject(), { password } = _b, restaurantWithoutPassword = __rest(_b, ["password"]);
                return restaurantWithoutPassword;
            }
            return null;
        }
        catch (error) {
            console.error("Error finding user by username or email and password:", error);
            return null;
        }
    });
    const findRestaurantById = (restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const restaurant = yield restaurantModel
                .findById(restaurantId)
                .exec();
            if (restaurant) {
                const _c = restaurant.toObject(), { password } = _c, restaurantWithoutPassword = __rest(_c, ["password"]);
                return restaurantWithoutPassword;
            }
            return null;
        }
        catch (error) {
            console.error("Error finding restaurant by Id:", error);
            return null;
        }
    });
    const createrestaurant = (restaurant) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashPass = yield bcryptjs_1.default.hash(restaurant.password, 12);
            const newrestaurant = {
                username: restaurant.username,
                email: restaurant.email,
                password: hashPass,
                location: restaurant.location,
            };
            const createdrestaurant = yield restaurantModel.create(newrestaurant);
            if (createdrestaurant) {
                const _d = createdrestaurant.toObject(), { password } = _d, restoredrestaurant = __rest(_d, ["password"]);
                return restoredrestaurant;
            }
            return null;
        }
        catch (error) {
            console.error("Error creating restaurant:", error);
            return null;
        }
    });
    const resetRestaurantPassword = (usernameOrEmail, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashPass = bcryptjs_1.default.hashSync(newPassword, 12);
            const user = yield restaurantModel
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
        findByUsernameAndEmail,
        findByUsernameOrEmailAndPassword,
        findByUsernameOrEmail,
        createrestaurant,
        findRestaurantById,
        resetRestaurantPassword,
    };
};
exports.restaurantRespositoryEmpl = restaurantRespositoryEmpl;
