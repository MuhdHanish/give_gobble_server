import mongoose, { Model, Schema, Document } from "mongoose";
import { Message } from "../../../domain/models/Message";

export type MongoDBMessage = Model<Document<any, any, any> & Message>;

const messageSchema = new Schema<Message>({
  sender: { type: mongoose.Types.ObjectId, ref: "Ngo" },
  content: { type: String, trim: true },
  time: { type: Date, default: Date.now },
});

export const messageModel: MongoDBMessage = mongoose.connection.model<
  Document<any, any, any> & Message
>("Message", messageSchema);
