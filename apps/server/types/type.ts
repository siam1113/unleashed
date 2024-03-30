import { Db } from "mongodb";

export type queryFunction = (db: Db, data?: object) => Promise<any>;