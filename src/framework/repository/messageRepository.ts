import mongoose from "mongoose";
import { Message } from "../../domain/models/Message";
import { MongoDBMessage } from "../database/models/MessageModel";

export type messageRepository = {
  getAllMessages: () => Promise<Message[] | null>;
  sendMessage: (message: string, userId:string) => Promise<Message | null>;
};

export const messageRepositoryEmpl = (messageModel: MongoDBMessage): messageRepository => {
  const getAllMessages = async (): Promise<Message[] | null> => {
    const messages = await messageModel
      .find()
      .populate("sender", "username email profile")
      .exec();
      return messages;
  };

  const sendMessage = async (message: string, userId:string): Promise<Message | null> => {
    const newMessage = new messageModel({
      sender: new mongoose.Types.ObjectId(userId),
      content: message,
    });
    const savedMessage = await messageModel.create(newMessage);
    const sendedMessage = await savedMessage.populate("sender", "username email profile");
    return sendedMessage ? sendedMessage.toObject() : null;
  };

  return {
    getAllMessages,
    sendMessage,
  };
};
