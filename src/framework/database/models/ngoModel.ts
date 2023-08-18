import mongoose, { Model, Schema, Document } from "mongoose";
import { Ngo } from "../../../domain/models/Ngo";

export type MongDBNgo = Model<Document<any, any, any> & Ngo>;

const ngoSchema = new Schema<Ngo>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "ngo" },
  isVerified: { type: Boolean, required: true, default: false },
  status: { type: Boolean, required: true, default: true },
  ngoType: { type: String, required: true },
  pincode: { type: Number, required: true },
  address: { type: String, required: true },
  isRejected: { type: Boolean, required: true, default: false },
  profile: {
    type: String,
    required: true,
    default: "https://cdn-icons-png.flaticon.com/128/3842/3842881.png",
  },
});

export const ngoModel: MongDBNgo = mongoose.connection.model<
  Document<any, any, any> & Ngo
>("Ngo", ngoSchema);
