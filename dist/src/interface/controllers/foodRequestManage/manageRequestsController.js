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
exports.completeRequestController = exports.acceptRequestController = void 0;
const foodRequestModel_1 = require("../../../framework/database/models/foodRequestModel");
const foodRequestRepository_1 = require("../../../framework/repository/foodRequestRepository");
const manageFoodRequest_1 = require("../../../app/usecases/foodRequest/manageFoodRequest");
const foodRequestRepository = (0, foodRequestRepository_1.foodRequestRepositoryEmpl)(foodRequestModel_1.foodRequestModel);
const acceptRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const acceptedRequest = yield (0, manageFoodRequest_1.acceptRequest)(foodRequestRepository)(id);
        if (acceptedRequest) {
            return res.status(200).json({ message: "Request accepted", acceptedRequest });
        }
        else {
            return res.status(400).json({ message: "Error occured" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.acceptRequestController = acceptRequestController;
const completeRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const completedRequest = yield (0, manageFoodRequest_1.completeRequest)(foodRequestRepository)(id);
        if (completedRequest) {
            return res.status(200).json({ message: "Request completed", completedRequest });
        }
        else {
            return res.status(400).json({ message: "Error occured" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.completeRequestController = completeRequestController;
