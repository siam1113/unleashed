import { Db, ObjectId } from "mongodb";
const USER_COLLECTION = "users";
const TWO_FA_COLLECTION = "2fa";

export const getUserByEmail = async (db: Db, data: any) => {
  return await db.collection(USER_COLLECTION).find({ email: data["user"]["email"] }).toArray();
}

export const getUserByEmailPassword = async (db: Db, data: any) => {
  return await db.collection(USER_COLLECTION).find({ email: data["user"]["email"], password: data["user"]["password"] }).toArray();
}

export const createUser = async (db: Db, data: any) => {
  const { name, email, password, qrcode } = data["user"];
  const user = { name, email, password, verified: false, qrcode, created_at: new Date() };
  return await db.collection(USER_COLLECTION).insertOne(user);
}

export const updateUser = async (db: Db, data: any) => {
  const { userid, enable2FA } = data["user"];
  return await db.collection(USER_COLLECTION).updateOne({ _id: new ObjectId(userid) }, { $set: { enable2FA } });
}

export const save2FAKey = async (db: Db, data: any) => {
  const { userid, secret } = data["user"];
  const userSecret = { userid, secret, created_at: new Date() };
  return await db.collection(TWO_FA_COLLECTION).insertOne(userSecret);
}

export const get2FAKey = async (db: Db, data: any) => {
  return await db.collection(TWO_FA_COLLECTION).find({ userid: data["user"]["userid"] }).toArray();
}