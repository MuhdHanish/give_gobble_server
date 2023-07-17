import { Restorent } from "../../domain/models/Restorent";
import { MongoDDRestorent } from "../database/models/restorentModel";
import bcrypt from "bcryptjs";

export type restorentRepository = {
  findByRestorentnameAndEmail: (restorentname: string, email: string) => Promise<Restorent | null>;
  findByRestorentEmail: (email: string) => Promise<Restorent | null>;
  findOneRestorent: (restorent: Restorent) => Promise<Restorent | null>;
  createRestorent: (restorent: Restorent) => Promise<Restorent | null>;
};

export const userRepositoryEmpl = (restorentModel: MongoDDRestorent): restorentRepository => {
  const findByRestorentnameAndEmail = async (restorentname: string, email: string): Promise<Restorent | null> => {
    const restorent = await restorentModel.findOne({ $or: [{ restorentname }, { email }] }, { password: 0 }).exec();
    return restorent ? restorent.toObject() : null;
  };

  const findByRestorentEmail = async (email: string): Promise<Restorent | null> => {
    const restorent = await restorentModel.findOne({ email }, { password: 0 }).exec();
    return restorent ? restorent.toObject() : null;
  };

  const findOneRestorent = async (restorent: Restorent): Promise<Restorent | null> => {
    const currentRestorent = await restorentModel.findOne(restorent, { password: 0 }).exec();
    return currentRestorent ? currentRestorent.toObject() : null;
  };

  const createRestorent = async (restorent: Restorent): Promise<Restorent | null> => {
    const hashPass: string = await bcrypt.hash(restorent.password as string, 12);
    const newRestorent: Restorent = {
      restorentname: restorent.restorentname,
      email: restorent.email,
      password: hashPass,
      location: restorent.location,
    };
    const createdRestorent = await restorentModel.create(newRestorent);
    if (createdRestorent) {
      const { password, ...restoredRestorent } = createdRestorent.toObject();
      return restoredRestorent;
    }
    return null;
  };

  return {
    findByRestorentnameAndEmail,
    findByRestorentEmail,
    findOneRestorent,
    createRestorent,
  };
};
