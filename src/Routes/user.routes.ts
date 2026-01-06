import express from "express";
import * as userController from "../Controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/all", userController.getAllUser);


export default userRouter;
