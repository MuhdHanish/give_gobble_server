import { User } from "../../domain/models/User";
import { MongoDBUser } from "../database/models/userModel";
import bcrypt from "bcryptjs";

export type userRepository = {
  findByUsernameAndEmail: (username: string, email: string) => Promise<User | null>;
  findByUserEmail: (email: string) => Promise<User | null>;
  findOneUser: (user: User) => Promise<User | null>;
  createUser: (user: User) => Promise<User | null>;
};

export const userRepositoryEmpl = (userModel: MongoDBUser): userRepository => {
  const findByUsernameAndEmail = async (username: string, email: string): Promise<User | null> => {
    const users = await userModel.find({ $or: [{ username }, { email }] }, { password: 0 }).exec();
    return users.length > 0 ? users[0].toObject() : null;
  };

  const findByUserEmail = async (email: string): Promise<User | null> => {
    const user = await userModel.findOne({ email }, { password: 0 }).exec();
    return user ? user.toObject() : null;
  };

  const findOneUser = async (user: User): Promise<User | null> => {
    const currentUser = await userModel.findOne(user, { password: 0 }).exec();
    return currentUser ? currentUser.toObject() : null;
  };

  const createUser = async (user: User): Promise<User | null> => {
    const hashPass: string = await bcrypt.hash(user.password as string, 12);
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
  };

  return {
    findByUsernameAndEmail,
    findByUserEmail,
    findOneUser,
    createUser,
  };
};
