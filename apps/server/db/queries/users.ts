import { Db } from "mongodb";

export const getUserByEmail = async (db: Db, data: any) => {
  return await db.collection("users").find({ email: data["user"]["email"] }).toArray();
}

export const createUser = async (db: Db, data: any) => {
  const { email, password } = data["user"];
  const user = { email, password, created_at: new Date() };
  return await db.collection("users").insertOne(user);
}

export const save2FAKey = async (db: Db, data: any) => {
  const { userid, secret } = data["user"];
  const userSecret = { userid, secret, created_at: new Date() };
  return await db.collection("2fa").insertOne(userSecret);
}

export const get2FAKey = async (db: Db, data: any) => {
  return await db.collection("2fa").find({ userid: data["user"]["userid"] }).toArray();
}