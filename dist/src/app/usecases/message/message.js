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
exports.sendMessage = exports.getAllMessages = void 0;
const getAllMessages = (messageRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield messageRepository.getAllMessages();
    if (messages) {
        return messages;
    }
    return null;
});
exports.getAllMessages = getAllMessages;
const sendMessage = (messageRepository) => (message, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const newMessage = yield messageRepository.sendMessage(message, userId);
    if (newMessage) {
        return newMessage;
    }
    else {
        return null;
    }
});
exports.sendMessage = sendMessage;
