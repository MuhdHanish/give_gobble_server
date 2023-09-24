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
exports.sendMessageController = exports.getAllMessagesController = void 0;
const express_validator_1 = require("express-validator");
const MessageModel_1 = require("../../../framework/database/models/MessageModel");
const messageRepository_1 = require("../../../framework/repository/messageRepository");
const message_1 = require("../../../app/usecases/message/message");
const messageRepository = (0, messageRepository_1.messageRepositoryEmpl)(MessageModel_1.messageModel);
const getAllMessagesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield (0, message_1.getAllMessages)(messageRepository)();
        return res.status(200).json({ message: "Fetched all messages", messages });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllMessagesController = getAllMessagesController;
const sendMessageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { message } = req.body;
        const newMessage = yield (0, message_1.sendMessage)(messageRepository)(message, (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id);
        if (newMessage) {
            return res.status(201).json({ message: "message sented successfully", newMessage });
        }
        else {
            return res.status(400).json({ message: "Error on sending message" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.sendMessageController = sendMessageController;
