import mongoose, { Model, Schema, Document } from "mongoose";
import { User } from "../../../domain/models/User";

export type MongoDBUser = Model<Document<any, any, any> & User>;

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  role: {type:String,required: true, default:"user"},
  status: { type: Boolean, required: true, default: true },
  profile: {
    type: String,
    default:
      "https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon.png",
  },
});

export const userModel: MongoDBUser = mongoose.connection.model<Document<any, any, any> & User>('User', userSchema);