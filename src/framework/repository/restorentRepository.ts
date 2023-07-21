import { Restorent } from "../../domain/models/Restorent";
import { MongoDDRestorent } from "../database/models/restorentModel";
import bcrypt from "bcryptjs";

export type restorentRepository = {
  findByRestorentnameAndEmail: (restorentname: string, email: string) => Promise<Restorent | null>;
  findByRestorentnameOrEmailAndPassword: (restorentusernameOrEmail: string,password:string) => Promise<Restorent | null>;
  findOneRestorent: (restorent: Restorent) => Promise<Restorent | null>;
  createRestorent: (restorent: Restorent) => Promise<Restorent | null>;
};

export const restorentRespositoryEmpl = (restorentModel: MongoDDRestorent): restorentRepository => {
  const findByRestorentnameAndEmail = async (restorentname: string, email: string): Promise<Restorent | null> => {
    const restorent = await restorentModel.findOne({ $or: [{ restorentname }, { email }] }, { password: 0 }).exec();
    return restorent ? restorent.toObject() : null;
  };

  const findByRestorentnameOrEmailAndPassword = async (restorentusernameOrEmail: string, password: string): Promise<Restorent | null> => {
  const restorent = await restorentModel.findOne({
    $or: [{ restorentname: restorentusernameOrEmail }, { email: restorentusernameOrEmail }]
  }).exec();
  if (restorent) {
    const passwordMatch = bcrypt.compareSync(password, restorent.password as string);
    if (passwordMatch) {
      const { password, ...restorentWithoutPassword } = restorent.toObject();
      return restorentWithoutPassword;
    }
  }
  return null;
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
    findByRestorentnameOrEmailAndPassword,
    findOneRestorent,
    createRestorent,
  };
};
