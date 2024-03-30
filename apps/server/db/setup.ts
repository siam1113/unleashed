import { Db, MongoClient } from "mongodb";
import { queryFunction } from "../types/type";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI || "mongodb://localhost:27017");
export const DB_QUERY =
  async (dbName: string, queryFunction: queryFunction, data?: any) => {
    try {
      await client.connect();
      console.log("Connected to the database");
      const db = client.db(dbName);
      const result = await queryFunction(db, data);
      console.log("Query executed successfully");
      return result;
    } catch (e) {
      return { error: e };
    }
  }