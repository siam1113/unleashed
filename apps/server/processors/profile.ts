import { Request, Response } from "express";
import { DB_QUERY } from "../db/setup";
import { SERVER_CONSTANTS } from "../constants/constants";
import { getProfile, updateExperiences, updatePersonality, updateProfileHighlights, updateSkill, uploadProfilePhoto } from "../db/queries/profile";
import { uploadImage } from "../utils/cloudinary";
import { generateProfileHighlights } from "../utils/gpt";
const { unlink } = require('node:fs');

export const processAddSkill = async (req: Request, res: Response) => {
  const { userid, skills } = req.body;
  console.log("skills", skills);
  const profile = await DB_QUERY("unleashed", updateSkill, { userid, skills });
  console.log("profile", profile);
  profile["modifiedCount"] == 1 ? res.send({ message: SERVER_CONSTANTS.skillAdded, statusCode: 200 }) : res.send({ message: SERVER_CONSTANTS.somethingWentWrong, statusCode: 500 });
}

export const processGetProfile = async (req: Request, res: Response) => {
  const { userid } = req.query;
  console.log("userid", userid);
  const profile = await DB_QUERY("unleashed", getProfile, { userid });
  console.log("skills", profile);
  profile ? res.send({ profile, statusCode: 200 }) : res.send({ message: SERVER_CONSTANTS.profileNotFound, statusCode: 500 });
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

export const processUploadPhoto = async (req: any, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const tempFilePath = req.files['file'].tempFilePath;
  const uploadRes = await uploadImage(tempFilePath);
  const photourl = uploadRes.url;
  const profile = await DB_QUERY("unleashed", uploadProfilePhoto, { userid: req.body.userid, photourl: photourl });
  console.log("Profile: ", profile);
  res.status(200).send({ message: SERVER_CONSTANTS.photoUploaded, statusCode: 200, photourl });
  photourl && unlink(tempFilePath, (err: any) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

export const processGenerateHighlights = async (req: any, res: Response) => {
  const { userid } = req.body;
  const userProfile = await DB_QUERY("unleashed", getProfile, { userid });
  const highlights =
    await generateProfileHighlights(userProfile.skills, userProfile.experiences, userProfile.personality)
  const updatedProfile = await DB_QUERY("unleashed", updateProfileHighlights, { userid, highlights });
  console.log("Updated Profile: ", updatedProfile);
  res.status(200).send({ message: SERVER_CONSTANTS.highlightsGenerated, statusCode: 200, highlights });
};