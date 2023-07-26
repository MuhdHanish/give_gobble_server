import mongoose from "mongoose";

export interface Restaurant {
  _id?: mongoose.Types.ObjectId;
  restaurantname?: string;
  email?: string;
  password?: string;
  location?: string;
  role?:string,
  status?: boolean;
  profile?: string;
}
