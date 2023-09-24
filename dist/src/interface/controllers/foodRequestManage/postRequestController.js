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
const foodRequestModel_1 = require("../../../framework/database/models/foodRequestModel");
const foodRequestRepository_1 = require("../../../framework/repository/foodRequestRepository");
const postFoodRequest_1 = require("../../../app/usecases/foodRequest/postFoodRequest");
const foodRequestRepository = (0, foodRequestRepository_1.foodRequestRepositoryEmpl)(foodRequestModel_1.foodRequestModel);
const postFoodRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { title, time, location, quantity } = req.body;
        const postedRequest = yield (0, postFoodRequest_1.postFoodRequest)(foodRequestRepository)((_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id, title, quantity, time, location, (_b = req.userInfo) === null || _b === void 0 ? void 0 : _b.role);
        if (postedRequest) {
            return res.status(201).json({ message: "Request posted successfully", postFoodRequest: postFoodRequest_1.postFoodRequest });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = postFoodRequestController;
