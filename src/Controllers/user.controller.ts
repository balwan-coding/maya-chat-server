import { NextFunction, Request, Response } from "express";
import * as userSerivce from "../Services/user.service";

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userSerivce.allUser();

    res.status(200).json({
      message: "get All users",
      succse: true,
      users,
    });
  } catch (error) {}
};
