import { User } from "../../domain/models/User";
import { MongoDBUser } from "../database/models/userModel";
import bcrypt from "bcryptjs";

export type userRepository = {
  findByUsernameAndEmail: (username: string, email: string) => Promise<User | null>;
  findByUsernameOrEmailAndPassword:(usernameOrEmail:string,password:string) => Promise<User|null>
  findByUserEmail: (email: string) => Promise<User | null>;
  findOneUser: (user: User) => Promise<User | null>;
  createUser: (user: User) => Promise<User | null>;
};

export const userRepositoryEmpl = (userModel: MongoDBUser): userRepository => {

  const findByUsernameAndEmail = async (username: string, email: string): Promise<User | null> => {
    const users = await userModel.find({ $or: [{ username }, { email }] }, { password: 0 }).exec();
    return users.length > 0 ? users[0].toObject() : null;
  };

  const findByUsernameOrEmailAndPassword = async (usernameOrEmail: string, password: string): Promise<User | null> => {
  const user = await userModel.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
  }).exec();
  if (user) {
    const passwordMatch = bcrypt.compareSync(password, user.password as string);
    if (passwordMatch) {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    }
  }
  return null;
  };


  const findByUserEmail = async (email: string): Promise<User | null> => {
    const user = await userModel.findOne({ email }).exec();
    return user ? user.toObject() : null;
  };

  const findOneUser = async (user: User): Promise<User | null> => {
    const currentUser = await userModel.findOne(user, { password: 0 }).exec();
    return currentUser ? currentUser.toObject() : null;
  };

  const createUser = async (user: User): Promise<User | null> => {
    const hashPass: string =  bcrypt.hashSync(user.password as string, 12);
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
    findByUsernameOrEmailAndPassword,
    findByUserEmail,
    findOneUser,
    createUser,
  };
};
