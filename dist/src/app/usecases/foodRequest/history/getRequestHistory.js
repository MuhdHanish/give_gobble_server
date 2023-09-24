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
exports.removeAllRequestFromHistory = exports.removeRequestFromHistory = exports.getRequestHistory = void 0;
const getRequestHistory = (foodRequestRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foodRequestHistory = yield foodRequestRepository.getRequestHistory(userId);
    if (foodRequestHistory) {
        return foodRequestHistory;
    }
    else {
        return null;
    }
});
exports.getRequestHistory = getRequestHistory;
const removeRequestFromHistory = (foodRequestRepository) => (requestId) => __awaiter(void 0, void 0, void 0, function* () {
    const removedRequest = yield foodRequestRepository.removeRequestFromHistory(requestId);
    if (removedRequest) {
        return removedRequest;
    }
    else {
        return null;
    }
});
exports.removeRequestFromHistory = removeRequestFromHistory;
const removeAllRequestFromHistory = (foodRequestRepository) => (requestId) => __awaiter(void 0, void 0, void 0, function* () {
    const removedRequest = yield foodRequestRepository.removeAllRequestFromHistory(requestId);
    if (removedRequest) {
        return true;
    }
    else {
        return false;
    }
});
exports.removeAllRequestFromHistory = removeAllRequestFromHistory;
