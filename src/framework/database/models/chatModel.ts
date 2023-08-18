import mongoose, { Model, Schema, Document } from "mongoose";
import { Chat } from "../../../domain/models/Chat";

export type MongoDBFoodRequest = Model<Document<any, any, any> & Chat>;

const chatSchema = new Schema<Chat>({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ngo",
    },
  ],
  latestMessage: { type: mongoose.Types.ObjectId, ref: "Message" }
});

export const chatModel: MongoDBFoodRequest = mongoose.connection.model<Document<any, any, any> & Chat>("Chat", chatSchema);
