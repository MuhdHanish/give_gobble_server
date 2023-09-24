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
exports.messageRepositoryEmpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messageRepositoryEmpl = (messageModel) => {
    const getAllMessages = () => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield messageModel
            .find()
            .populate("sender", "username email profile")
            .exec();
        return messages;
    });
    const sendMessage = (message, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const newMessage = new messageModel({
            sender: new mongoose_1.default.Types.ObjectId(userId),
            content: message,
        });
        const savedMessage = yield messageModel.create(newMessage);
        const sendedMessage = yield savedMessage.populate("sender", "username email profile");
        return sendedMessage ? sendedMessage.toObject() : null;
    });
    return {
        getAllMessages,
        sendMessage,
    };
};
exports.messageRepositoryEmpl = messageRepositoryEmpl;
