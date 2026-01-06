import express from "express";
import * as authController from "../Controllers/auth.controller";
import {
  loginUserHandler,
  registerUserHandler,
  sessionAuth,
} from "../middlewares/auth.middleware";

const authRouter = express.Router();

authRouter.post(
  "/user/regiseter",
  registerUserHandler,
  authController.registerUserController
);

authRouter.post(
  "/user/login",
  loginUserHandler,
  authController.loginUserController
);

authRouter.get("/user/me", sessionAuth, authController.isSession);

authRouter.post("/user/isUserName", authController.isValideUserNameCheck);

export default authRouter;
