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
exports.getCompletedRequestsController = exports.getAcceptedRequestsController = exports.getPendingRequestsContorller = exports.getSelectedRequestController = void 0;
const foodRequestModel_1 = require("../../../framework/database/models/foodRequestModel");
const foodRequestRepository_1 = require("../../../framework/repository/foodRequestRepository");
const userRepository_1 = require("../../../framework/repository/userRepository");
const getFoodRequests_1 = require("../../../app/usecases/foodRequest/getFoodRequests");
const getUserById_1 = require("../../../app/usecases/user/getUserById");
const getRestaurantById_1 = require("../../../app/usecases/restaurant/getRestaurantById");
const userModel_1 = require("../../../framework/database/models/userModel");
const restaurantRepository_1 = require("../../../framework/repository/restaurantRepository");
const restaurantModel_1 = require("../../../framework/database/models/restaurantModel");
const foodRequestRepository = (0, foodRequestRepository_1.foodRequestRepositoryEmpl)(foodRequestModel_1.foodRequestModel);
const restaurantRepository = (0, restaurantRepository_1.restaurantRespositoryEmpl)(restaurantModel_1.restaurantModel);
const userRepository = (0, userRepository_1.userRepositoryEmpl)(userModel_1.userModel);
const getSelectedRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const selectedRequest = yield (0, getFoodRequests_1.getSelectedFoodRequest)(foodRequestRepository)(id);
        let user = null;
        if (selectedRequest) {
            if (selectedRequest.userRole === "user") {
                user = yield (0, getUserById_1.getUserById)(userRepository)(selectedRequest.userId);
                return res.status(200).json({ message: "feteched selected request and user", selectedRequest, user });
            }
            else if (selectedRequest.userRole === "restaurant") {
                user = yield (0, getRestaurantById_1.getRestaurantById)(restaurantRepository)(selectedRequest.userId);
                return res.status(200).json({ message: "feteched selected request and user", selectedRequest, user });
            }
        }
        else {
            res.status(400).json({ message: "Error occured" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSelectedRequestController = getSelectedRequestController;
const getPendingRequestsContorller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pendingRequests = yield (0, getFoodRequests_1.getPendingRequests)(foodRequestRepository)();
        return res.status(200).json({ message: "Fetched pending requests", pendingRequests });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getPendingRequestsContorller = getPendingRequestsContorller;
const getAcceptedRequestsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const acceptedRequests = yield (0, getFoodRequests_1.getAcceptedRequests)(foodRequestRepository)();
        return res.status(200).json({ message: "Fetched pending requests", acceptedRequests });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAcceptedRequestsController = getAcceptedRequestsController;
const getCompletedRequestsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completedRequests = yield (0, getFoodRequests_1.getCompletedRequests)(foodRequestRepository)();
        return res.status(200).json({ message: "Fetched pending requests", completedRequests });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCompletedRequestsController = getCompletedRequestsController;
