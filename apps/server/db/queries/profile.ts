import { Db, ObjectId } from "mongodb";
const PROFILE_COLLECTION = "profiles";

export const createProfile = async (db: Db, data: any) => {
  const { userid } = data;
  const profile = { userid, skills: [], experiences: [], personality: {}, created_at: new Date() };
  console.log("profile", profile);
  return await db.collection(PROFILE_COLLECTION).insertOne(profile);
}

export const updateSkill = async (db: Db, data: any) => {
  const { userid, skills } = data;
  return await db.collection(PROFILE_COLLECTION).updateOne({ userid: userid }, { $set: { skills } });
}

export const getProfile = async (db: Db, data: any) => {
  const { userid } = data;
  return await db.collection(PROFILE_COLLECTION).findOne({ userid: userid });
}

export const updateExperiences = async (db: Db, data: any) => {
  const { userid, experiences } = data;
  return await db.collection(PROFILE_COLLECTION).updateOne({ userid: userid }, { $set: { experiences } });
}

export const updatePersonality = async (db: Db, data: any) => {
  const { userid, personality } = data;
  return await db.collection(PROFILE_COLLECTION).updateOne({ userid: userid }, { $set: { personality } });
}