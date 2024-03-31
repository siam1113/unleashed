import { Request, Response } from "express";
import { DB_QUERY } from "../db/setup";
import { SERVER_CONSTANTS } from "../constants/constants";
import { createUser, get2FAKey, getUserByEmail, getUserByEmailPassword, save2FAKey, updateUser } from "../db/queries/users";
import { createProfile } from "../db/queries/profile";

const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

export const processSignup = async (req: Request, res: Response) => {
  // validate duplicate user
  const users = await DB_QUERY("unleashed", getUserByEmail, { user: req.body });
  if (users.length > 0) {
    res.send({ message: SERVER_CONSTANTS.userAlreadyExists, statusCode: 409 });
    return;
  }

  // generate 2fa secret
  const secret = speakeasy.generateSecret({ length: 20, name: "Unleashed: " + req.body.email });

  // generate QR code
  const qrcode = await QRCode.toDataURL(secret.otpauth_url);

  // create user
  const newUser = await DB_QUERY("unleashed", createUser, { user: { ...req.body, qrcode: qrcode } });
  const insertId = newUser["insertedId"];

  // create profile
  await DB_QUERY("unleashed", createProfile, { userid: insertId.toString(), name: req.body.name });

  // save 2fa secret
  await DB_QUERY("unleashed", save2FAKey, { user: { userid: insertId.toString(), secret: secret.base32 } });

  insertId ?
    res.send({ message: SERVER_CONSTANTS.signUpSuccess, insertId, qrcode, statusCode: 200 })
    : res.send({ message: SERVER_CONSTANTS.signUpFailed, error: newUser["error"], statusCode: 500 });
}

export const processLogin = async (req: Request, res: Response) => {
  console.log(req.body);
  const user = await DB_QUERY("unleashed", getUserByEmailPassword, { user: req.body });
  console.log(user);
  if (user.length === 0) {
    res.send({ message: SERVER_CONSTANTS.userDoesNotExist, stausCode: 404 });
    return;
  }
  const userId = user[0]?._id.toString();
  const enable2FA = user[0]?.enable2FA;
  const qrcode = user[0]?.qrcode;
  res.send({ userId, enable2FA, qrcode, stausCode: 200 })
}

export const process2FA = async (req: Request, res: Response) => {
  const verified = await verify2FA(req.body.userId, req.body.code);
  await DB_QUERY("unleashed", updateUser, { user: { userid: req.body.userId, enable2FA: verified } });
  return res.send({ userId: req.body.userId, verified, message: verified ? SERVER_CONSTANTS.twoFactorSuccess : SERVER_CONSTANTS.twoFactorFailed, statusCode: verified ? 200 : 401 });
}

export const setup2FA = async (req: Request, res: Response) => {
  const verified = await verify2FA(req.body.userId, req.body.code);
  await DB_QUERY("unleashed", updateUser, { user: { userid: req.body.userId, enable2FA: verified } });
  return res.send({ userId: req.body.userId, verified, message: verified ? SERVER_CONSTANTS.twoFactorSetupSuccess : SERVER_CONSTANTS.twoFactorSetupFailed, statusCode: verified ? 200 : 401 });
}

const verify2FA = async (userId: string, code: string) => {
  const userSecret =
    await DB_QUERY("unleashed", get2FAKey, { user: { userid: userId } });
  const verified = speakeasy.totp.verify({
    secret: userSecret[0]["secret"],
    encoding: "base32",
    token: code,
    window: 1
  })
  return verified;
}
