import { Request, Response, NextFunction } from "express";
import { STATUS } from "../constants/statusCode.constant";
import { MESSAGE } from "../constants/message.constant";

export const mediaUploder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const multerRequest = req;

    if (!multerRequest.file) {
      res.status(STATUS.NOT_FOUND).json({
        message: MESSAGE.NOT_FOUND,
        succese: false,
        data: null,
      });

      return;
    }

    res.status(STATUS.OK).json({
      message: MESSAGE.SUCCESS,
      succese: true,
      data: {
        url: multerRequest.file.path,
      },
    });
  } catch (error: any) {
    next(error.message);
  }
};
