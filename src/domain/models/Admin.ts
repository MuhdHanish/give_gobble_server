import mongoose from "mongoose";

export interface Admin {
  _id?: mongoose.Types.ObjectId;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  profile?: string;
}
