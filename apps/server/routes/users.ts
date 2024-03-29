const express = require("express");
const userRouter = express.Router();
import { processSignup, processLogin, process2FA, setup2FA } from "../processors/users";

userRouter.get("/", async (req: any, res: any) => {
  res.send("Hello World");
});

userRouter.post("/signup", async (req: any, res: any) => {
  await processSignup(req, res);
});

userRouter.post("/login", async (req: any, res: any) => {
  await processLogin(req, res);
});

userRouter.post("/setup-2fa", async (req: any, res: any) => {
  await setup2FA(req, res);
});

userRouter.post("/verify-2fa", async (req: any, res: any) => {
  await process2FA(req, res);
});

export { userRouter };