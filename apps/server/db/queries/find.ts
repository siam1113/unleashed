import { Db } from "mongodb";
const PROFILE_COLLECTION = "profiles";

export const findIndividuals = async (db: Db, data: any) => {
  const { personality, tech } = data;
  return await db.collection(PROFILE_COLLECTION).find({ skills: { $elemMatch: { Name: tech } } }).toArray();
}