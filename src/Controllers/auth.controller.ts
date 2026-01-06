import { NextFunction, Request, Response } from "express";
import * as authService from "../Services/auth.service";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newUser } = await authService.registerUserService(req.body);

    req.session.regenerate((err) => {
      if (err) return next(err);

      req.session.user = {
        id: newUser._id.toString(),
        role: newUser.role,
      };

      console.log("---------------- user session", req.session.user);

      res.status(201).json({
        success: true,
        message: "User registered & logged in",
        user: {
          name: newUser.name,
          email: newUser.email,
          gender: newUser.gender,
          userName: newUser.userName,
          role: newUser.role,
        },
      });
    });
  } catch (error: any) {
    next(error);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { isUser } = await authService.loginUserService(req.body);

    req.session.regenerate((err) => {
      if (err) return next(err);

      req.session.user = {
        id: isUser._id.toString(),
        role: isUser.role,
      };

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          name: isUser.name,
          email: isUser.email,
          gender: isUser.gender,
          userName: isUser.userName,
          role: isUser.role,
        },
      });
    });
  } catch (error: any) {
    next(error);
  }
};

export const isValideUserNameCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const { message } = await authService.isValideUserName(req.body);
    res.status(200).json({
      message: message,
      succese: true,
    });
  } catch (error: any) {
    console.log(error);
    next(error.message);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  } catch (error: any) {
    next(error);
  }
};

export const isSession = async (req: Request, res: Response) => {
  console.log("is session frist ", req.session.user);
  if (!req.session.user) {
    console.log("is session seconde ", req.session.user);
    return res.status(401).json({ message: "Not authenticated" });
  }
  console.log("is session thrid ", req.session.user);
  res.json({
    id: req.session.user.id,
    role: req.session.user.role,
  });
};
