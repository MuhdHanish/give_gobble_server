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
const ngoModel_1 = require("../../../../../framework/database/models/ngoModel");
const express_validator_1 = require("express-validator");
const ngoRespository_1 = require("../../../../../framework/repository/ngoRespository");
const signupStepTwo_1 = require("../../../../../app/usecases/ngo/ngoAuthentication/userSignup/signupStepTwo");
const ngoRepository = (0, ngoRespository_1.ngoRepositroyEmpl)(ngoModel_1.ngoModel);
const stepTwoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { username, email, password, ngoType, address, pincode } = req.body;
        const user = yield (0, signupStepTwo_1.signupStepTwo)(ngoRepository)(username, email, password, ngoType, address, pincode);
        if (!user) {
            return res.status(400).json({ message: "Registration failed" });
        }
        else {
            return res.status(201).json({ message: "Registration successfull, not verified by admin", user });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = stepTwoController;
