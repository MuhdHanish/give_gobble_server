import mongoose from "mongoose";

export interface Ngo {
  _id?: mongoose.Types.ObjectId;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  isVerified: boolean;
  ngoType?: string;
  pincode?: string;
  adderess?: string;
}