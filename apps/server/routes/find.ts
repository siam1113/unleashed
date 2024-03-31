import { Request, Response } from "express";
import { processFindIndividuals } from "../processors/find";

const express = require("express");
const findRouter = express.Router();

findRouter.get("/individuals", async (req: Request, res: Response) => {
  await processFindIndividuals(req, res);
});

export { findRouter };