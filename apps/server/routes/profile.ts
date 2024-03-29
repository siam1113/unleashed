import { processAddExperience, processAddPersonality, processAddSkill, processGetProfile } from "../processors/profile";

const express = require("express");
const profileRouter = express.Router();

profileRouter.post("/skills", async (req: any, res: any) => {
  await processAddSkill(req, res);
});

profileRouter.post("/experiences", async (req: any, res: any) => {
  await processAddExperience(req, res);
});

profileRouter.post("/personality", async (req: any, res: any) => {
  await processAddPersonality(req, res);
});

profileRouter.get("/", async (req: any, res: any) => {
  await processGetProfile(req, res);
});

export { profileRouter };