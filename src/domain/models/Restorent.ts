import mongoose from "mongoose";

export interface Restorent {
  _id?: mongoose.Types.ObjectId;
  restorentname?: string;
  email?: string;
  password?: string;
  location?: string;
  role?:string,
  status?: boolean;
  profile?: string;
}
