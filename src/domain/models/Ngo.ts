import mongoose from "mongoose";

export interface Ngo {
  _id?: mongoose.Types.ObjectId;
  username?: string;
  email?: string;
  status?: boolean;
  password?: string;
  role?: string;
  isVerified?: boolean;
  ngoType?: string;
  pincode?: string;
  address?: string;
  profile?:string
}