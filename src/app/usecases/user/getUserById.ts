import mongoose from "mongoose";
import { User } from "../../../domain/models/User";
import { userRepository } from "../../../framework/repository/userRepository";

export const getUserById = (userRepository: userRepository) => async(userId: mongoose.Types.ObjectId): Promise<User|null> => {
  const user = await userRepository.findUserById(userId);
  if (user) {
    return user;
  } else {
    return null;
  }
}