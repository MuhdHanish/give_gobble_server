import mongoose, { Model, Schema, Document } from "mongoose";
import { FoodRequest } from "../../../domain/models/FoodRequest";

export type MongoDBFoodRequest = Model<Document<any, any, any> & FoodRequest>;

const foodRequestSchema = new Schema<FoodRequest>({
  userId: { type: mongoose.Types.ObjectId, required: true },
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  isAccepted: { type: Boolean, required: true, default: false },
  status: {type:String,required:true,default: "Pending"},
  image: {
    type: String,
    required: true,
    default:
      "https://sandinmysuitcase.com/wp-content/uploads/2021/01/Popular-Indian-Food-Dishes.jpg.webp",
  },
});

export const foodRequestModel: MongoDBFoodRequest = mongoose.connection.model<
  Document<any, any, any> & FoodRequest
>("FoodRequest", foodRequestSchema);
