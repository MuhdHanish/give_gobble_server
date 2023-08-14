import mongoose from "mongoose";
import { Ngo } from "../../domain/models/Ngo";
import { MongDBNgo } from "../database/models/ngoModel";
import bcrypt from "bcryptjs";

export type ngoRepository = {
  findByUsernameAndEmail: (username: string, email: string) => Promise<Ngo | null>;
  findByUsernameOrEmailAndPassword: (usernameOrEmail: string, password: string) => Promise<Ngo | null>
  findByUsernameOrEmail: (usernameOrEmail: string) => Promise<Ngo | null>
  getNotVerifiedNgos:() => Promise<Ngo[]|null>
  createUser: (user: Ngo) => Promise<Ngo | null>;
  acceptNgo: (ngoId: string) => Promise<Ngo | null>;
  rejectNgo: (ngoId: string) => Promise<Ngo | null>;
  removeNgoAccount: (ngoId: string) => Promise<Ngo | null>;
  resetNgoPassword: (usernameOrEmail: string, newPassword: string) => Promise<Ngo | null>;
  getAllAcceptedNgos: (id:string) => Promise<Ngo[] | null>;

};

export const ngoRepositroyEmpl = (ngoModel: MongDBNgo): ngoRepository => {

  const findByUsernameAndEmail = async (username: string, email: string): Promise<Ngo | null> => {
    const users = await ngoModel.find({ $or: [{ username }, { email }] }, { password: 0 }).exec();
    return users.length > 0 ? users[0].toObject() : null;
  };

  const findByUsernameOrEmailAndPassword = async (usernameOrEmail: string, password: string): Promise<Ngo | null> => {
  const user = await ngoModel.findOne({
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

  const getAllAcceptedNgos = async (id: string): Promise<Ngo[] | null> => {
    const users = await ngoModel
      .find(
        {
          $and: [
            { isVerified: true },
            { isRejected: false },
            { _id: { $ne: new mongoose.Types.ObjectId(id) } },
          ],
        },
        { password: 0 }
      )
      .exec();
    return users.length > 0 ? users : null;
  };

   const findByUsernameOrEmail = async (usernameOrEmail: string): Promise<Ngo | null> => {
    try {
      const ngo = await ngoModel
        .findOne({
          $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        })
        .exec();
      if (ngo) {
          const { password, ...ngoWithoutPassword } = ngo.toObject();
          return ngoWithoutPassword;
      }
      return null;
    } catch (error) {
      console.error("Error finding user by username or email and password:", error);
      return null;
    }
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
    const createdNgo = await ngoModel.create(newNgo);
    if (createdNgo) {
      const { password, ...restoredUser } = createdNgo.toObject();
      return restoredUser;
    }
    return null;
  };

   const getNotVerifiedNgos = async (): Promise<Ngo[] | null> => {
    const notVerifiedNgos = await ngoModel.find({ isVerified: false }, { password: 0 }).exec();
    if (notVerifiedNgos) {
      return notVerifiedNgos.map(ngo => ngo.toObject());
    }
    return null;
  }

  const acceptNgo = async (ngoId: string): Promise<Ngo | null> => {
    const acceptedNgo = await ngoModel.findByIdAndUpdate(
      ngoId,
      { isVerified: true, isReject: false },
      { new: true },
    ).exec();
    if (acceptedNgo) {
      const { password, ...ngoWithoutPassword } = acceptedNgo.toObject();
      return ngoWithoutPassword;
    } else {
      return null;
    }
  }

  const rejectNgo = async (ngoId: string): Promise<Ngo | null> => {
    const rejectedNgo = await ngoModel.findByIdAndUpdate(
      ngoId,
      { isVerified: true, isRejected: true },
      { new: true },
    ).exec();
    if (rejectedNgo) {
      const { password, ...ngoWithoutPassword } = rejectedNgo.toObject();
      return ngoWithoutPassword;
    } else {
      return null;
    }
  }

  const removeNgoAccount = async (ngoId: string): Promise<Ngo | null> => {
    const removedNgoAccount = await ngoModel.findByIdAndDelete(ngoId, { password: 0 }).exec();
    if (removedNgoAccount) {
      return removedNgoAccount.toObject();
    } else {
      return null;
    }
  }

  const resetNgoPassword = async (usernameOrEmail: string, newPassword: string) => {
    try {
       const hashPass: string = bcrypt.hashSync(newPassword, 12);
      const user = await ngoModel
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
    findByUsernameAndEmail,
    findByUsernameOrEmailAndPassword,
    findByUsernameOrEmail,
    getAllAcceptedNgos,
    getNotVerifiedNgos,
    createUser,
    acceptNgo,
    rejectNgo,
    removeNgoAccount,
    resetNgoPassword,
  };
};
