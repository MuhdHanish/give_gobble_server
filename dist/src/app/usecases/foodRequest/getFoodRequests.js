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
exports.getCompletedRequests = exports.getAcceptedRequests = exports.getPendingRequests = exports.getSelectedFoodRequest = void 0;
const getSelectedFoodRequest = (foodRequestRepository) => (requestId) => __awaiter(void 0, void 0, void 0, function* () {
    const selecetedFoodRequest = yield foodRequestRepository.getSelectedRequest(requestId);
    if (selecetedFoodRequest) {
        return selecetedFoodRequest;
    }
    else {
        return null;
    }
});
exports.getSelectedFoodRequest = getSelectedFoodRequest;
const getPendingRequests = (foodRequestRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const pendingRequests = yield foodRequestRepository.getPendingRequests();
    if (pendingRequests) {
        return pendingRequests;
    }
    else {
        return null;
    }
});
exports.getPendingRequests = getPendingRequests;
const getAcceptedRequests = (foodRequestRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const acceptedRequests = yield foodRequestRepository.getAcceptedRequests();
    if (acceptedRequests) {
        return acceptedRequests;
    }
    else {
        return null;
    }
});
exports.getAcceptedRequests = getAcceptedRequests;
const getCompletedRequests = (foodRequestRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const completedRequests = yield foodRequestRepository.getCompletedRequests();
    if (completedRequests) {
        return completedRequests;
    }
    else {
        return null;
    }
});
exports.getCompletedRequests = getCompletedRequests;
