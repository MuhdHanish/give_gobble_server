import { Ngo } from "../../domain/models/Ngo";
import { MongDBNgo } from "../database/models/ngoModel";
import bcrypt from "bcryptjs";

export type ngoRepository = {
  findByUsernameAndEmail: (username: string, email: string) => Promise<Ngo | null>;
  findByUsernameOrEmailAndPassword: (usernameOrEmail: string, password: string) => Promise<Ngo | null>;
  getNotVerifiedNgos: () => Promise<Ngo[] | null>;
  createUser: (user: Ngo) => Promise<Ngo | null>;
  acceptNgo: (ngoId: string) => Promise<Ngo | null>;
  rejectNgo: (ngoId: string) => Promise<Ngo | null>;
  removeNgoAccount: (ngoId: string) => Promise<Ngo | null>;
};

export const ngoRepositroyEmpl = (ngoModel: MongDBNgo): ngoRepository => {
  const findByUsernameAndEmail = async (username: string, email: string): Promise<Ngo | null> => {
    try {
      const users = await ngoModel.find({ $or: [{ username }, { email }] }, { password: 0 }).exec();
      return users.length > 0 ? users[0].toObject() : null;
    } catch (error) {
      console.error("Error finding NGO by username and email:", error);
      return null;
    }
  };

  const findByUsernameOrEmailAndPassword = async (
    usernameOrEmail: string,
    password: string
  ): Promise<Ngo | null> => {
    try {
      const user = await ngoModel
        .findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] })
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
      console.error("Error finding NGO by username or email and password:", error);
      return null;
    }
  };

  const createUser = async (user: Ngo): Promise<Ngo | null> => {
    try {
      const hashPass: string = bcrypt.hashSync(user.password as string, 12);
      const newNgo: Ngo = {
        username: user.username,
        email: user.email,
        password: hashPass,
        address: user.address,
        ngoType: user.ngoType,
        pincode: user.pincode,
      };
      const createdNgo = await ngoModel.create(newNgo);
      if (createdNgo) {
        const { password, ...restoredUser } = createdNgo.toObject();
        return restoredUser;
      }
      return null;
    } catch (error) {
      console.error("Error creating NGO:", error);
      return null;
    }
  };

  const getNotVerifiedNgos = async (): Promise<Ngo[] | null> => {
    try {
      const notVerifiedNgos = await ngoModel.find({ isVerified: false });
      return notVerifiedNgos;
    } catch (error) {
      console.error("Error getting not verified NGOs:", error);
      return null;
    }
  };

  const acceptNgo = async (ngoId: string): Promise<Ngo | null> => {
    try {
      const acceptedNgo = await ngoModel.findByIdAndUpdate(
        ngoId,
        { isVerified: true, isReject: false },
        { new: true }
      );
      return acceptedNgo;
    } catch (error) {
      console.error("Error accepting NGO:", error);
      return null;
    }
  };

  const rejectNgo = async (ngoId: string): Promise<Ngo | null> => {
    try {
      const rejectedNgo = await ngoModel.findByIdAndUpdate(
        ngoId,
        { isVerified: true, isReject: true },
        { new: true }
      );
      return rejectedNgo;
    } catch (error) {
      console.error("Error rejecting NGO:", error);
      return null;
    }
  };

  const removeNgoAccount = async (ngoId: string): Promise<Ngo | null> => {
    try {
      const removedNgoAccount = await ngoModel.findByIdAndDelete(ngoId);
      return removedNgoAccount;
    } catch (error) {
      console.error("Error removing NGO account:", error);
      return null;
    }
  };

  return {
    findByUsernameAndEmail,
    findByUsernameOrEmailAndPassword,
    getNotVerifiedNgos,
    createUser,
    acceptNgo,
    rejectNgo,
    removeNgoAccount,
  };
};
