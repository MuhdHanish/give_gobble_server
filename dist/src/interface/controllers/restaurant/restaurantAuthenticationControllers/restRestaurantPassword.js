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
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const restaurantModel_1 = require("../../../../framework/database/models/restaurantModel");
const restaurantRepository_1 = require("../../../../framework/repository/restaurantRepository");
const resetRestaurantPassword_1 = require("../../../../app/usecases/restaurant/restaurantAuthentication/resetRestaurantPassword");
const restaurantRepository = (0, restaurantRepository_1.restaurantRespositoryEmpl)(restaurantModel_1.restaurantModel);
const resetRestaurantPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { identifier, password } = req.body;
        const restaurant = yield (0, resetRestaurantPassword_1.resetRestaurantPassword)(restaurantRepository)(identifier, password);
        if (restaurant) {
            return res.status(201).json({ message: "Password reseted sucessfully" });
        }
        else {
            return res.status(401).json({ message: "No active account found with the given credentials" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = resetRestaurantPasswordController;
