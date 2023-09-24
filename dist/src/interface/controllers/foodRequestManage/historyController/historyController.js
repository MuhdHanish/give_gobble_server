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
exports.removeAllRequestFromHistoryController = exports.removeRequestFromHistoryController = exports.getRequestHistoryController = void 0;
const foodRequestRepository_1 = require("../../../../framework/repository/foodRequestRepository");
const getRequestHistory_1 = require("../../../../app/usecases/foodRequest/history/getRequestHistory");
const foodRequestModel_1 = require("../../../../framework/database/models/foodRequestModel");
const foodRequestRepository = (0, foodRequestRepository_1.foodRequestRepositoryEmpl)(foodRequestModel_1.foodRequestModel);
const getRequestHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const requestHistory = yield (0, getRequestHistory_1.getRequestHistory)(foodRequestRepository)(id);
        return res.status(200).json({ message: "Fetched pending requests history", requestHistory });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getRequestHistoryController = getRequestHistoryController;
const removeRequestFromHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const removedRequest = yield (0, getRequestHistory_1.removeRequestFromHistory)(foodRequestRepository)(id);
        if (removedRequest) {
            return res.status(200).json({ message: "Removed the request of user", removedRequest });
        }
        else {
            return res.status(400).json({ message: "Removed the request of user failed" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.removeRequestFromHistoryController = removeRequestFromHistoryController;
const removeAllRequestFromHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const requestHistoryCleared = yield (0, getRequestHistory_1.removeAllRequestFromHistory)(foodRequestRepository)(id);
        if (requestHistoryCleared) {
            return res.status(200).json({ message: "Removed all request of user" });
        }
        else {
            return res.status(400).json({ message: "Removed all request of user failed" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.removeAllRequestFromHistoryController = removeAllRequestFromHistoryController;
