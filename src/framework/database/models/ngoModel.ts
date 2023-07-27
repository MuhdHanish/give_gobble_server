import mongoose, { Model, Schema, Document } from "mongoose";
import { Ngo } from "../../../domain/models/Ngo";

export type MongDBNgo = Model<Document<any, any, any> & Ngo>;

const ngoSchema = new Schema<Ngo>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "ngo" },
  isVerified: {type:Boolean,required:true,default:false},
  ngoType: { type: String, required: true },
  pincode: { type: String, required: true },
  adderess: {type:String,required:true}
});

export const ngoModel: MongDBNgo = mongoose.connection.model<
  Document<any, any, any> & Ngo
>("Ngo", ngoSchema);
