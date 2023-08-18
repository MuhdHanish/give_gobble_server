import mongoose from "mongoose";

export interface Chat {
  users?: [
    mongoose.Types.ObjectId
  ],
  latestMessage?: mongoose.Types.ObjectId
}