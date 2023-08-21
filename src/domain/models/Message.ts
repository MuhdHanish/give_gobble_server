import mongoose from "mongoose";
import { Ngo } from "./Ngo";

export interface Message {
  sender?: mongoose.Types.ObjectId|Ngo,
  content?: string,
  time?:Date
}