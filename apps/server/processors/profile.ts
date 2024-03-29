import { Request, Response } from "express";
import { DB_QUERY } from "../db/setup";
import { SERVER_CONSTANTS } from "../constants/constants";
import { getProfile, updateExperiences, updatePersonality, updateSkill } from "../db/queries/profile";

export const processAddSkill = async (req: Request, res: Response) => {
  const { userid, skills } = req.body;
  console.log("skills", skills);
  const profile = await DB_QUERY("unleashed", updateSkill, { userid, skills });
  console.log("profile", profile);
  profile["modifiedCount"] == 1 ? res.send({ message: SERVER_CONSTANTS.skillAdded, statusCode: 200 }) : res.send({ message: SERVER_CONSTANTS.somethingWentWrong, statusCode: 500 });
}

export const processGetProfile = async (req: Request, res: Response) => {
  const { userid } = req.query;
  const profile = await DB_QUERY("unleashed", getProfile, { userid });
  console.log("skills", profile);
  profile ? res.send({ profile, statusCode: 200 }) : res.send({ message: SERVER_CONSTANTS.somethingWentWrong, statusCode: 500 });
}

export const processAddExperience = async (req: Request, res: Response) => {
  const { userid, experiences } = req.body;
  const profile = await DB_QUERY("unleashed", updateExperiences, { userid, experiences });
  profile["modifiedCount"] == 1 ? res.send({ message: SERVER_CONSTANTS.experienceAdded, statusCode: 200 }) : res.send({ message: SERVER_CONSTANTS.somethingWentWrong, statusCode: 500 });
}

export const processAddPersonality = async (req: Request, res: Response) => {
  const { userid, personality } = req.body;
  const profile = await DB_QUERY("unleashed", updatePersonality, { userid, personality });
  console.log("PRRRRR: ", profile);
  profile["modifiedCount"] == 1 ? res.send({ message: SERVER_CONSTANTS.personalityAdded, statusCode: 200 }) : res.send({ message: SERVER_CONSTANTS.somethingWentWrong, statusCode: 500 });
}
