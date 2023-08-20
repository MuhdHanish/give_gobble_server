import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { messageModel } from "../../../framework/database/models/MessageModel";
import { messageRepositoryEmpl } from "../../../framework/repository/messageRepository";
import { getAllMessages, sendMessage } from "../../../app/usecases/message/message";

const messageRepository = messageRepositoryEmpl(messageModel);

interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
}

export const getAllMessagesController = async (req: Request, res: Response) => {
  try {
    const messages = await getAllMessages(messageRepository)();
    return res.status(200).json({ message: "Fetched all messages", messages });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const sendMessageController = async (req: CustomRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { message } = req.body;
    const newMessage = await sendMessage(messageRepository)(message, req.userInfo?.id as string);
    if (newMessage) {
      return res.status(201).json({ message: "message sented successfully", newMessage });
    } else {
      return res.status(400).json({message:"Error on sending message"})
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};