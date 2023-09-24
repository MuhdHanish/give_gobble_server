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
exports.completeRequest = exports.acceptRequest = void 0;
const acceptRequest = (foodRequestRepository) => (requestId) => __awaiter(void 0, void 0, void 0, function* () {
    const acceptedRequest = foodRequestRepository.acceptRequest(requestId);
    if (acceptedRequest) {
        return acceptedRequest;
    }
    else {
        return null;
    }
});
exports.acceptRequest = acceptRequest;
const completeRequest = (foodRequestRepository) => (requestId) => __awaiter(void 0, void 0, void 0, function* () {
    const completeddRequest = foodRequestRepository.completeRequest(requestId);
    if (completeddRequest) {
        return completeddRequest;
    }
    else {
        return null;
    }
});
exports.completeRequest = completeRequest;
