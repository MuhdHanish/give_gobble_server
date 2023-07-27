import { Ngo } from "../../domain/models/Ngo";
import { MongDBNgo } from "../database/models/ngoModel";
import bcrypt from "bcryptjs";

export type ngoRepository = {
  findByUsernameAndEmail: (username: string, email: string) => Promise<Ngo | null>;
  findByUsernameOrEmailAndPassword:(usernameOrEmail:string,password:string) => Promise<Ngo|null>
  createUser: (user: Ngo) => Promise<Ngo | null>;
};

export const ngoRepositroyEmpl = (userModel: MongDBNgo): ngoRepository => {

  const findByUsernameAndEmail = async (username: string, email: string): Promise<Ngo | null> => {
    const users = await userModel.find({ $or: [{ username }, { email }] }, { password: 0 }).exec();
    return users.length > 0 ? users[0].toObject() : null;
  };

  const findByUsernameOrEmailAndPassword = async (usernameOrEmail: string, password: string): Promise<Ngo | null> => {
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


  const createUser = async (user: Ngo): Promise<Ngo | null> => {
    const hashPass: string =  bcrypt.hashSync(user.password as string, 12);
    const newNgo: Ngo = {
      username: user.username,
      email: user.email,
      password: hashPass,
      address: user.address,
      ngoType: user.ngoType,
      pincode: user.pincode,
    };
    const createdNgo = await userModel.create(newNgo);
    if (createdNgo) {
      const { password, ...restoredUser } = createdNgo.toObject();
      return restoredUser;
    }
    return null;
  };

  return {
    findByUsernameAndEmail,
    findByUsernameOrEmailAndPassword,
    createUser,
  };
};
