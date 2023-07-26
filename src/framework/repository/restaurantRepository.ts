import { Restaurant } from "../../domain/models/Restaurant";
import { MongoDDRestaurant } from "../database/models/restaurantModel";
import bcrypt from "bcryptjs";

export type restaurantRepository = {
  findByrestaurantnameAndEmail: (restaurantname: string, email: string) => Promise<Restaurant | null>;
  findByrestaurantnameOrEmailAndPassword: (restaurantusernameOrEmail: string,password:string) => Promise<Restaurant | null>;
  findOnerestaurant: (restaurant: Restaurant) => Promise<Restaurant | null>;
  createrestaurant: (restaurant: Restaurant) => Promise<Restaurant | null>;
};

export const restaurantRespositoryEmpl = (restaurantModel: MongoDDRestaurant): restaurantRepository => {
  const findByrestaurantnameAndEmail = async (restaurantname: string, email: string): Promise<Restaurant | null> => {
    const restaurant = await restaurantModel.findOne({ $or: [{ restaurantname }, { email }] }, { password: 0 }).exec();
    return restaurant ? restaurant.toObject() : null;
  };

  const findByrestaurantnameOrEmailAndPassword = async (restaurantusernameOrEmail: string, password: string): Promise<Restaurant | null> => {
  const restaurant = await restaurantModel.findOne({
    $or: [{ restaurantname: restaurantusernameOrEmail }, { email: restaurantusernameOrEmail }]
  }).exec();
  if (restaurant) {
    const passwordMatch = bcrypt.compareSync(password, restaurant.password as string);
    if (passwordMatch) {
      const { password, ...restaurantWithoutPassword } = restaurant.toObject();
      return restaurantWithoutPassword;
    }
  }
  return null;
  };

  const findOnerestaurant = async (restaurant: Restaurant): Promise<Restaurant | null> => {
    const currentrestaurant = await restaurantModel.findOne(restaurant, { password: 0 }).exec();
    return currentrestaurant ? currentrestaurant.toObject() : null;
  };

  const createrestaurant = async (restaurant: Restaurant): Promise<Restaurant | null> => {
    const hashPass: string = await bcrypt.hash(restaurant.password as string, 12);
    const newrestaurant: Restaurant = {
      restaurantname: restaurant.restaurantname,
      email: restaurant.email,
      password: hashPass,
      location: restaurant.location,
    };
    const createdrestaurant = await restaurantModel.create(newrestaurant);
    if (createdrestaurant) {
      const { password, ...restoredrestaurant } = createdrestaurant.toObject();
      return restoredrestaurant;
    }
    return null;
  };

  return {
    findByrestaurantnameAndEmail,
    findByrestaurantnameOrEmailAndPassword,
    findOnerestaurant,
    createrestaurant,
  };
};
