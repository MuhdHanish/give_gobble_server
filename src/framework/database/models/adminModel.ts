import mongoose, { Model, Schema, Document } from "mongoose";
import { Admin } from "../../../domain/models/Admin";

export type MongoDBAdmin = Model<Document<any, any, any> & Admin>;

const userSchema = new Schema<Admin>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "admin" },
});

export const adminModel: MongoDBAdmin = mongoose.connection.model<
  Document<any, any, any> & Admin
>("Admin", userSchema);
