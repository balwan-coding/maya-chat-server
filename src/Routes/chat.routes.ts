import express from "express";
import * as chat from "../Controllers/chat.controller";
const chatRouter = express.Router();

chatRouter.post("/create", chat.createChat);
chatRouter.post("/get", chat.getChat);

export default chatRouter;
