import { Request, Response } from "express";
import { DB_QUERY } from "../db/setup";
import { findIndividuals } from "../db/queries/find";

export const processFindIndividuals = async (req: Request, res: Response) => {
  console.log("req.query", req.query);
  const { personality, tech } = req.query;
  const individuals = await DB_QUERY("unleashed", findIndividuals, { personality, tech });
  console.log("Individuals", individuals);
  individuals ? res.status(200).send(individuals) : res.status(404).send([]);
};