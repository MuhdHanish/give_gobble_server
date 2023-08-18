import mongoose from "mongoose";

export interface Message {
  sender?: mongoose.Types.ObjectId,
  content?: string,
}