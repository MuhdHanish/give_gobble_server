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
exports.foodRequestRepositoryEmpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const foodRequestRepositoryEmpl = (foodRequstModel) => {
    const postRequest = (userId, title, quantity, time, location, role) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newRequest = {
                userId: new mongoose_1.default.Types.ObjectId(userId),
                title,
                quantity,
                time,
                userRole: role,
                location
            };
            const createRequest = yield foodRequstModel.create(newRequest);
            return createRequest.toObject();
        }
        catch (error) {
            console.error("Error while storing request", error);
            return null;
        }
    });
    const acceptRequest = (requestId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const acceptedNgo = yield foodRequstModel
                .findByIdAndUpdate(requestId, { status: "Accepted" }, { new: true })
                .exec();
            if (acceptedNgo) {
                return acceptedNgo.toObject();
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error("Error while accepting request", error);
            return null;
        }
    });
    const completeRequest = (requestId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const completedRequest = yield foodRequstModel
                .findByIdAndUpdate(requestId, { status: "Completed" }, { new: true })
                .exec();
            if (completedRequest) {
                return completedRequest.toObject();
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error("Error while completing request", error);
            return null;
        }
    });
    const getSelectedRequest = (requestId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const selectedRequest = yield foodRequstModel.findById(requestId).exec();
            if (selectedRequest) {
                return selectedRequest.toObject();
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error("Error while getting selected request and user", error);
            return null;
        }
    });
    const getPendingRequests = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pendingRequests = yield foodRequstModel.find({ status: "Pending" });
            return pendingRequests;
        }
        catch (error) {
            console.error("Error while getting pending requests", error);
            return null;
        }
    });
    const getAcceptedRequests = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const acceptedRequests = yield foodRequstModel.find({ status: "Accepted" });
            return acceptedRequests;
        }
        catch (error) {
            console.error("Error while getting accepted requests", error);
            return null;
        }
    });
    const getRequestHistory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const history = yield foodRequstModel.find({ userId });
            if (history) {
                return history;
            }
            return null;
        }
        catch (error) {
            console.error("Error while getting user requests history", error);
            return null;
        }
    });
    const removeRequestFromHistory = (requestId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const removedRequest = yield foodRequstModel.findByIdAndDelete(requestId);
            if (removedRequest) {
                return removedRequest.toObject();
            }
            return null;
        }
        catch (error) {
            console.error("Error while getting removing request from history", error);
            return null;
        }
    });
    const removeAllRequestFromHistory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteResult = yield foodRequstModel.deleteMany({ userId });
            return deleteResult ? true : false;
        }
        catch (error) {
            console.error("Error while getting removing all request from history", error);
            return null;
        }
    });
    const getCompletedRequests = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const completedRequests = yield foodRequstModel.find({ status: "Completed" });
            return completedRequests;
        }
        catch (error) {
            console.error("Error while getting completed requests", error);
            return null;
        }
    });
    return {
        postRequest,
        acceptRequest,
        completeRequest,
        getSelectedRequest,
        getPendingRequests,
        getAcceptedRequests,
        getCompletedRequests,
        getRequestHistory,
        removeAllRequestFromHistory,
        removeRequestFromHistory
    };
};
exports.foodRequestRepositoryEmpl = foodRequestRepositoryEmpl;
