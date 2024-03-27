import express from 'express';
const userRouter = express.Router();
import { processSignup, processLogin } from "../processors/users";

userRouter.post("/signup", async (req: any, res: any) => {
  await processSignup(req, res);
});

userRouter.post("/login", async (req: any, res: any) => {
  await processLogin(req, res);
});

export { userRouter };