import { NextFunction, Request, Response } from "express";
import * as ChatService from "../Services/chat.service";
import { STATUS } from "../constants/statusCode.constant";

export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentUserId, targetUserId } = req.body;
    const chat = await ChatService.accessChatService(
      currentUserId,
      targetUserId
    );

    res.status(STATUS.CREATED).json({
      succese: true,
      message: "Chat is Created",
      data: chat,
    });
  } catch (error: any) {
    next(error.message);
  }
};

export const getChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("----------------- req.body", req.body);
    const { userId } = req.body;
    const chat = await ChatService.fetchChatService(userId);
    res.status(STATUS.OK).json({
      message: "Get Users Chat",
      succese: true,
      data: chat,
    });
  } catch (error: any) {
    next(error.message);
  }
};
