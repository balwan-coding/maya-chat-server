import { NextFunction, Request, Response } from "express";

export const errorHandler = async (
  msg: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res.status(400).json({
    succese: false,
    message: msg,
  });

  return;
};
