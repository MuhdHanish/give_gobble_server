import mongoose from "mongoose";
import { Message } from "../../../domain/models/Message";
import { messageRepository  } from "../../../framework/repository/messageRepository";

export const getAllMessages = (messageRepository: messageRepository) => async(): Promise<Message[] | null> => {
  const messages = await messageRepository.getAllMessages();
  if (messages) {
    return messages;
  }
  return null;
}

export const sendMessage = (messageRepository: messageRepository) => async (message: string, userId: string): Promise<Message | null> => {
  const newMessage = await messageRepository.sendMessage(message, userId);
  if (newMessage) {
    return newMessage;
  } else {
    return null;
  }
}