import mongoose, { Model, Schema, Document } from "mongoose";
import { Restorent } from "../../../domain/models/Restorent";

export type MongoDDRestorent = Model<Document<any, any, any> & Restorent>;

const restorentSchema = new Schema<Restorent>({
  restorentname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  role: {type:String, required:true, default:"restorent"},
  profile: {
    type: String,
    default:
      "https://i.pinimg.com/736x/77/7d/9c/777d9c6e187bfc29677c7de89aa73c5a.jpg",
  },
});

export const restorentModel: MongoDDRestorent = mongoose.connection.model<
  Document<any, any, any> & Restorent
>("Restorent", restorentSchema);
