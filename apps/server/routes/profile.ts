import { Request, Response } from "express";
import { processAddExperience, processAddPersonality, processAddSkill, processGenerateHighlights, processGetProfile, processUploadPhoto } from "../processors/profile";

const express = require("express");
const profileRouter = express.Router();

profileRouter.get("/", async (req: Request, res: Response) => {
  await processGetProfile(req, res);
});

profileRouter.post("/skills", async (req: Request, res: Response) => {
  await processAddSkill(req, res);
});

profileRouter.post("/experiences", async (req: Request, res: Response) => {
  await processAddExperience(req, res);
});

profileRouter.post("/personality", async (req: Request, res: Response) => {
  await processAddPersonality(req, res);
});

profileRouter.post("/photo", async (req: any, res: Response) => {
  await processUploadPhoto(req, res);
});

profileRouter.post("/generate-highlights", async (req: any, res: Response) => {
  await processGenerateHighlights(req, res);
});


export { profileRouter };