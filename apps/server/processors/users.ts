import { Request, Response } from "express";
import { DB_QUERY } from "../db/setup";
import { SERVER_CONSTANTS } from "../constants/constants";
import { createUser, get2FAKey, getUserByEmail, save2FAKey } from "../db/queries/users";
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

export const processSignup = async (req: Request, res: Response) => {
  // validate duplicate user
  const users = await DB_QUERY("unleased", getUserByEmail, { user: req.body });
  if (users.length > 0) {
    res.send({ message: SERVER_CONSTANTS.userAlreadyExists });
    return;
  }

  // create user
  const newUser = await DB_QUERY("unleased", createUser, { user: req.body });
  const insertId = newUser["insertedId"];

  // generate 2fa secret
  const secret = speakeasy.generateSecret({ length: 20 });

  // save 2fa secret
  await DB_QUERY("unleased", save2FAKey, { user: { userid: insertId, secret: secret.base32 } });

  // generate QR code
  const qrcode = await QRCode.toDataURL(secret.otpauth_url);

  insertId ?
    res.send({ message: SERVER_CONSTANTS.signUpSuccess, insertId, qrcode })
    : res.send({ message: SERVER_CONSTANTS.signUpFailed, error: newUser["error"] });
}

export const processLogin = async (req: Request, res: Response) => {
  const user = await DB_QUERY("unleased", getUserByEmail, { user: req.body });
  const userId = user[0]?._id
  const userSecret =
    await DB_QUERY("unleased", get2FAKey, { user: { userid: userId } });
  const verified = speakeasy.totp.verify({
    secret: userSecret[0]["secret"],
    encoding: "base32",
    token: req.body["code"],
    window: 1
  })
  verified ?
    res.send({ message: SERVER_CONSTANTS.loginSuccess, user: userSecret[0] })
    : res.send({ message: SERVER_CONSTANTS.userNotAuthenticated, error: userSecret[0]["secret"] });
}