import mongoose from "mongoose";
import { User } from "../../domain/models/User";
import { MongoDBUser } from "../database/models/userModel";
import bcrypt from "bcryptjs";

export type userRepository = {
  findByUsernameAndEmail: (username: string, email: string) => Promise<User | null>;
  findByUsernameOrEmailAndPassword: (usernameOrEmail: string, password: string) => Promise<User | null>;
  findByUserEmail: (email: string) => Promise<User | null>;
  findUserById: (userId: mongoose.Types.ObjectId) => Promise<User | null>;
  createUser: (user: User) => Promise<User | null>;
  resetUserPassword: (usernameOrEmail: string, newPassword: string) => Promise<User | null>;
};

export const userRepositoryEmpl = (userModel: MongoDBUser): userRepository => {
  const findByUsernameAndEmail = async (username: string, email: string): Promise<User | null> => {
    try {
      const users = await userModel.find({ $or: [{ username }, { email }] }, { password: 0 }).exec();
      return users.length > 0 ? users[0].toObject() : null;
    } catch (error) {
      console.error("Error finding user by username and email:", error);
      return null;
    }
  };

  const findByUsernameOrEmailAndPassword = async (usernameOrEmail: string, password: string): Promise<User | null> => {
    try {
      const user = await userModel
        .findOne({
          $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        })
        .exec();
      if (user) {
        const passwordMatch = bcrypt.compareSync(password, user.password as string);
        if (passwordMatch) {
          const { password, ...userWithoutPassword } = user.toObject();
          return userWithoutPassword;
        }
      }
      return null;
    } catch (error) {
      console.error("Error finding user by username or email and password:", error);
      return null;
    }
  };

  const findByUserEmail = async (email: string): Promise<User | null> => {
    try {
      const user = await userModel.findOne({ email }).exec();
      return user ? user.toObject() : null;
    } catch (error) {
      console.error("Error finding user by email:", error);
      return null;
    }
  };

const findUserById = async (userId: mongoose.Types.ObjectId): Promise<User | null> => {
  try {
    const user = await userModel.findById(userId).exec();
    if (user) {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    }
    return null;
  } catch (error) {
    console.error("Error finding restaurant by Id:", error);
    return null;
  }
}; 
  const createUser = async (user: User): Promise<User | null> => {
    try {
      const hashPass: string = bcrypt.hashSync(user.password as string, 12);
      const newUser: User = {
        username: user.username,
        email: user.email,
        password: hashPass,
        location: user.location,
      };
      const createdUser = await userModel.create(newUser);
      if (createdUser) {
        const { password, ...restoredUser } = createdUser.toObject();
        return restoredUser;
      }
      return null;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  };

  const resetUserPassword = async (usernameOrEmail: string, newPassword: string) => {
    try {
       const hashPass: string = bcrypt.hashSync(newPassword, 12);
      const user = await userModel
        .findOneAndUpdate({
          $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        },{$set:{password:hashPass}},{new:true})
        .exec();
      if (user) {
        const { password, ...restoredUser } = user.toObject();
        return restoredUser;
      }
      return null;
    } catch (error) {
      console.error("Error finding user by username or email and password:", error);
      return null;
    }
  }

  return {
    findByUsernameOrEmailAndPassword,
    findByUsernameAndEmail,
    resetUserPassword,
    findByUserEmail,
    findUserById,
    createUser,
  };
};
